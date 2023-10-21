import React from "react";
//extrpages
import UpdateProfilePage from "../pages/updateProfilePage/UpdateProfilePage";
import PrivateRoute from "./PrivateRoute";
import Default from "../layouts/dashboard/default";

import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";
import Profile2 from "../views/dashboard/profiles/profile2";
import Header from "../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../components/partials/dashboard/SidebarStyle/sidebar";
import ProfileEvents from "../views/dashboard/app/profile-events";
import Groups from "../views/dashboard/app/groups";
import ProfileForums from "../views/dashboard/app/profile-forum";
import AppliersTable from "../components/apliersTable";
import CompanyOffers from "../pages/offers/CompanyOffers";
import MeetsPage from "../pages/meet/MeetsPage";
import FormValidation from "../views/dashboard/from/form-validation";
import UiTypographys from "../views/dashboard/ui-kit/ui-typography";

import AddCourseComponent from "../views/dashboard/addCourse";
import UpdateCourseComponent from "../views/dashboard/updateCourse";
import CourseComponent from "../views/dashboard/course";
import AddTestComponent from "../views/dashboard/addTest";
import FormElement from "../views/dashboard/from/form-element";
import UpdateTestComponent from "../views/dashboard/updateTest";
import TestComponent from "../views/dashboard/test";
import RatingsComponentCompany from "../views/dashboard/NewComponent";
import RatingsComponentUser from "../views/dashboard/NewComponent2";
import RatingsComponentCourse from "../views/dashboard/CourseRatingComponent";
import TasksEvents from "../views/dashboard/app/TasksEvents";
import TasksAppliers from "../components/TasksAppliers";
import CompanyTasks from "../pages/offers/CompanyTasks";


export const SimpleRouter = [
  // delete this
  {
    path: "dashboard/form/form-element",
    element: <FormElement />,
  },
  {
    path: "dashboard/ui-kit/ui-typography",
    element: <UiTypographys />,
  },
  {
    path: "dashboard/form/form-validation",
    element: <FormValidation />,
  },
  // end
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
    path: "/ratingsCourse/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentCourse />
      </>
    ),
  },
  {
    path: "/ratingsUser/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentUser />
      </>
    ),
  },
  {
    path: "/addCourse",
    element: (
      <>
        <Sidebar />
        <Header /> <AddCourseComponent />
      </>
    ),
  },
  {
    path: "/course/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <CourseComponent />
      </>
    ),
  },
  {
    path: "/updateCourse/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <UpdateCourseComponent />
      </>
    ),
  },
  {
    path: "/addTest",
    element: (
      <>
        <Sidebar />
        <Header /> <AddTestComponent />
      </>
    ),
  },
  {
    path: "/updateTest/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <UpdateTestComponent />
      </>
    ),
  },
  {
    path: "/test/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <TestComponent />
      </>
    ),
  },
  {
    path: "/dashboards/profiles/profile2",
    element: (
      <>
        <Sidebar />
        <Header /> <Profile2 />
      </>
    ),
  },
  {
    path: "/dashboards/app/profile-events",
    element: (
      <>
        <Sidebar />
        <Header /> <Groups />
      </>
    ),
  },
  {
    path: "/dashboards/app/offers",
    element: (
      <>
        <Sidebar />
        <Header /> <CompanyOffers />
      </>
    ),
  },
  {
    path: "/dashboards/app/tasks",
    element: (
      <>
        <Sidebar />
        <Header /> <TasksEvents />
      </>
    ),
  },
  {
    path: "/dashboards/app/allTasks",
    element: (
      <>
        <Sidebar />
        <Header /> <CompanyTasks />
      </>
    ),
  },
  {
    path: "/dashboards/app/groups",
    element: (
      <>
        <Sidebar />
        <Header /> <ProfileEvents />
      </>
    ),
  },
  {
    path: "/dashboards/app/meets",
    element: (
      <>
        <Sidebar />
        <Header /> <MeetsPage />
      </>
    ),
  },

  {
    path: "/dashboard/app/profile-forum",
    element: (
      <>
        <Sidebar />
        <Header /> <ProfileForums />
      </>
    ),
  },
  {
    path: "/dashboard/app/groups/appliers/:offerId",
    element: (
      <>
        <Sidebar />
        <Header /> <AppliersTable />
      </>
    ),
  },
  {
    path: "/dashboard/app/tasks/appliers/:taskId",
    element: (
      <>
        <Sidebar />
        <Header /> <TasksAppliers />
    
      </>
    ),
  },
  {
    path: "/dashboard/app/groups/offers",
    element: (
      <>
        <Sidebar />
        <Header /> <CompanyOffers />
      </>
    ),
  },
  {
    path: "/dashboard/app/groups/tasks",
    element: (
      <>
        <Sidebar />
        <Header /> <CompanyTasks />
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
