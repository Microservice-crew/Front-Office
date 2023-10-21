import React, { useEffect, useState } from "react";
import "./cardOffer.css";
import { Button, Dropdown, Modal, Table, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../InputText";
import { Box, Grid } from "@material-ui/core";
import { Formik } from "formik";
import { Stack } from "@mui/material";
import { taskValidator } from "../../schemas/tasks.schema";
import {
  applytask,
  deletetask,
  edittask,
  unApplytask,
  updateUri,
} from "../../api/tasks";
import MultipleSelect from "../Select";
import GitHubIcon from "@mui/icons-material/GitHub";
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

const CardTask = ({
  id,
  name,
  description,
  websiteUrl,
  requirements,
  nombre,
  ExpireDate,
  publishedDate,
  owner,
  tasks,
  appliers,
  maxAppliers,
}) => {
  const date = new Date(publishedDate);
  const options = { day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const initialValues = {
    name,
    description,
    requirements,
    nombre,
    websiteUrl,
    ExpireDate,
  };
  const initialUri = {
    url: "",
    user: JSON.parse(localStorage.getItem("myData")).user._id,
    id: id,
  };

  const [margin, setMargin] = useState(false);
  const [user, setUser] = useState();
  const [uri, setUri] = useState(initialUri);

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
  const [validation, setValidation] = useState(false);
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

  const handleCloseVal = () => setValidation(false);
  const handleShowVal = () => setValidation(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChanges = (e) => {
    setUri({ ...initialUri, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    const response = await deletetask(id);
    tasks();
  };

  const navigate = useNavigate();

  const handleAplliers = (id) => {
    navigate(`/dashboard/app/tasks/appliers/${id}`);
  };

  const handleApply = async (id) => {
    let response;
    if (!applied) {
      response = await applytask(id, user._id);
    } else {
      response = await unApplytask(id, user._id);
    }
    if (response.status !== "404") {
      setApplied(!applied);
    }
    tasks();
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
    { label: "1 - 5", value: "1 - 5" },
    { label: "1 - 10", value: "1 - 10" },
    { label: "1 - 15", value: "1 - 15" },
    { label: "1 - 20", value: "1 - 20" },
    { label: "1 - 25", value: "1 - 25" },
    { label: "1 - 30", value: "1 - 30" },
    { label: "1 - 35", value: "1 - 35" },
    { label: "1 - 40", value: "1 - 40" },
    { label: "1 - 45", value: "1 - 45" },
    { label: "1 - 50", value: "1 - 50" },
    { label: "1 - 55 ", value: "1 - 55" },
    { label: "1 - 60 ", value: "1 - 60" },
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

  const updateUris = async (values, { setSubmitting }) => {
    try {
      const response = await updateUri(values);
      handleCloseVal();
      return response;
    } catch (err) {
      console.log(err.message);
    }
    setSubmitting(false);
  };
  return (
    <div
      className="card "
      style={{
        width: "31%",
        height: "20%",
        marginLeft: `${margin ? "0rem" : "0rem"}`,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="card-body flex flxe-col">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-around align-items-center gap-3">
            {/* <img height="70px" width="80px" src="http://www.ensit.tn/wp-content/uploads/2021/02/1549615448898.png" alt="img" /> */}

            <h5 className="card-title" style={{ fontWeight: "bold" }}>
              {owner.fullName} {owner?.averageRating} ⭐
            </h5>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {formattedDate}
          </h6>
          {user && user.role !== "user" && user.role !== "expert" ? (
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
          ) : (
            applied && (
              <GitHubIcon
                variant="contained"
                color="success"
                onClick={() => handleShowVal()}
              />
            )
          )}
        </div>

        <div className="text-truncate-container">
          <h4>Title:</h4>
          <h3 className="card-title" style={{ fontWeight: "bold" }}>
            {name}
          </h3>
          <h4>Description:</h4>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            value={description}
            readOnly
          ></textarea>

          <h4>Expire Date:</h4>

          <h5 className="card-title" style={{ fontWeight: "bold" }}>
            {ExpireDate}
          </h5>
        </div>

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
          <Modal.Title>Task Details</Modal.Title>
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
            readOnly
          >
            {description}
          </textarea>
          <h4 className="my-3">Requirements:</h4>

          {requirements.map((req, index) => (
            <span
              key={index}
              style={{ fontSize: "14px" }}
              className={`badge badge-pill   p-2 mt-1 mx-3 partTime`}
            >
              {req}
            </span>
          ))}
          <h4 className="my-3">Nombre:</h4>
          <h5>{nombre}</h5>
          <h4 className="my-3">Expire Date:</h4>
          <h5>{ExpireDate}</h5>
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
        <Modal.Body>Are you sure you want to delete this task ?</Modal.Body>

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
        show={validation}
        onHide={handleCloseVal}
      >
        <Formik
          initialValues={initialUri} // Initialize with an empty uri field
          onSubmit={updateUris} // Use the correct onSubmit function and pass values as the first argument
        >
          {({
            isSubmitting,
            handleChange: handleChanges,
            handleSubmit: updateUri,
          }) => (
            <Form onSubmit={updateUri}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Your Task now</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>
                  Send your work from GitHub repository URL
                </Modal.Title>
                <input
                  type="text"
                  name="url"
                  placeholder="www.github.com/repository"
                  variant="outlined"
                  className="mt-4"
                  onChange={handleChanges}
                />
              </Modal.Body>

              <Modal.Footer>
                <Button
                  type="submit"
                  className="btn btn-success"
                  onSubmit={updateUri}
                >
                  {isSubmitting ? "isSubmitting...." : "Send"}
                </Button>
                <Button variant="secondary" onClick={handleCloseVal}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
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
                const response = await edittask(id, values);
                handleCloseEdit();
                tasks();
                console.log(response);
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={taskValidator}
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
                        <InputText
                          type="text"
                          name="description"
                          placeholder="Description"
                          className="w-100 mt-4"
                          variant="outlined"
                        />

                        <MultipleSelect
                          name="requirements"
                          label="Requirements"
                          options={options1}
                          required
                          multiple
                        />
                        <InputText
                          type="text"
                          name="nombre"
                          placeholder="Nombre de Condidat"
                          variant="outlined"
                          className="mt-4"
                        />

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

export default CardTask;
