import { Link } from "react-router-dom";
import "./Orders.css";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import fetchApi from "../../../api/fetchApi";
import { formatDate } from "../../helpers/formatDate";
import { toast } from "react-toastify";
import { calculateOrderTotal } from "../../helpers/calculateOrderTotal";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            <th scope="col">Payment method</th>
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
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="">Choose a status</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="align-content-center orders-actions">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-dark"
                    >
                      <i className="bi bi-card-list fs-5 "></i>
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
