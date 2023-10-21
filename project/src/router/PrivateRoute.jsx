import React from "react";
import { Navigate } from "react-router-dom";
const data = localStorage.getItem("myData");
const PrivateRoute = ({ children }) => {
  return data ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
