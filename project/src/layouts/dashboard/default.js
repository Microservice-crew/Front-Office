import React from "react";

//header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//sidebar

//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";

//footer
// import Footer from '../../components/partials/dashboard/FooterStyle/footer'

//default
// import DefaultRouter from '../../router/default-router'

// share-offcanvas
// import ShareOffcanvas from '../../components/share-offcanvas'

//settingoffCanvas
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";
import { Outlet } from "react-router-dom";
import Postes from "../../views/dashboard/CreatePostes";
import { DefaultRouter } from "../../router/default-router";
const Default = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <Postes />
      <SettingOffCanvas />
    </>
  );
};

export default Default;
