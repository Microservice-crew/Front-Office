import React, { useEffect, useState } from "react";
import "./cardOffer.css";
import { Button, Col, Dropdown, Modal, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../InputText";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { addOfferSchema } from "../../schemas/offer.shema";
import {
  applyOffer,
  deleteOffer,
  editOffer,
  getOwnOffers,
  unApplyOffer,
} from "../../api/offer";
import MultipleSelect from "../Select";
import TextareaInput from "../TextareaInput";

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{props.message}</h2>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}

const CardOffer = ({
  id,
  name,
  description,
  mode,
  requirements,
  nombre,
  category,
  publishedDate,
  owner,
  offers,
  appliers,
  maxAppliers,
  ConditionScore,
}) => {
  const date = new Date(publishedDate);
  const options = { day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const initialValues = {
    name,
    ConditionScore,
    description,
    requirements,
    nombre,
    category,
    mode,
  };

  const [margin, setMargin] = useState(false);
  const [user, setUser] = useState();

  const [showPopup, setShowPopup] = useState(false);

  function handlePopUp() {
    setShowPopup(true);
  }

  function handleClosePopUp() {
    setShowPopup(false);
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("myData")).user);

    if (
      !document
        .getElementsByTagName("ASIDE")[0]
        .classList.contains("sidebar-mini")
    ) {
      setMargin(true);
    } else {
      setMargin(false);
    }
  }, []);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showApplied, setShowApplied] = useState(false);
  const [applied, setApplied] = useState(
    appliers?.some?.(
      (e) =>
        e.user.toString?.() ===
        JSON.parse(localStorage.getItem("myData")).user?._id?.toString?.()
    ) || false
  );
  const [value, setValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseApplied = () => setShowApplied(false);
  const handleShowApplied = () => setShowApplied(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = async (id) => {
    const response = await deleteOffer(id);
    offers();
  };

  const navigate = useNavigate();

  const handleAplliers = (id) => {
    navigate(`/dashboard/app/groups/appliers/${id}`);
  };

  const handleApply = async (id) => {
    let response;
    console.log(user._id);
    if (!applied) {
      response = await applyOffer(id, user._id);
    } else {
      response = await unApplyOffer(id, user._id);
    }
    if (response.status !== "404") {
      setApplied(!applied);
    }
    offers();
  };

  const options1 = [
    { label: "react js ", value: "react  js" },
    { label: "node js ", value: "node  js" },
    { label: "angular js ", value: "angular  js" },
    { label: "vue js ", value: "vue  js" },
    { label: "java ", value: "java" },
    { label: "python ", value: "python" },
    { label: "c++ ", value: "c++" },
    { label: "c# ", value: "c#" },
    { label: "c ", value: "c" },
    { label: "php ", value: "php" },
    { label: "ruby ", value: "ruby" },
    { label: "swift ", value: "swift" },
    { label: "kotlin ", value: "kotlin" },
    { label: "dart ", value: "dart" },
    { label: "go ", value: "go" },
    { label: "scala ", value: "scala" },
    { label: "rust ", value: "rust" },
    { label: "spring ", value: "spring" },
    { label: "django ", value: "django" },
    { label: "laravel ", value: "laravel" },
    { label: "flask ", value: "flask" },
    { label: "express ", value: "express" },
    { label: "spring boot ", value: "spring boot" },
    { label: "Photoshop ", value: "Photoshop" },
    { label: "Canva ", value: "Canva" },
  ];

    const optionsNombre = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
      { label: "11", value: 11 },
      { label: "12", value: 12 },
      { label: "13", value: 13 },
      { label: "14", value: 14 },
      { label: "15", value: 15 },
      { label: "16", value: 16 },
      { label: "17", value: 17 },
      { label: "18", value: 18 },
      { label: "19", value: 19 },
      { label: "20", value: 20 },
      { label: "21", value: 21 },
      { label: "22", value: 22 },
      { label: "23", value: 23 },
      { label: "24", value: 24 },
      { label: "25", value: 25 },
      { label: "26", value: 26 },
      { label: "27", value: 27 },
      { label: "28", value: 28 },
      { label: "29", value: 29 },
      { label: "30", value: 30 },
    ];

  const optionsMode = [
    { label: "Local ", value: "local" },
    { label: "Remote ", value: "remote" },
  ];

  const optionsCategory = [
    { label: "FullTime ", value: "fullTime" },
    { label: "PartTime ", value: "partTime" },
    { label: "Internship ", value: "internship" },
  ];

  return (
    <div
      className="card"
      style={{
        width: "31%",
        height: "20%",
        marginLeft: `${margin ? "0rem" : "0rem"}`,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="card-body flex flxe-col">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-around align-items-center gap-5">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>
              {owner.fullName} {owner?.averageRating} ⭐
            </h5>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {formattedDate}
          </h6>
          {user && user.role !== "user" && user.role !== "expert" && (
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
                <Dropdown.Item
                  onClick={() => {
                    handleShowEdit();
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        <div className="text-truncate-container">
          <Col className="d-flex w-100 ">
            <h3
              className="card-title text-center mx-auto"
              style={{ fontWeight: "bold" }}
            >
              {name}
            </h3>
          </Col>
          <Col className="d-flex w-100 justify-content-evenly">
            <h4>Condition Score</h4>
            <h4>{ConditionScore}</h4>
          </Col>
          <h4>Description :</h4>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            readonly
          >
            {description}
          </textarea>
        </div>
        <Col className="d-flex w-100 justify-content-evenly">
          <h4 className="mt-2">Category:</h4>
          <span
            style={{ fontSize: "14px" }}
            className={`badge badge-pill  p-2 mt-1  mx-3 ${
              category === "internship"
                ? "internship"
                : category === "partTime"
                ? "partTime"
                : "fullTime"
            }`}
          >
            {category}
          </span>
        </Col>

        <Col className="d-flex w-100 justify-content-evenly">
          <h4 className="mt-1">Mode:</h4>
          <span
            style={{ fontSize: "14px" }}
            className={`badge badge-pill   p-2 mt-1 mx-3 ${
              mode === "local" ? "partTime" : "fullTime"
            }`}
          >
            {mode}
          </span>
        </Col>
        <div className="card-footer d-flex justify-content-center gap-5">
          {user && user.role === "company" ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleAplliers(id);
              }}
            >
              appliers
            </button>
          ) : (
            <button
              type="button"
              className={
                maxAppliers === nombre ? "btn disabled" : "btn btn-success"
              }
              onClick={() => {
                handleApply(id);
                handleShowApplied();
              }}
            >
              {applied ? "UnApply" : "Apply"}
            </button>
          )}
          {showPopup && (
            <Popup message="Congratulations!" onClose={handleClosePopUp} />
          )}
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              handleShowDetails();
            }}
          >
            Job Details
          </button>
        </div>
      </div>

      <Modal
        style={{ marginTop: "10rem" }}
        show={showDetails}
        onHide={handleCloseDetails}
      >
        <Modal.Header closeButton>
          <Modal.Title>Offer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">{name}</h2>
          <h4 className="my-3">Description:</h4>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            readonly
          >
            {description}
          </textarea>

          <h4 className="my-3">Requirements:</h4>

          {requirements.map((req) => (
            <span
              style={{ fontSize: "14px" }}
              className={`badge badge-pill   p-2 mt-1 mx-3 partTime`}
            >
              {req}
            </span>
          ))}
          <h4 className="my-3">Nombre:</h4>
          <h5>{nombre}</h5>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal style={{ marginTop: "10rem" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Offer : {` ${name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this offer ?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ marginTop: "10rem" }}
        show={showApplied}
        onHide={handleCloseApplied}
      >
        <Modal.Header closeButton>
          <Modal.Title>Congratulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>You have applied to</h5> <h3> {name}</h3>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApplied}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ marginTop: "5rem" }}
        show={showEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Offer : {` ${name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Update this offer ?</p>

          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { errors, setErrors, setSubmitting }) => {
              console.log(values);
              try {
                const response = await editOffer(id, values);
                handleCloseEdit();
                offers();
                console.log(response);
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={addOfferSchema}
          >
            {({ isSubmitting }) => (
              <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid item xs={12} sm={8} md={12}>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mb: 2 }} />
                    <Form>
                      <Stack sx={{ mt: 1 }} spacing={2}>
                        <Box sx={{ mb: 1 }} />

                        <InputText
                          type="text"
                          name="name"
                          placeholder="Name"
                          variant="outlined"
                          className="mt-4"
                        />
                        <TextareaInput
                          className="form-control w-100 mt-4"
                          rows="3"
                          style={{
                            overflow: "scroll",
                            overflowX: "hidden",
                            overflowY: "scroll",
                          }}
                          label="Description  "
                          type="text"
                          name="description"
                          variant="outlined"
                        />
                        <MultipleSelect
                          name="requirements"
                          label="Requirements"
                          options={options1}
                          multiple
                          className="mx-auto w-100"
                        />
                        <Row className="justify-content-evenly w-100">
                          <Col className="d-flex mx-auto justify-content-between w-100">
                            <MultipleSelect
                              name="category"
                              label="Category"
                              options={optionsCategory}
                            />
                            <MultipleSelect
                              name="mode"
                              label="Mode"
                              options={optionsMode}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <MultipleSelect
                              name="nombre"
                              label="Nombre Condidat"
                              options={optionsNombre}
                            />
                          </Col>
                          <Col>
                            <InputText
                              type="number"
                              name="ConditionScore"
                              placeholder="score min"
                              variant="outlined"
                              className="mt-4"
                            />
                          </Col>
                        </Row>

                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 1,
                            mb: 2,
                          }}
                          type="submit"
                          className="bg-primary py-2 text-white fw-600"
                        >
                          Edit
                        </Button>
                      </Stack>
                    </Form>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="success" onClick={handleDelete}>
            Edit
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default CardOffer;
