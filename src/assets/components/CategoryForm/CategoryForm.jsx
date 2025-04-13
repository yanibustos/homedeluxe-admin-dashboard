import { Link } from "react-router-dom";
import Input from "../commons/Input/Input";
import "./CategoryForm.css";

function CategoryForm({ register, errors, onSubmit, handleSubmit }) {
  return (
    <div className="categoryForm-container">
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

        <div className="my-4">
          <Link to={"/admin/categories"} className="btn btn-secondary me-3">
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

export default CategoryForm;
