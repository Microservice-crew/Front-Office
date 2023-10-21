import React from "react";

//layoutpages
import SignUp from "../views/dashboard/auth/sign-up";
import Register from "../views/dashboard/auth/register";
import Login from "../views/dashboard/auth/login";

import ConfirmEmail from "../views/dashboard/auth/ConfirmEmail";
import ForgetPassword from "../views/dashboard/auth/ForgetPassword";
import NewPassword from "../views/dashboard/auth/NewPassword";
import Default from "../layouts/dashboard/default";

import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";

export const IndexRouters = [
  {
    path: "auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "auth/register",
    element: <Register />,
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "auth/newPassword/:token",
    element: <NewPassword />,
  },
  {
    path: "auth/confirm/:id",
    element: <ConfirmEmail />,
  },
];
