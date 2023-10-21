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
import Admin from "../views/dashboard/app/admin";
import Index from "../views/dashboard/CreatePostes";
import Default from "../layouts/dashboard/default";

import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";
import Profile2 from "../views/dashboard/profiles/profile2";
import Header from "../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../components/partials/dashboard/SidebarStyle/sidebar";
import RightSidebar from "../components/partials/dashboard/SidebarStyle/rightsidebar";
import ProfileVideos from "../views/dashboard/app/profile-videos";
import ProfileEvents from "../views/dashboard/app/profile-events";
import EventDetail from "../views/dashboard/app/event-detail";
import Groups from "../views/dashboard/app/groups";
import ProfileForums from "../views/dashboard/app/profile-forum";
import RatingsComponentCompany from "../views/dashboard/NewComponent";
import RatingsComponentUser from "../views/dashboard/NewComponent2";
import TasksEvents from "../views/dashboard/app/TasksEvents";

export const SimpleRouter = [
  {
    path: "/",
    element: <Default />,
    children: [...DefaultRouter, ...Layout1Router],
  },
  {
    path: "/ratingsCompany/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentCompany />
      </>
    ),
  },
  {
    path: "/ratingsUser/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentUser />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/profiles/profile2",
    element: (
      <>
        <Sidebar />
        <Header /> <Profile2 />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/profile-events",
    element: (
      <>
        <Sidebar />
        <Header /> <Groups />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/group-detail",
    element: (
      <>
        <Sidebar />
        <Header /> <EventDetail />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/groups",
    element: (
      <>
        <Sidebar />
        <Header /> <ProfileEvents />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/tasks",
    element: (
      <>
        <Sidebar />
        <Header /> <TasksEvents />{" "}
      </>
    ),
  },
  {
    path: "/dashboard/app/profile-forum",
    element: (
      <>
        <Sidebar />
        <Header /> <ProfileForums />{" "}
      </>
    ),
  },
  {
    path: "/update",
    element: <UpdateProfilePage />,
  },
];

export const UserRoutes = SimpleRouter.map((e) => {
  return {
    path: e.path,
    element: <PrivateRoute>{e.element}</PrivateRoute>,
  };
});
