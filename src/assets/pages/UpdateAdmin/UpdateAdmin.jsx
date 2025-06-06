import "./UpdateAdmin.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import AdminForm from "../../components/AdminForm/AdminForm";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import ResetPasswordModal from "../../components/Modals/ResetPasswordModal";
import fetchApi from "../../../api/fetchApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const schema = yup
  .object({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
  })
  .required();

function UpdateAdmin() {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getUser = async () => {
    try {
      const response = await fetchApi({
        method: "GET",
        url: `/admin/${params.id}`,
      });

      if (response.status === 404) {
        setError("User not found");
        setAdmin(null);
      } else if (response.admin) {
        setAdmin(response.admin);
        setError(null);
      } else {
        setError("Something went wrong, please try again");
        setAdmin(null);
      }
    } catch (error) {
      setAdmin(null);
      setError("Something went wrong, please try again");
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    getUser();
  }, [params.id]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {},
  });

  useEffect(() => {
    if (admin) {
      reset(admin); // Reset the form with the new product data
    }
  }, [admin, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);

      if (data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      const admin = await fetchApi({
        method: "patch",
        url: `/admin/${params.id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        accessToken: user.accessToken,
      });

      if (admin) {
        console.log(admin);
        dispatch(setUser(admin.admin));
        toast.success("User updated successfully, redirecting to Admin view");
        setTimeout(() => {
          navigate("/admin/admin");
        }, 4000);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetchApi({
        method: "POST",
        url: "/reset-password",
        data: { email: admin.email },
      });
      if (response.msg === "Reset link sent to email") {
        toast.success("Password reset email sent. Please check your inbox.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      setShowModal(false);
    } catch (error) {
      toast.error("Failed to send reset password email. Please try again.");
      setShowModal(false);
    }
  };

  return (
    <div className="updateAdmin-container container-fluid">
      {error ? (
        <div className="error-message">
          <h3 className="alert alert-danger text-uppercase fs-6">{error}</h3>
        </div>
      ) : admin ? (
        <>
          <div className="updateAdmin-header fs-5 text-uppercase fw-semibold mb-3">
            Update Admin User
          </div>
          <AdminForm
            register={register}
            errors={errors}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            isUpdateAdmin={true}
            setShowModal={setShowModal}
          />
        </>
      ) : (
        <Loading />
      )}
      <ResetPasswordModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        email={admin?.email}
        handleOnClick={handleResetPassword}
      />
    </div>
  );
}

export default UpdateAdmin;
