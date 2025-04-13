import CategoryForm from "../../components/CategoryForm/CategoryForm";
import "./AddCategory.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchApi from "../../../api/fetchApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
  })
  .required();

function AddCategory() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async ({ name }) => {
    try {
      const response = await fetchApi({
        method: "POST",
        url: "/categories",
        data: { name },
      });

      if (response.category) {
        toast.success(
          "Category created successfully, redirecting to Categories view"
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
    <div className="addCategory-container container-fluid">
      <div className="addCategory-header fs-5 text-uppercase fw-semibold mb-3">
        Add product
      </div>
      <CategoryForm
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddCategory;
