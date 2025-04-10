import { Link } from "react-router-dom";
import "./Orders.css";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import fetchApi from "../../../api/fetchApi";
import { formatDate } from "../../helpers/formatDate";

// const orders = [
//   {
//     id: "123456",
//     created_at: "25/05/2025",
//     amount: "USD 460",
//     items: [
//       {
//         id: "p1",
//         name: "SOFA SENSE White 2-Seater",
//         price: "USD 890",
//         quantity: 1,
//         status: "Processing",
//         image:
//           "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
//       },
//       {
//         id: "p2",
//         name: "Captivating Brown Circular Coffee Table",
//         price: "USD 990",
//         quantity: 2,
//         status: "Shipped",
//         image:
//           "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
//       },
//     ],
//   },
//   {
//     id: "987654",
//     created_at: "01/04/2025",
//     amount: "USD 1200",
//     items: [
//       {
//         id: "p1",
//         name: "SOFA SENSE White 2-Seater",
//         price: "USD 600",
//         quantity: 1,
//         status: "Processing",
//         image:
//           "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
//       },
//       {
//         id: "p2",
//         name: "Captivating Brown Circular Coffee Table",
//         price: "USD 600",
//         quantity: 1,
//         status: "Shipped",
//         image:
//           "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
//       },
//     ],
//   },
// ];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showRemove, setShowRemove] = useState(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = (order) => {
    setSelectedOrder(order);
    setShowRemove(true);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchApi({ method: "get", url: "/orders" });
      console.log(data);
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
        <thead className="table-header">
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
                    {order.products.length}
                  </td>
                  <td className="align-content-center">{order.totalPrice}</td>
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
