import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";

function ProtectedRoute() {
  const user = useSelector((state) => state.user);

  return user?.accessToken ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/admin/login" />
  );
}

export default ProtectedRoute;
