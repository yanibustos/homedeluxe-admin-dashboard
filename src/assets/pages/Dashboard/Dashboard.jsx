import { Link } from "react-router-dom";
import fetchApi from "../../../api/fetchApi";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import "./Dashboard.css";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        label: "Products",
        data: [],
        backgroundColor: [
          "rgba(13, 202, 240, 0.5)",
          "rgba(102, 16, 242, 0.5)",
          "rgba(255, 193, 7, 0.5)",
          "rgba(32, 201, 151, 0.5)",
          "rgba(253, 126, 20, 0.5)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  });

  const getCategories = async () => {
    const data = await fetchApi({
      method: "get",
      url: "/categories",
    });
    if (data.categories) {
      setCategories(data.categories);
    } else {
      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const labels = categories.map((category) => category.name);
      const data = categories.map((category) => category.productCount);

      setCategoryData((prevData) => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
          },
        ],
      }));
    }
  }, [categories]);

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "2024 Sales",
        data: [
          1200, 1900, 3000, 5000, 3200, 4000, 4200, 3700, 4300, 5000, 4800,
          5200,
        ],
        borderColor: "#0dcaf0",
        backgroundColor: "rgba(13, 202, 240, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "2025 Sales",
        data: [
          1500, 2200, 3500, 6000, 4100, 4700, 5000, 4500, 5300, 5900, 5700,
          6300,
        ],
        borderColor: "#6610f2",
        backgroundColor: "rgba(102, 16, 242, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container container-fluid">
      <div className="pb-3 fw-semibold fs-5">Dashboard</div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-4">
        <div className="col">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold">Orders</span>
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
                <h3 className="fw-bold mb-0">5,312</h3>
              </div>
              <Link
                to="/admin/orders"
                className="btn-link fw-semi-bold text-decoration-none"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold">Revenue</span>
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
                <h3 className="fw-bold mb-0">$8,312</h3>
              </div>
              <Link className="btn-link fw-semi-bold text-decoration-none">
                View Earnings
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold">Customers</span>
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
                <h3 className="fw-bold mb-0">15,312</h3>
              </div>
              <Link
                to="/admin/users"
                className="btn-link fw-semi-bold text-decoration-none"
              >
                All Customers
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semi-bold">Balance</span>
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
                <h3 className="fw-bold mb-0">$35.64k</h3>
              </div>
              <Link className="btn-link fw-semi-bold text-decoration-none">
                Withdraw Money
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-xl-9 col-12">
          <div className="border rounded px-3 py-4 chart-container">
            <h6 className="fw-semibold mb-3">Sales Evolution</h6>
            <Line
              data={salesData}
              options={{
                responsive: true,
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#6c757d", boxWidth: 12 } },
                },
                scales: {
                  x: {
                    ticks: { color: "#6c757d" },
                    grid: { color: "#e9ecef" },
                  },
                  y: {
                    ticks: { color: "#6c757d" },
                    grid: { color: "#e9ecef" },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="col-xl-3 col-12">
          <div className="border rounded px-3 py-4 chart-container">
            <h6 className="fw-semibold mb-3">Product Categories</h6>
            <Doughnut
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  },
                },
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#6c757d", boxWidth: 12 },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
