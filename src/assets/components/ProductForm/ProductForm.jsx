import { Link } from "react-router-dom";
import Input from "../commons/Input/Input";
import InputCheckbox from "../commons/InputCheckbox/InputCheckbox";
import "./ProductForm.css";

function ProductForm({
  register,
  errors,
  categories,
  currency,
  onSubmit,
  handleSubmit,
}) {
  return (
    <div className="productForm-container">
      {" "}
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
            multiple
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
            min="0"
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

export default ProductForm;
