import { useNavigate, useParams } from "react-router-dom";
import fetchApi from "../../../api/fetchApi";
import "./UpdateCategory.css";
import { useEffect, useState } from "react";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

const schema = yup.object({}).required();

function UpdateCategory() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const response = await fetchApi({
        method: "GET",
        url: `/categories/${params.id}`,
      });

      if (response.status === 404) {
        setError("Category not found");
        setCategory(null);
      } else if (response.category) {
        setCategory(response.category);
        setError(null);
      } else {
        setError("Something went wrong, please try again");
        setCategory(null);
      }
    } catch (error) {
      setCategory(null);
      setError("Something went wrong, please try again");
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    getCategory();
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
    if (category) {
      reset(category); // Reset the form with the new product data
    }
  }, [category, reset]);

  const onSubmit = async ({ name, image }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image && image[0]) {
        formData.append("image", image[0]);
      }

      const category = await fetchApi({
        method: "patch",
        url: `/categories/${params.id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        accessToken: user.accessToken,
      });

      if (category) {
        toast.success(
          "Category updated successfully, redirecting to Categories view"
        );
        setTimeout(() => {
          navigate("/admin/categories");
        }, 4000);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="updateCategory-container container-fluid">
      {error ? (
        <div className="error-message">
          <h3 className="alert alert-danger text-uppercase fs-6">{error}</h3>
        </div>
      ) : category ? (
        <>
          <div className="updateCategory-header fs-5 text-uppercase fw-semibold mb-3">
            Update Category
          </div>
          <CategoryForm
            register={register}
            errors={errors}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UpdateCategory;
