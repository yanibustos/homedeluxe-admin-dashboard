import "./AddAdmin.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import AdminForm from "../../components/AdminForm/AdminForm";
import fetchApi from "../../../api/fetchApi";

const schema = yup
  .object({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
  })
  .required();

function AddAdmin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      const user = await fetchApi({
        method: "post",
        url: "/admin",
        data: data,
      });
      if (user) {
        toast.success(
          "Account created successfully, redirecting to Admin view"
        );
        setTimeout(() => {
          navigate("/admin/admin");
        }, 4000);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="addAdmin-container container-fluid">
      <div className="addAdmin-header fs-5 text-uppercase fw-semibold mb-3">
        Add Admin
      </div>
      <AdminForm
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddAdmin;
