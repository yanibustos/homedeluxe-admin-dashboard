import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Login.css";
import { login } from "../../../redux/userSlice";
import fetchApi from "../../../../api/fetchApi";
import Input from "../../../components/commons/Input/Input";
import InputCheckbox from "../../../components/commons/InputCheckbox/InputCheckbox";
import BlackButton from "../../../components/commons/BlackButton/BlackButton";
import SideImage from "../../../components/SideImage/SideImage";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
    rememberMe: yup.boolean(),
  })
  .required();

function Login() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async ({ email, password, rememberMe }) => {
    try {
      setLoading(true);
      const user = await fetchApi({
        method: "post",
        url: "/tokens/admin",
        data: { email, password },
      });
      dispatch(login(user));

      if (rememberMe) {
        console.log("Save in localStorage");
      }
      if (user) {
        navigate("/admin");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (user?.accessToken) {
      navigate(user.isAdmin ? "/admin" : "/");
    }
  }, []);

  return (
    <SideImage>
      <div className="login-container">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-100 px-4"
        >
          <div>
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              register={{ ...register("email") }}
              errors={errors}
              classNameLabel="fw-semibold"
            />
          </div>
          <div className="mt-4">
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              register={{ ...register("password") }}
              errors={errors}
              classNameLabel="fw-semibold"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="d-flex align-items-center ">
              <InputCheckbox
                name="rememberMe"
                id="rememberMe"
                label="Remember me"
                register={register("rememberMe")}
              />
            </div>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-link text-dark fw-semibold login-text p-0 text-decoration-none"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="d-grid mt-4">
            <BlackButton type="submit" loading={loading} name="Login" />
          </div>
        </form>
      </div>
    </SideImage>
  );
}

export default Login;
