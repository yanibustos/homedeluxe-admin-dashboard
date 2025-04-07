import { Link } from "react-router-dom";
import Input from "../commons/Input/Input";
import "./AdminForm.css";

function AdminForm({
  register,
  errors,
  onSubmit,
  handleSubmit,
  isUpdateAdmin = false,
  setShowModal,
}) {
  return (
    <div className="adminForm-container">
      {" "}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            label="Firstname"
            classNameLabel="fw-semibold"
            register={{ ...register("firstname") }}
            errors={errors}
          />
        </div>
        <div>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            label="Lastname"
            classNameLabel="fw-semibold"
            register={{ ...register("lastname") }}
            errors={errors}
          />
        </div>
        {!isUpdateAdmin && (
          <>
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                label="Email"
                classNameLabel="fw-semibold"
                register={{ ...register("email") }}
                errors={errors}
              />
            </div>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                label="Password"
                classNameLabel="fw-semibold"
                register={{ ...register("password") }}
                errors={errors}
              />
            </div>
          </>
        )}
        {isUpdateAdmin && (
          <div>
            <div className="my-3">
              <label
                htmlFor="avatar"
                className="fw-semibold addProduct-label mb-2"
              >
                Photos
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="form-control"
                multiple
                {...register("avatar")}
              />
            </div>
            <div className="my-3">
              <button
                type="button"
                className="btn btn-outline-dark table-text fw-semibold"
                onClick={() => setShowModal(true)}
              >
                Reset password
              </button>
            </div>
          </div>
        )}

        <div className="my-4">
          <Link to={"/admin/admin"} className="btn btn-secondary me-3">
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

export default AdminForm;
