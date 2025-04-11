import { Link } from "react-router-dom";
import "./Categories.css";
import { useState } from "react";
import RemoveModal from "../../components/Modals/RemoveModal";
import { toast } from "react-toastify";

const categories = [
  { id: 1, name: "Sofas and armchairs" },
  { id: 2, name: "Decoration" },
  { id: 3, name: "Tables and desk" },
  { id: 4, name: "Kitchen furniture" },
  { id: 5, name: "Bedroom" },
  { id: 6, name: "Outdoors" },
];

function Categories() {
  // const [selectedCategory, setSelectedCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [showRemove, setShowRemove] = useState(false);
  // const handleCloseRemove = () => setShowRemove(false);
  // const handleShowRemove = (category) => {
  //   setSelectedCategory(category);
  //   setShowRemove(true);
  // };

  // const handleRemoveCategory = (categoryId) => {
  //   toast.warning("Sorry this feature is not available yet");
  //   handleCloseRemove();
  // };

  return (
    <div className="categories-container container-fluid">
      <div className="categories-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">Categories</span>
        {/* <Link
          to={"/admin/categories/create"}
          className="btn btn-dark table-text fw-semibold"
        >
          New Category
        </Link> */}

        <button
          className="btn btn-dark table-text fw-semibold"
          onClick={() =>
            toast.warning("Sorry this feature is not available yet.")
          }
        >
          New Category
        </button>
      </div>
      <table className="table table-hover text-center align-middle dashboard-table rounded rounded-3 overflow-hidden shadow-sm table-text">
        <thead className="table-header table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col" className="text-start">
              Name
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td className="text-start">{category.name} </td>
              <td>
                <div className="d-flex justify-content-center gap-3 align-items-center categories-actions">
                  <i
                    className="bi bi-pencil-square fs-6 edit-icon text-primary"
                    onClick={() =>
                      toast.warning("Sorry this feature is not available yet.")
                    }
                  ></i>
                  {/* <Link to={`/admin/category/${category.id}`}>
                    <i className="bi bi-pencil-square fs-6 edit-icon text-primary"></i>
                  </Link> */}
                  <i
                    className="bi bi-trash3-fill fs-6 delete-icon text-danger"
                    onClick={() =>
                      toast.warning("Sorry this feature is not available yet.")
                    }
                    // onClick={() => handleShowRemove(category)}
                  ></i>
                  {/* {selectedCategory && (
                    <RemoveModal
                      show={showRemove}
                      handleClose={handleCloseRemove}
                      item={selectedCategory.name}
                      handleOnClick={() =>
                        handleRemoveCategory(selectedCategory.id)
                      }
                    />
                  )} */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
