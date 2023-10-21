import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "../utils/axiosInstance";
import { getAppliers } from "../api/offer";
import { createMeet } from "../api/meet";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import InputText from "./InputText";
import { Stack } from "@mui/material";
import * as yup from "yup";
import { Label } from "@mui/icons-material";
const registerMeetSchema = yup.object().shape({
  startDateTime: yup.mixed().required(),
  expiresTime: yup.mixed().required(),
});
const AppliersTable = ({ data, pageSize, role, confirm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const pageCount = Math.ceil(users.length / pageSize);

  const [searchTerm, setSearchTerm] = useState("");
  const [appliers, setAplliers] = useState();

  const { offerId } = useParams();

  const filteredData =
    appliers &&
    appliers.filter((item) =>
      item.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const RegisterMeeting = () => {
    const meetInitialValues = {
      startDateTime: "",
      expiresTime: "",
    };
    return (
      <Formik
        initialValues={meetInitialValues}
        onSubmit={async (values, { errors, setErrors, setSubmitting }) => {
          console.log(values);
          try {
            const response = await createMeet(offerId, user.user._id, values);
            console.log(response);
            setSubmitting(false);
            setShow(false);
          } catch (err) {
            console.log(err);
          }
        }}
        validationSchema={registerMeetSchema}
      >
        {({ isSubmitting }) => (
          <Form className="d-flex justify-content-center flex-column">
            <label className="mt-1">Start Date</label>
            <InputText
              type="datetime-local"
              name="startDateTime"
              variant="outlined"
              className="mt-2"
            />

            <label className="mt-3">Expires Date</label>
            <InputText
              type="time"
              name="expiresTime"
              variant="outlined"
              className="mt-2"
            />

            <div className="mt-3 d-flex gap-3 justify-content-center">
              <Button
                fullWidth
                variant="contained"
                type="submit"
                className="bg-primary py-2 text-white fw-600"
              >
                schedule
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setShow(false)}
                className="bg-primary py-2 text-white fw-600"
              >
                cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleAplliers = async () => {
    const response = await getAppliers(offerId);
    setAplliers(response);
    console.log(response);
  };

  useEffect(() => {
    handleAplliers();
    //createMeet("642cd6cb38fd8f8ee45a8769", "6418c3209e1e605b99603616");
  }, []);
  const [show, setShow] = useState(false);

  const renderTableData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    console.log(users);
    const handleClose = () => {
      setShow(false);
    };
    const handelAccept = async (userId) => {
      const token = JSON.parse(localStorage.getItem("myData")).token;
      const values = {
        offerId: offerId,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await AxiosInstance.put(
          `/offer/accept/${offerId}/${userId}`,
          values,
          config
        );

        handleAplliers();
        return response;
      } catch (e) {
        console.log(e);
        return;
      }
    };
    const openModel = (item) => {
      setUser(item);
      setShow(true);
    };
    const handelUnAccept = async (id) => {
      const token = JSON.parse(localStorage.getItem("myData")).token;
      const values = {
        offerId: offerId,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await AxiosInstance.put(
          `/offer/unaccept/${offerId}/${id}`,
          values,
          config
        );
        handleAplliers();

        return response;
      } catch (e) {
        console.log(e);
        return;
      }
    };

    return (
      filteredData &&
      filteredData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.user.fullName}</td>
            <td>{item.user.email}</td>
            <td>{item.user.city}</td>
            <td>{item.accepted.toString()}</td>
            <td>
              <button
                onClick={() => {
                  if (item.accepted) {
                    handelUnAccept(item.user._id);
                  } else {
                    handelAccept(item.user._id);
                  }
                }}
                className={`btn ${
                  item.accepted === true ? "btn-danger" : "btn-success"
                }`}
              >
                {item.accepted === true ? "Unaccept" : "Accept"}
              </button>
              {item.accepted && (
                <>
                  {" "}
                  <button
                    className="btn  btn-success m-1"
                    onClick={() => openModel(item)}
                  >
                    schedule meeting
                  </button>
                  <Modal
                    style={{ marginTop: "10rem" }}
                    show={show}
                    onHide={handleClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h4>schedule meet</h4>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <RegisterMeeting />
                    </Modal.Body>
                  </Modal>
                </>
              )}
            </td>
          </tr>
        );
      })
    );
  };
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

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <input
        className="my-5  w-25"
        type="text"
        placeholder="Search by Full Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table className=" w-50">
        <thead>
          <tr>
            <th>FullName</th>
            <th>Email</th>
            <th>City</th>
            <th>Accepted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </Table>
      <div>{renderPagination()}</div>
    </div>
  );
};

export default AppliersTable;
