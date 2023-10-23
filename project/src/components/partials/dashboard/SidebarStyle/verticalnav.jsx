import React, { useState, useContext, useEffect } from "react";

//router
import { Link, useLocation } from "react-router-dom";

//react-bootstrap
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Nav,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = React.memo(() => {
  const user = JSON.parse(localStorage.getItem("myData"));
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  //location
  let location = useLocation();
  const [expert, setExpert] = useState(false);
  const [company, setCompany] = useState(false);
  // console.log(document);
  useEffect(() => {
    if (user.user.role === "expert") {
      setExpert(true);
      setCompany(false);
    }
    if (user.user.role === "company") {
      setExpert(false);
      setCompany(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Accordion
        as="ul"
        className="navbar-nav iq-main-menu position-relative"
        id="sidebar-menu"
      >
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Main Menu </span>
            <span
              className="mini-icon"
              data-bs-toggle="tooltip"
              title="Social"
              data-bs-placement="right"
            >
              -
            </span>
          </Link>
        </li>
        <li
          className={`${location.pathname === "/" ? "active" : ""} nav-item `}
        >
          <Link
            className={`${location.pathname === "/" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/"
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>home</Tooltip>}>
              <i className="icon material-symbols-outlined">newspaper</i>
            </OverlayTrigger>
            <span className="item-name">Home</span>
          </Link>
        </li>
        <li
          className={`${
            location.pathname === "/dashboards/profiles/profile2"
              ? "active"
              : ""
          } nav-item`}
        >
          <Link
            className={`${
              location.pathname === "/dashboards/profiles/profile2"
                ? "active"
                : ""
            } nav-link `}
            aria-current="page"
            to="/dashboards/profiles/profile2"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <i className="icon material-symbols-outlined">person</i>
            </OverlayTrigger>
            <span className="item-name">Profile</span>
          </Link>
        </li>

        {company ? (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/tasks" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/tasks"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>

              <span className="item-name">Hotels</span>
            </Link>
          </Nav.Item>
        ) : (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/allTasks" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/allTasks"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>

              <span className="item-name">All Hotels</span>
            </Link>
          </Nav.Item>
        )}

        {!company ? <Nav.Item as="li"></Nav.Item> : ""}
        {company ? (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/groups" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/groups"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">Chambres</span>
            </Link>
            <Link
              className={`${
                location.pathname === "/dashboards/app/staff" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/staff"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">Staff</span>
            </Link>
            <Link
              className={`${
                location.pathname === "/dashboards/app/flight" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/flight"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">Flight</span>
            </Link>
            <Link
              className={`${
                location.pathname === "/dashboards/app/seat" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/seat"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">Seat</span>
            </Link>
          </Nav.Item>
        ) : (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/offers" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/offers"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">All Chambres</span>
            </Link>

            <Link
              className={`${
                location.pathname === "/dashboards/app/allStaff" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/allStaff"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">All Staff</span>
            </Link>
            <Link
              className={`${
                location.pathname === "/dashboards/app/allFlight"
                  ? "active"
                  : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/allFlight"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">All Flight</span>
            </Link>
            <Link
              className={`${
                location.pathname === "/dashboards/app/allSeat" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/allSeat"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">All Seat</span>
            </Link>
          </Nav.Item>
        )}

        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/dashboards/app/meets" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboards/app/meets"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Group</Tooltip>}
            >
              <i className="icon material-symbols-outlined">groups</i>
            </OverlayTrigger>
            <span className="item-name">Meets</span>
          </Link>
          
        </Nav.Item>

        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/dashboards/app/staffs" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboards/app/staffs"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Group</Tooltip>}
            >
              <i className="icon material-symbols-outlined">groups</i>
            </OverlayTrigger>
            <span className="item-name">Staffs</span>
          </Link>
          
        </Nav.Item>

        {expert ? (
          <div className="d-grid my-3">
            <Button
              variant="success"
              className="rounded-pill mb-1"
              href="/addTest"
            >
              add Test
            </Button>
            <Button
              variant="success"
              className="rounded-pill mb-1"
              href="/addCourse"
            >
              Add Courses
            </Button>
          </div>
        ) : (
          ""
        )}
      </Accordion>
    </React.Fragment>
  );
});

export default VerticalNav;
