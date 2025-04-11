import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="pb-3 fw-semibold fs-6">Dashboard</div>
      <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2 ">
        <div className="col mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold ">Orders</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-cart text-info"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </span>
              </div>
              <div className="mt-4 mb-3 d-flex align-items-center lh-1">
                <h3 className="fw-bold  mb-0">5,312</h3>
                <span className="mt-1 ms-2 text-danger ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-down icon-xs"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                  2.29%
                </span>
              </div>
              <Link to={"/admin/orders"} className="btn-link fw-semi-bold">
                View Orders
              </Link>
            </div>
          </div>
        </div>
        <div className="col mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold ">Revenue</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-dollar-sign text-info"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </span>
              </div>
              <div className="mt-4 mb-3 d-flex align-items-center lh-1">
                <h3 className="fw-bold  mb-0">$8,312</h3>
                <span className="mt-1 ms-2 text-success ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-up icon-xs"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                  2.29%
                </span>
              </div>
              <Link className="btn-link fw-semi-bold">View Earnings</Link>
            </div>
          </div>
        </div>
        <div className="col mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold ">Customer</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user text-info"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
              </div>
              <div className="mt-4 mb-3 d-flex align-items-center lh-1">
                <h3 className="fw-bold  mb-0">$15,312</h3>
                <span className="mt-1 ms-2 text-success ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-up icon-xs"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                  5.16%
                </span>
              </div>
              <Link to={"/admin/users"} className="btn-link fw-semi-bold">
                All Customer
              </Link>
            </div>
          </div>
        </div>
        <div className="col mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold ">Balance</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-credit-card text-info"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="22"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </span>
              </div>
              <div className="mt-4 mb-3 d-flex align-items-center lh-1">
                <h3 className="fw-bold  mb-0">$35.64k</h3>
              </div>
              <Link className="btn-link fw-semi-bold">Withdraw Money</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-12 mb-5 vh-100 rounded border"></div>
        <div className="col-xl-4 col-12 mb-5 vh-100 rounded border"></div>
      </div>
    </div>
  );
}

export default Dashboard;
