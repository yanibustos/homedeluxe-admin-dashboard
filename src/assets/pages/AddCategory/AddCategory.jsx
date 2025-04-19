import CategoryForm from "../../components/CategoryForm/CategoryForm";
import "./AddCategory.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchApi from "../../../api/fetchApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
  })
  .required();

function AddCategory() {
  const user = useSelector((state) => state.user);
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

  const onSubmit = async ({ name, image }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image && image[0]) {
        formData.append("image", image[0]);
      }

      const response = await fetchApi({
        method: "POST",
        url: "/categories",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        accessToken: user.accessToken,
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
