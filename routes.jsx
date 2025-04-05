import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./src/assets/components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./src/assets/pages/Dashboard/Dashboard";
import Layout from "./src/assets/components/Layout/Layout";
import Users from "./src/assets/pages/Users/Users";
import Admin from "./src/assets/pages/Admin/Admin";
import Products from "./src/assets/pages/Products/Products";
import Orders from "./src/assets/pages/Orders/Orders";
import Categories from "./src/assets/pages/Categories/Categories";
import NotFound from "./src/assets/pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <Layout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "users", element: <Users /> },
          { path: "admin", element: <Admin /> },
          { path: "products", element: <Products /> },
          { path: "orders", element: <Orders /> },
          { path: "categories", element: <Categories /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
