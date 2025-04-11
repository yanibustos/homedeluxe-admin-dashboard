import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchApi from "../../../api/fetchApi";

import BlackButton from "../../commons/BlackButton/BlackButton";
import Input from "../../commons/Input/Input";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  })
  .required();

function ForgotPasswordModal({ show, handleClose }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const reset = await fetchApi({
        method: "post",
        url: "/reset-password",
        data: { email: data.email },
      });
      toast.success("Check your email for the reset link.");
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="email"
            id="email"
            label="Enter your email"
            register={{ ...register("email") }}
            errors={errors}
            classNameLabel="fw-semibold"
          />
          <div className="d-grid mt-3">
            <BlackButton
              type="submit"
              loading={loading}
              name="Send Reset Link"
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
