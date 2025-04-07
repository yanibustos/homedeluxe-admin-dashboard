import "./AddProduct.css";
import Input from "../../components/commons/Input/Input";
import InputCheckbox from "../../components/commons/InputCheckbox/InputCheckbox";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchApi from "../../../api/fetchApi";
import { toast } from "react-toastify";

const categories = [
  { id: 1, name: "Sofas and armchairs" },
  { id: 2, name: "Coffee Tables" },
];

const currency = [{ id: 1, name: "USD" }];

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.string().required("Price is required"),
    stock: yup.number().required("Stock is required"),
    category: yup.string().required("Category is required"),
    currency: yup.string().required("Currency is required"),
    featured: yup.boolean(),
    // image: yup.mixed().test("fileType", "Unsupported file format", (value) => {
    //   if (!value) return true;
    //   return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
    //     value.type
    //   );
    // }),
  })
  .required();

function AddProduct() {
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

  console.log(errors);

  const onSubmit = async (data) => {
    console.log("Estoy en onsubmit");
    console.log({ data });
    console.log(data.image);
    try {
      const formData = new FormData();
      console.log({ formData });

      // Append each field to the FormData object
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("currency", data.currency);
      formData.append("featured", data.featured);

      // Append the file input (image) if it exists
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await fetchApi({
        method: "POST",
        url: "/products",
        data: formData,
      });

      if (response) {
        toast.success("Account created successfully, redirecting to Login...");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="addProduct-container container">
      <div className="addProduct-header fs-5 text-uppercase fw-semibold mb-3">
        Add product
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            classNameLabel="fw-semibold"
            register={{ ...register("name") }}
            errors={errors}
          />
        </div>
        <div className="my-3">
          <label
            htmlFor="description"
            className="form-label fw-semibold addProduct-label"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="image" className="fw-semibold addProduct-label mb-2">
            Photos
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            {...register("image")}
          />
        </div>
        {errors.image && <p className="text-danger">{errors.image.message}</p>}
        <div className="my-3">
          <select
            name="category"
            id="category"
            className="form-select"
            {...register("category")}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <select
            name="currency"
            id="currency"
            className="form-select"
            {...register("currency")}
          >
            <option value="">Choose currency</option>
            {currency.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Input
            type="text"
            id="price"
            name="price"
            label="Price"
            classNameLabel="fw-semibold"
            register={{ ...register("price") }}
            errors={errors}
          />
        </div>
        <div>
          <Input
            type="number"
            id="stock"
            name="stock"
            label="Stock"
            classNameLabel="fw-semibold"
            register={{ ...register("stock") }}
            errors={errors}
          />
        </div>
        <div className="my-3">
          <InputCheckbox
            name="featured"
            label="Is a featured product?"
            id="featured"
            labelClassName="fw-semibold addProduct-label"
            register={{ ...register("featured") }}
            errors={errors}
          />
        </div>
        <div className="my-4">
          <Link to={"/admin/products"} className="btn btn-secondary me-3">
            Cancel
          </Link>
          <button type="submit" className="btn btn-dark">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

// Product.init(
//     {

//         name: DataTypes.STRING,
//         description: DataTypes.TEXT,
//         category: DataTypes.STRING,
//         price: DataTypes.DECIMAL,
//         currency: DataTypes.STRING,
//         stock: DataTypes.INTEGER,
//         featured: DataTypes.BOOLEAN,
//         image: {
//             type: DataTypes.JSON,
//             field: 'image',
//             defaultValue: {}
//         },
//     },
//     { sequelize, modelName: "product" }
// );
