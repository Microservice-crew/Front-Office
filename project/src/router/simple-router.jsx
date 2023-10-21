import React from "react";

// auth
import ConfirmMail from "../views/dashboard/auth/confirm-mail";
import LockScreen from "../views/dashboard/auth/lock-screen";
import Recoverpw from "../views/dashboard/auth/recoverpw";
import SignIn from "../views/dashboard/auth/sign-in";
import SignUp from "../views/dashboard/auth/sign-up";

// errors
import Error404 from "../views/dashboard/errors/error404";
import Error500 from "../views/dashboard/errors/error500";

//extrpages
import Maintenance from "../views/dashboard/extrapages/maintenance";
import ComingSoon from "../views/dashboard/extrapages/comingsoon";
import Register from "../views/dashboard/auth/register";
import Login from "../views/dashboard/auth/login";
import UsersPage from "../pages/usersPage/usersPage";
import UpdateProfilePage from "../pages/updateProfilePage/UpdateProfilePage";
import ConfirmEmail from "../views/dashboard/auth/ConfirmEmail";
import ForgetPassword from "../views/dashboard/auth/ForgetPassword";
import NewPassword from "../views/dashboard/auth/NewPassword";
import PrivateRoute from "./PrivateRoute";

export const SimpleRouter = [
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
