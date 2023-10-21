import React from "react";
import { Navigate } from "react-router-dom";
const data = localStorage.getItem("myData");
const role = JSON.parse(data)?.user?.role;
const PrivateRouteAdmin = ({ children }) => {
  return data && role == "admin" ? children : <Navigate to="/auth/login" />;
};

export default PrivateRouteAdmin;
