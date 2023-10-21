import React, { useState } from "react";
import {
  Dropdown,
  Nav,
  Form,
  Card,
  Container,
  Image,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

//image
import user1 from "../../../../assets/images/user/1.jpg";
import user2 from "../../../../assets/images/user/02.jpg";
import user3 from "../../../../assets/images/user/03.jpg";
import user4 from "../../../../assets/images/user/04.jpg";
import user5 from "../../../../assets/images/user/05.jpg";
import user6 from "../../../../assets/images/page-img/19.jpg";
import user7 from "../../../../assets/images/page-img/18.jpg";
import user8 from "../../../../assets/images/page-img/20.jpg";
import user9 from "../../../../assets/images/page-img/21.jpg";
import user10 from "../../../../assets/images/page-img/22.jpg";
import user11 from "../../../../assets/images/page-img/23.jpg";
import user12 from "../../../../assets/images/page-img/24.jpg";
import user13 from "../../../../assets/images/page-img/09.jpg";
import user14 from "../../../../assets/images/page-img/03.jpg";
import user15 from "../../../../assets/images/page-img/02.jpg";
import user16 from "../../../../assets/images/page-img/01.jpg";
import img1 from "../../../../assets/images/LogoStage.png";
//Componets
import ChatWidget from "../../../chat/ChatWidget";
import CustomToggle from "../../../dropdowns";
// import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

const Header = () => {
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("myData");
  };

  const data = JSON.parse(localStorage.getItem("myData"));

  return (
    <>
      <ChatWidget userID={data.user._id} role={data.user.role} />
      <div className="iq-top-navbar">
        <Nav
          expand="lg"
          variant="light"
          className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
        >
          <Container fluid className="navbar-inner">
            <div className="d-flex align-items-center gap-3  pb-2 pb-lg-0">
              <Link
                to="/"
                className="d-flex align-items-center gap-2 iq-header-logo"
              >
                <img
                  src={img1}
                  style={{ width: "100px", height: "50px" }}
                  alt="logo"
                />
              </Link>
              <Link
                to="#"
                className="sidebar-toggle"
                data-toggle="sidebar"
                data-active="true"
                onClick={minisidebar}
              >
                <div className="icon material-symbols-outlined iq-burger-menu">
                  menu
                </div>
              </Link>
            </div>

            <div className="iq-search-bar device-search  position-relative">
              <form
                action="#"
                className="searchbox"
                onClick={handleShow}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalFullscreenSm"
              ></form>

              <Modal
                show={show}
                onHide={handleClose}
                className="search-modal"
                id="post-modal"
              >
                <div className="modal-dialog modal-fullscreen-lg-down m-0">
                  <Modal.Header className="py-2">
                    <div className="d-flex align-items-center justify-content-between d-lg-none w-100">
                      <form
                        action="#"
                        className="searchbox w-50"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalFullscreenSm"
                        onClick={handleShow}
                      >
                        <Link className="search-link" to="/">
                          <span className="material-symbols-outlined">
                            search
                          </span>
                        </Link>

                        <Form.Control
                          type="text"
                          className="text search-input bg-soft-primary"
                          placeholder="Search here..."
                        />
                      </form>

                      <Link
                        to="/"
                        className="material-symbols-outlined text-dark"
                        onClick={handleClose}
                      >
                        close
                      </Link>
                    </div>
                    {/* <Modal.Title> */}
                    <div className="d-flex align-items-center justify-content-between ms-auto w-100">
                      <h5 className=" h4" id="exampleModalFullscreenLabel">
                        Recent
                      </h5>

                      <Link to="/" className="text-dark">
                        Clear All
                      </Link>
                    </div>
                    {/* </Modal.Title> */}
                  </Modal.Header>
                  <Modal.Body className="p-0">
                    <div className="d-flex d-lg-none align-items-center justify-content-between w-100 p-3 pb-0">
                      <h5 className=" h4" id="exampleModalFullscreenLabel">
                        Recent
                      </h5>

                      <Link to="/" className="text-dark">
                        Clear All
                      </Link>
                    </div>
                    <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
                      <div className="flex-shrink-0">
                        <Image
                          className="align-self-center img-fluid avatar-50 rounded-pill"
                          src={user6}
                          alt=""
                          loading="lazy"
                        />
                      </div>

                      <div className="d-flex flex-column ms-3">
                        <Link to="/" className="h5">
                          Paige Turner
                        </Link>

                        <span>Paige001</span>
                      </div>

                      <div className="d-flex align-items-center ms-auto">
                        <Link to="/" className="me-3 d-flex align-items-center">
                          <small>Follow</small>{" "}
                        </Link>

                        <Link
                          to="/"
                          className="material-symbols-outlined text-dark"
                        >
                          close
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
                      <div className="flex-shrink-0">
                        <Image
                          className="align-self-center img-fluid avatar-50 rounded-pill"
                          src={user7}
                          alt=""
                          loading="lazy"
                        />
                      </div>

                      <div className="d-flex flex-column ms-3">
                        <Link to="/" className="h5">
                          Monty Carlo
                        </Link>

                        <span>Carlo.m</span>
                      </div>

                      <div className="d-flex align-items-center ms-auto">
                        <Link to="/" className="me-3 d-flex align-items-center">
                          <small>Unfollow</small>{" "}
                        </Link>

                        <Link
                          to="/"
                          className="material-symbols-outlined text-dark"
                        >
                          close
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex align-items-center search-hover py-2 px-3 border-bottom">
                      <div className="flex-shrink-0">
                        <Image
                          className="align-self-center img-fluid avatar-50 rounded-pill"
                          src={user8}
                          alt=""
                          loading="lazy"
                        />
                      </div>

                      <div className="d-flex flex-column ms-3">
                        <Link to="/" className="h5">
                          Paul Molive
                        </Link>

                        <span>Paul.45</span>
                      </div>

                      <div className="d-flex align-items-center ms-auto">
                        <Link to="/" className="me-3 d-flex align-items-center">
                          <small>Request</small>{" "}
                        </Link>

                        <Link
                          to="/"
                          className="material-symbols-outlined text-dark"
                        >
                          close
                        </Link>
                      </div>
                    </div>
                    <div className="">
                      <h4 className="px-3 py-2">Suggestions</h4>

                      <div className="suggestion-card px-3 d-flex">
                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user8}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Ammy Paul
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Follow</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user9}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Roger Carlo
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Unfollow</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story ">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user10}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Justin Molive
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Follow</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile ">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user11}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Roy Fisher
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Request</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user12}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Johan Carlo
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Follow</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user13}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              MedrLink Miles
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Unfollow</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user14}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Aohan Paul
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Request</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user15}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Rokni Joy
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Follow</small>{" "}
                          </Link>
                        </div>

                        <div className="text-center story">
                          <div className="story-profile">
                            <Image
                              className="avatar-50 rounded-pill"
                              src={user16}
                              alt=""
                              loading="lazy"
                            />

                            <Link
                              to="/"
                              className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                            >
                              Sepid Ryan
                            </Link>
                          </div>

                          <Link
                            to="/"
                            className="d-lg-none align-items-center d-flex"
                          >
                            <small>Unfollow</small>{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </div>
              </Modal>
            </div>

            <ul className="navbar-nav navbar-list">
              <Nav.Item as="li">
                <Link to="/" className="d-flex align-items-center">
                  <i className="material-symbols-outlined">home</i>
                  <span className="mobile-text d-none ms-3">Home</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li" className="d-lg-none">
                <div className="iq-search-bar device-search  position-relative">
                  <form
                    action="#"
                    className="searchbox"
                    onClick={handleShow}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalFullscreenSm"
                  >
                    <Link className="search-link d-none d-lg-block" to="/">
                      <span className="material-symbols-outlined">search</span>
                    </Link>
                    <Form.Control
                      type="text"
                      className="text search-input form-control bg-soft-primary  d-none d-lg-block"
                      placeholder="Search here..."
                    />
                    <Link
                      className="d-lg-none d-flex"
                      to="/"
                      onClick={handleShow}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalFullscreenSm"
                    >
                      <span className="material-symbols-outlined">search</span>
                    </Link>
                  </form>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    className="search-modal"
                    id="post-modal"
                  >
                    <div className="modal-dialog modal-fullscreen-lg-down m-0">
                      <Modal.Header className="py-2">
                        <div className="d-flex align-items-center justify-content-between d-lg-none w-100">
                          <form
                            action="#"
                            className="searchbox w-50"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreenSm"
                            onClick={handleShow}
                          >
                            <Link className="search-link" to="/">
                              <span className="material-symbols-outlined">
                                search
                              </span>
                            </Link>

                            <Form.Control
                              type="text"
                              className="text search-input bg-soft-primary"
                              placeholder="Search here..."
                            />
                          </form>

                          <Link
                            to="/"
                            className="material-symbols-outlined text-dark"
                            onClick={handleClose}
                          >
                            close
                          </Link>
                        </div>
                        {/* <Modal.Title> */}
                        <div className="d-flex align-items-center justify-content-between ms-auto w-100">
                          <h5 className=" h4" id="exampleModalFullscreenLabel">
                            Recent
                          </h5>

                          <Link to="/" className="text-dark">
                            Clear All
                          </Link>
                        </div>
                        {/* </Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body className="p-0">
                        <div className="d-flex d-lg-none align-items-center justify-content-between w-100 p-3 pb-0">
                          <h5 className=" h4" id="exampleModalFullscreenLabel">
                            Recent
                          </h5>

                          <Link to="/" className="text-dark">
                            Clear All
                          </Link>
                        </div>
                        <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
                          <div className="flex-shrink-0">
                            <Image
                              className="align-self-center img-fluid avatar-50 rounded-pill"
                              src={user6}
                              alt=""
                              loading="lazy"
                            />
                          </div>

                          <div className="d-flex flex-column ms-3">
                            <Link to="/" className="h5">
                              Paige Turner
                            </Link>

                            <span>Paige001</span>
                          </div>

                          <div className="d-flex align-items-center ms-auto">
                            <Link
                              to="/"
                              className="me-3 d-flex align-items-center"
                            >
                              <small>Follow</small>{" "}
                            </Link>

                            <Link
                              to="/"
                              className="material-symbols-outlined text-dark"
                            >
                              close
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
                          <div className="flex-shrink-0">
                            <Image
                              className="align-self-center img-fluid avatar-50 rounded-pill"
                              src={user7}
                              alt=""
                              loading="lazy"
                            />
                          </div>

                          <div className="d-flex flex-column ms-3">
                            <Link to="/" className="h5">
                              Monty Carlo
                            </Link>

                            <span>Carlo.m</span>
                          </div>

                          <div className="d-flex align-items-center ms-auto">
                            <Link
                              to="/"
                              className="me-3 d-flex align-items-center"
                            >
                              <small>Unfollow</small>{" "}
                            </Link>

                            <Link
                              to="/"
                              className="material-symbols-outlined text-dark"
                            >
                              close
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex align-items-center search-hover py-2 px-3 border-bottom">
                          <div className="flex-shrink-0">
                            <Image
                              className="align-self-center img-fluid avatar-50 rounded-pill"
                              src={user8}
                              alt=""
                              loading="lazy"
                            />
                          </div>

                          <div className="d-flex flex-column ms-3">
                            <Link to="/" className="h5">
                              Paul Molive
                            </Link>

                            <span>Paul.45</span>
                          </div>

                          <div className="d-flex align-items-center ms-auto">
                            <Link
                              to="/"
                              className="me-3 d-flex align-items-center"
                            >
                              <small>Request</small>{" "}
                            </Link>

                            <Link
                              to="/"
                              className="material-symbols-outlined text-dark"
                            >
                              close
                            </Link>
                          </div>
                        </div>
                        <div className="">
                          <h4 className="px-3 py-2">Suggestions</h4>

                          <div className="suggestion-card px-3 d-flex">
                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user8}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Ammy Paul
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Follow</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user9}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Roger Carlo
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Unfollow</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story ">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user10}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Justin Molive
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Follow</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile ">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user11}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Roy Fisher
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Request</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user12}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Johan Carlo
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Follow</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user13}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  MedrLink Miles
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Unfollow</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user14}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Aohan Paul
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Request</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user15}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Rokni Joy
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Follow</small>{" "}
                              </Link>
                            </div>

                            <div className="text-center story">
                              <div className="story-profile">
                                <Image
                                  className="avatar-50 rounded-pill"
                                  src={user16}
                                  alt=""
                                  loading="lazy"
                                />

                                <Link
                                  to="/"
                                  className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small"
                                >
                                  Sepid Ryan
                                </Link>
                              </div>

                              <Link
                                to="/"
                                className="d-lg-none align-items-center d-flex"
                              >
                                <small>Unfollow</small>{" "}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                    </div>
                  </Modal>
                </div>
              </Nav.Item>
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  href="/"
                  as={CustomToggle}
                  variant="d-flex align-items-center"
                >
                  <span className="material-symbols-outlined">group</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sub-drop sub-drop-large">
                  <Card className="shadow-none m-0">
                    <Card.Header className="d-flex justify-content-between bg-primary">
                      <div className="header-title">
                        <h5 className="mb-0 text-white">Friend Request</h5>
                      </div>
                      <small className="badge  bg-light text-dark ">4</small>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="iq-friend-request">
                        <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Image
                              className="avatar-40 rounded"
                              src={user1}
                              alt=""
                              loading="lazy"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0 ">Jaques Amole</h6>
                              <p className="mb-0">40 friends</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="me-3 btn btn-primary rounded"
                            >
                              Confirm
                            </Link>
                            <Link
                              to="#"
                              className="me-3 btn btn-secondary rounded"
                            >
                              Delete Request
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="iq-friend-request">
                        <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Image
                              className="avatar-40 rounded"
                              src={user2}
                              alt=""
                              loading="lazy"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0 ">Lucy Tania</h6>
                              <p className="mb-0">12 friends</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="me-3 btn btn-primary rounded"
                            >
                              Confirm
                            </Link>
                            <Link
                              to="#"
                              className="me-3 btn btn-secondary rounded"
                            >
                              Delete Request
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="iq-friend-request">
                        <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Image
                              className="avatar-40 rounded"
                              src={user3}
                              alt=""
                              loading="lazy"
                            />
                            <div className=" ms-3">
                              <h6 className="mb-0 ">Manny Petty</h6>
                              <p className="mb-0">3 friends</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="me-3 btn btn-primary rounded"
                            >
                              Confirm
                            </Link>
                            <Link
                              to="#"
                              className="me-3 btn btn-secondary rounded"
                            >
                              Delete Request
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="iq-friend-request">
                        <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Image
                              className="avatar-40 rounded"
                              src={user4}
                              alt=""
                              loading="lazy"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0 ">Marsha Mello</h6>
                              <p className="mb-0">15 friends</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="me-3 btn btn-primary rounded"
                            >
                              Confirm
                            </Link>
                            <Link
                              to="#"
                              className="me-3 btn btn-secondary rounded"
                            >
                              Delete Request
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link to="#" className=" btn text-primary">
                          View More Request
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li" className="nav-item ">
                <Dropdown.Toggle
                  href="#"
                  as={CustomToggle}
                  variant="search-toggle d-flex align-items-center"
                >
                  <i className="material-symbols-outlined">notifications</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sub-drop">
                  <Card className="shadow-none m-0">
                    <Card.Header className="d-flex justify-content-between bg-primary">
                      <div className="header-title bg-primary">
                        <h5 className="mb-0 text-white ">All Notifications</h5>
                      </div>
                      <small className="badge  bg-light text-dark">4</small>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user1}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Emma Watson Bni</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">95 MB</p>
                              <small className="float-right font-size-12">
                                Just Now
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user2}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">New customer is join</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                5 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user3}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Two customer is left</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                2 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user4}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="w-100 ms-3">
                            <h6 className="mb-0 ">New Mail from Fenny</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                3 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>

              {/* <Nav.Item as="li" className="d-lg-none">
              <Link
                to="/dashboard/app/notification"
                className="d-flex align-items-center"
              >
                <i className="material-symbols-outlined">notifications</i>
                <span className="mobile-text  ms-3 d-none">Notifications</span>
              </Link>
  </Nav.Item>*/}
              <Nav.Item className="nav-item d-none d-lg-none">
                <Link
                  to="#"
                  className="dropdown-toggle d-flex align-items-center"
                  id="mail-drop-1"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-symbols-outlined">mail</i>
                  <span className="mobile-text  ms-3">Message</span>
                </Link>
              </Nav.Item>
              <Dropdown as="li" className="nav-item user-dropdown">
                <Dropdown.Toggle
                  href="#"
                  as={CustomToggle}
                  variant="d-flex align-items-center"
                >
                  <Image
                    src={
                      data.user.picture
                        ? `http://localhost:9000/data/${data.user.picture}`
                        : user1
                    }
                    className="img-fluid rounded-circle me-3"
                    alt="user"
                    loading="lazy"
                  />
                  <div className="caption d-none d-lg-block">
                    <h6 className="mb-0 line-height">{data.user.fullName}</h6>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sub-drop caption-menu">
                  <Card className="shadow-none m-0">
                    <Card.Header>
                      <div className="header-title">
                        <h5 className="mb-0 ">Hello {data.user.fullName}</h5>
                      </div>
                    </Card.Header>
                    <Card.Body className="p-0 ">
                      <div className="d-flex align-items-center iq-sub-card">
                        <span className="material-symbols-outlined">login</span>
                        <div className="ms-3" onClick={() => handleLogout()}>
                          <Link to="/auth/login" className="mb-0 h6">
                            Sign out
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>

              {/*  <Nav.Item as="li" className="d-lg-none">
              <Link
                to="/dashboard/app/profile"
                className="dropdown-toggle d-flex align-items-center"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="mobile-text  ms-3">Profile</span>
              </Link>
      </Nav.Item>*/}
            </ul>
          </Container>
        </Nav>
      </div>
    </>
  );
};

export default Header;
