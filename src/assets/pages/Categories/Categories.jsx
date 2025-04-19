import { Link, useParams } from "react-router-dom";
import "./Categories.css";
import { useEffect, useState } from "react";
import RemoveModal from "../../components/Modals/RemoveModal";
import { toast } from "react-toastify";
import fetchApi from "../../../api/fetchApi";
import { useSelector } from "react-redux";

function Categories() {
  const user = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const [showRemove, setShowRemove] = useState(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = (category) => {
    setSelectedCategory(category);
    setShowRemove(true);
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      await fetchApi({
        method: "delete",
        url: `/categories/${categoryId}`,
        accessToken: user.accessToken,
      });
      getCategories();
      handleCloseRemove();
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetchApi({
        method: "GET",
        url: `/categories`,
      });
      if (response.categories) {
        setCategories(response.categories);
      }
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="categories-container container-fluid">
      <div className="categories-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">Categories</span>
        <Link
          to={"/admin/categories/create"}
          className="btn btn-dark table-text fw-semibold"
        >
          New Category
        </Link>
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
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td className="text-start">{category.name} </td>
                <td>
                  <div className="d-flex justify-content-center gap-3 align-items-center categories-actions">
                    <Link to={`/admin/categories/${category.id}`}>
                      <i className="bi bi-pencil-square fs-6 edit-icon text-primary"></i>
                    </Link>
                    <i
                      className="bi bi-trash3-fill fs-6 delete-icon text-danger"
                      onClick={() => handleShowRemove(category)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedCategory && (
        <RemoveModal
          show={showRemove}
          handleClose={handleCloseRemove}
          item={selectedCategory.name}
          handleOnClick={() => handleRemoveCategory(selectedCategory.id)}
        />
      )}
    </div>
  );
}

export default Categories;
