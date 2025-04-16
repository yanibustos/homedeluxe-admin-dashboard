import { Link } from "react-router-dom";
import "./Orders.css";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import fetchApi from "../../../api/fetchApi";
import { formatDate } from "../../helpers/formatDate";
import { toast } from "react-toastify";
import { calculateOrderTotal } from "../../helpers/calculateOrderTotal";
import Select from "react-select";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = [
    { value: "pending", label: "Pending", color: "#aeb2b6" },
    { value: "paid", label: "Paid", color: "#198754" },
    { value: "processing", label: "Processing", color: "#ffc107" },
    { value: "shipped", label: "Shipped", color: "#0dcaf0" },
    { value: "canceled", label: "Canceled", color: "#dc3545" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: state.isSelected ? "700" : "400",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: "700",
    }),
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchApi({ method: "get", url: "/orders" });
      setOrders(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      await fetchApi({
        method: "patch",
        url: `/orders/${orderId}/status`,
        data: { status: newStatus },
      });

      toast.success("Status updated successfully.");
    } catch (err) {
      console.error("Failed to update status", err);

      const revertedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: order.status } : order
      );
      setOrders(revertedOrders);

      toast.error("Failed to update order status.");
    }
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
  if (orders.length === 0) {
    return (
      <div className="text-center">
        <span>No orders available.</span>
      </div>
    );
  }

  return (
    <div className="orders-container container-fluid">
      <div className="orders-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">Orders</span>
      </div>
      <table className="table table-hover text-center align-middles rounded rounded-3 overflow-hidden shadow-sm table-text">
        <thead className="table-header table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Products</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td className="align-content-center">{order.id}</td>
                  <td className="align-content-center">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="align-content-center">
                    {order.user.firstname} {order.user.lastname}
                  </td>
                  <td className="align-content-center">
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </td>
                  <td className="align-content-center">
                    <span className="me-1">USD</span>
                    {calculateOrderTotal(order)}
                  </td>
                  <td className="align-content-center">
                    {order.paymentMethod}
                  </td>
                  <td className="align-content-center">
                    <Select
                      name="status"
                      id="status"
                      value={options.find((opt) => opt.value === order.status)}
                      onChange={(selectedOption) =>
                        handleStatusChange(order.id, selectedOption.value)
                      }
                      options={options}
                      styles={customStyles}
                    />
                  </td>
                  <td className="align-content-center orders-actions">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-dark"
                      title="See details"
                    >
                      <i className="bi bi-eye-fill text-primary fs-6 "></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
