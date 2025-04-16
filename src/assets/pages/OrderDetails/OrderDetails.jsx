import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fetchApi from "../../../api/fetchApi";
import { formatDate } from "../../helpers/formatDate";
import { calculateOrderTotal } from "../../helpers/calculateOrderTotal";

function OrderDetails() {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const params = useParams();

  useEffect(() => {
    getOrder();
  }, [params.id]);

  const getOrder = async () => {
    setLoading(true);
    try {
      const data = await fetchApi({
        method: "get",
        url: `/orders/${params.id}`,
      });
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));

    try {
      await fetchApi({
        method: "patch",
        url: `/orders/${orderId}/status`,
        data: { status: newStatus },
      });

      toast.success("Status updated successfully.");
    } catch (err) {
      setOrder((prevOrder) => ({ ...prevOrder, status: prevOrder.status }));
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="orderDetails-container container-fluid">
      <div className="orderDetails-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">
          Order {params.id}
        </span>
      </div>
      {order && (
        <>
          <div className="row p-3 card d-flex flex-row">
            <div className="col-12 col-md-3">
              <ul className="list-unstyled">
                <li>Order Id:</li>
                <li>Customer:</li>
                <li>Date:</li>
                <li>Status:</li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <ul className="list-unstyled">
                <li>{order.id}</li>
                <li>
                  {order.user.firstname} {order.user.lastname}
                </li>
                <li>{formatDate(order.createdAt)}</li>
                <li>
                  <select
                    name="status"
                    id="status"
                    className="form-select"
                    value={order?.status || ""}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="">Choose a status</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                    <option value="pending">Pending</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <ul className="list-unstyled">
                <li>Email:</li>
                <li>Shipping Address:</li>
                <li>Total Amount:</li>
                <li>Payment method:</li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <ul className="list-unstyled">
                <li>{order.user.email}</li>
                <li>{order.shippingAddress}</li>
                <li>USD {calculateOrderTotal(order)}</li>
                <li>{order.paymentMethod}</li>
              </ul>
            </div>
          </div>
        </>
      )}
      <div className="row my-4">
        <ul className="list-unstyled gap-3">
          {order?.items?.map((item, index) => (
            <li key={index}>
              <div className="p-4 card">
                <div className="row align-items-center p-2">
                  <div className="col-md-2 col-3">
                    <img
                      className="order-image img-fluid"
                      alt={item.name}
                      src={item.image?.[0]}
                    />
                  </div>
                  <div className="col-md-5 col-6">
                    <div className="fw-semibold">{item.name}</div>
                  </div>
                  <div className="col-md-2 col-3 text-center">
                    Quantity:{" "}
                    <span className="fw-semibold">{item.quantity}</span>
                  </div>
                  <div className="col-md-3 col-6 text-end fw-semibold">
                    USD {Number(item.price) * item.quantity}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderDetails;
