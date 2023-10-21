import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosInstance from "../utils/axiosInstance";

const TableUsers = ({ data, pageSize, role, confirm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const pageCount = Math.ceil(users.length / pageSize);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = users.filter((item) =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderTableData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    console.log(users);

    const handelConfirm = async (id) => {
      try {
        const response = await AxiosInstance.put(`/admin/user/confirm/${id}`);
        getUsers();

        return response;
      } catch (e) {
        console.log(e);
        return;
      }
    };

    const handelUnConfirm = async (id) => {
      try {
        const response = await AxiosInstance.put(`/admin/user/unconfirm/${id}`);
        getUsers();

        return response;
      } catch (e) {
        console.log(e);
        return;
      }
    };

    const handleDetails = () => {};

    return filteredData.slice(start, end).map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.fullName}</td>
          <td>{item.email}</td>
          <td>{item.city}</td>
          <td>{item.gender}</td>
          <td>{item.isActive.toString()}</td>
          <td>{item.isConfirmed.toString()}</td>
          <td>{item.isBlocked.toString()}</td>
          <td>
            <div className="card-header-toolbar d-flex align-items-center">
              <Dropdown>
                <Link to="#">
                  <Dropdown.Toggle
                    as="span"
                    className="material-symbols-outlined"
                  >
                    more_horiz
                  </Dropdown.Toggle>
                </Link>
                <Dropdown.Menu className="dropdown-menu-right">
                  {item.role == "user" && (
                    <a
                      href={`http://localhost:9000/data/${item.cin[0]}`}
                      target="_blank"
                      className="mx-3"
                    >
                      <i className="ri-eye-fill me-2"></i>Details
                    </a>
                  )}
                  {item.role == "expert" && (
                    <a
                      href={`http://localhost:9000/data/${item.expertise[0]}`}
                      target="_blank"
                      className="mx-3"
                    >
                      <i className="ri-eye-fill me-2"></i>Details
                    </a>
                  )}
                  {item.role == "company" && (
                    <a
                      href={`http://localhost:9000/data/${item.registerCommerce}`}
                      target="_blank"
                      className="mx-3"
                    >
                      <i className="ri-eye-fill me-2"></i>Details
                    </a>
                  )}

                  {/* <Dropdown.Item to="#">
                      <i className="ri-pencil-fill me-2"></i>Active
                    </Dropdown.Item> */}
                  <Dropdown.Item
                    onClick={() => {
                      if (item.isConfirmed) {
                        handelUnConfirm(item._id);
                      } else {
                        handelConfirm(item._id);
                      }
                    }}
                  >
                    <i className="ri-pencil-fill me-2"></i>
                    {item.isConfirmed ? "Unconfirm" : "Confirm"}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      if (item.isBlocked) {
                        handelUnBlock(item._id);
                      } else {
                        handleShow();
                        setId(item._id);
                      }
                    }}
                  >
                    <i className="ri-delete-bin-6-fill me-2"></i>
                    {item.isBlocked ? "UnBlock" : "Block"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </td>
        </tr>
      );
    });
  };

  const [id, setId] = useState("");

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <button key={i} onClick={() => handleClick(i)}>
          {i}
        </button>
      );
    }

    return pages;
  };

  const handleActive = () => {
    // try {
    //       const response = await AxiosInstance.get("/admin");
    //       console.log(response);
    //       setUsers(response);
    //       return response;
    //   } catch (e) {
    //     console.log(e);
    //     return;
    //   }
  };

  const getUsers = async () => {
    try {
      fetch("http://localhost:9000/admin")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .then((data) => console.log(data));

      //   const response = await AxiosInstance.get("/admin");
      //   console.log(response);
      //   setUsers(response);
      //   return response;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const filterRole = async () => {
    try {
      fetch("http://localhost:9000/admin")
        .then((response) => response.json())
        .then((data) => setUsers(data.filter((user) => user.role == role)))
        .then((data) => console.log(data));
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const filterConfirm = async () => {
    try {
      console.log(confirm);
      fetch("http://localhost:9000/admin")
        .then((response) => response.json())
        .then((data) =>
          setUsers(data.filter((user) => user.isConfirmed == confirm))
        )
        .then((data) => console.log(data));
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    role == "" ? getUsers() : filterRole();

    //state == "" ? getUsers() : filterState();
  }, [role]);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handelBlock = async () => {
    try {
      const response = await AxiosInstance.put(`/admin/user/block/${id}`, {
        blockedReason: value,
      });
      console.log(response);
      getUsers();

      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handelUnBlock = async (id) => {
    try {
      const response = await AxiosInstance.put(`/admin/user/unblock/${id}`);
      console.log(response);
      getUsers();

      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <>
      <input
        className="my-5"
        type="text"
        placeholder="Search by Full Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>FullName</th>
            <th>Email</th>
            <th>City</th>
            <th>Gender</th>
            <th>Is Active</th>
            <th>Is Confirmed</th>
            <th>Is Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </Table>
      <div>{renderPagination()}</div>

      <Modal style={{ marginTop: "10rem" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Block User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Why you want to block this user ?</Modal.Body>
        <div className="d-flex justify-content-center">
          <input
            autoFocus
            className="w-75 text-center"
            type="text"
            name="blockedReason"
            placeholder="reason"
            onChange={handleChange}
          />
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handelBlock}>
            Block
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableUsers;
