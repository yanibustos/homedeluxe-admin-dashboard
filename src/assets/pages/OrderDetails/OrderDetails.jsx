import { Link } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  return (
    <div className="orderDetails-container container-fluid">
      <div className="orderDetails-header d-flex justify-content-between align-items-center mb-3">
        <span className="fs-5 text-uppercase fw-semibold">
          Order `${"order.id"}`
        </span>
      </div>
      <div className="row p-3 card d-flex flex-row">
        <div className="col-12 col-md-3">
          <ul className="list-unstyled">
            <li>Order ID:</li>
            <li>Customer:</li>
            <li>Date:</li>
            <li>Status:</li>
          </ul>
        </div>
        <div className="col-12 col-md-3">
          <ul className="list-unstyled">
            <li>123456</li>
            <li>Yanina Bustos</li>
            <li>07/04/2025</li>
            <li>
              <select name="status" id="status" className="form-select">
                <option value="">Choose a status</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
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
            <li>yanibustos4596@gmail.com</li>
            <li>18 de julio 1234</li>
            <li>USD 1750</li>
            <li>Visa</li>
          </ul>
        </div>
      </div>
      <div className="row my-4">
        <div className="p-4 card">
          <ul className="list-unstyled gap-3">
            <li>
              <div className="row align-items-center p-2">
                <div className="col-md-2 col-3">
                  <img
                    className="order-image img-fluid"
                    alt="SOFA SENSE White 2-Seater"
                    src="https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg"
                  ></img>
                </div>
                <div className="col-md-5 col-6">
                  <div className="fw-semibold">SOFA SENSE White 2-Seater</div>
                </div>
                <div className="col-md-2 col-3 text-center">
                  Quantity: <span className="fw-semibold">1</span>
                </div>
                <div className="col-md-3 col-6 text-end fw-semibold">
                  USD 890
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
