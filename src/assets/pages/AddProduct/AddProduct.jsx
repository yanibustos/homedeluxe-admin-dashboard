import "./AddProduct.css";
import Input from "../../components/commons/Input/Input";
import InputCheckbox from "../../components/commons/InputCheckbox/InputCheckbox";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchApi from "../../../api/fetchApi";
import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm/ProductForm";

//TODO: Add the right ids when relationship and model is defined in API
const categories = [
  { id: 1, name: "Sofas and armchairs" },
  { id: 2, name: "Decoration" },
  { id: 3, name: "Tables and desk" },
  { id: 4, name: "Kitchen furniture" },
  { id: 5, name: "Bedroom" },
  { id: 6, name: "Outdoors" },
];

const currency = [{ id: "USD", name: "USD" }];

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.string().required("Price is required"),
    stock: yup.number().required("Stock is required"),
    category: yup.string().required("Category is required"),
    currency: yup.string().required("Currency is required"),
    featured: yup.boolean(),
    //TODO: Check image validation
    // image: yup.mixed().test("fileType", "Unsupported file format", (value) => {
    //   if (!value) return true;
    //   return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
    //     value.type
    //   );
    // }),
  })
  .required();

function AddProduct() {
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append each field to the FormData object
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("currency", data.currency);
      formData.append("featured", data.featured);

      // Append the file input (image) if it exists
      if (data.image && data.image.length > 0) {
        for (const file of data.image) {
          formData.append("image", file);
        }
      }

      const response = await fetchApi({
        method: "POST",
        url: "/products",
        data: formData,
      });

      if (response) {
        toast.success(
          "Product created successfully, redirecting to Products view"
        );
        setTimeout(() => {
          navigate("/admin/products");
        }, 4000);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="addProduct-container container-fluid">
      <div className="addProduct-header fs-5 text-uppercase fw-semibold mb-3">
        Add product
      </div>
      <ProductForm
        register={register}
        errors={errors}
        currency={currency}
        categories={categories}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddProduct;
