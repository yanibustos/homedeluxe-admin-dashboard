import { useEffect, useState } from "react";
import RemoveModal from "../../components/Modals/RemoveModal";
import "./Products.css";
import { toast } from "react-toastify";
import fetchApi from "../../../api/fetchApi";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRemove, setShowRemove] = useState(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await fetchApi({ method: "get", url: "/products" });
      console.log(data);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = (productId) => {
    console.log(`Deleted ${productId}`);
    handleCloseRemove();
  };

  // Loading indicator
  if (loading) {
    return <Loading />;
  }

  // Error message
  if (error) {
    return (
      <div className="text-center text-danger alert alert-danger">
        <span>Something went wrong, please try again.</span>
      </div>
    );
  }

  // No products available
  if (products.length === 0) {
    return (
      <div className="text-center">
        <span>No products available.</span>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">Products</span>
        <Link
          to={"/admin/products/create"}
          className="btn btn-dark table-text fw-semibold"
        >
          New product
        </Link>
      </div>
      <table className="table table-hover text-center align-middle dashboard-table rounded rounded-3 overflow-hidden shadow-sm table-text">
        <thead className="table-header">
          <tr>
            <th scope="col">Id</th>
            <th scope="col" className="text-start">
              Name
            </th>
            <th scope="col" className="text-start">
              Price
            </th>
            <th scope="col">Stock</th>
            <th scope="col">Featured</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className="text-start">{product.name} </td>

              <td className="text-start">
                {product.currency} {product.price}
              </td>
              <td>{product.stock}</td>
              <td>
                <i
                  className={
                    product.featured
                      ? "bi bi-check-circle text-success"
                      : "bi bi-x-circle text-danger"
                  }
                ></i>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-3 align-items-center">
                  <i className="bi bi-pencil-square fs-6 edit-icon text-primary"></i>
                  <i
                    className="bi bi-trash3-fill fs-6 delete-icon text-danger"
                    onClick={handleShowRemove}
                  ></i>
                  <RemoveModal
                    show={showRemove}
                    handleClose={handleCloseRemove}
                    item={product.name}
                    handleOnClick={handleRemoveProduct}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
