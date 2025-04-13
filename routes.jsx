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
import AddProduct from "./src/assets/pages/AddProduct/AddProduct";
import UpdateProduct from "./src/assets/pages/UpdateProduct/UpdateProduct";
import AddAdmin from "./src/assets/pages/AddAdmin/AddAdmin";
import UpdateAdmin from "./src/assets/pages/UpdateAdmin/UpdateAdmin";
import OrderDetails from "./src/assets/pages/OrderDetails/OrderDetails";
import Login from "./src/assets/pages/Login/Login";
import Logout from "./src/assets/pages/Logout/Logout";
import AddCategory from "./src/assets/pages/AddCategory/AddCategory";
import UpdateCategory from "./src/assets/pages/UpdateCategory/UpdateCategory";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/logout",
    element: <Logout />,
  },

  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "admin", element: <Admin /> },
      { path: "admin/create", element: <AddAdmin /> },
      { path: "admin/:id", element: <UpdateAdmin /> },
      { path: "products", element: <Products /> },
      { path: "products/create", element: <AddProduct /> },
      { path: "products/:id", element: <UpdateProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/:id", element: <OrderDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/create", element: <AddCategory /> },
      { path: "categories/:id", element: <UpdateCategory /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
