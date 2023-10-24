import React, { useEffect, useState } from "react";
import "./cardOffer.css";
import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../InputText";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { addOfferSchema } from "../../schemas/offer.shema";
import MultipleSelect from "../Select";
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
const CardStaff = ({ id, nom, prenom, telephone, departement }) => {
  const initialValues = {
    nom,
    prenom,
    telephone,
    departement,
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
  // const [applied, setApplied] = useState(
  //   appliers?.some?.(
  //     (e) =>
  //       e.user.toString?.() ===
  //       JSON.parse(localStorage.getItem("myData")).user?._id?.toString?.()
  //   ) || false
  // );
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
    // const response = await deleteOffer(id);
    // offers();
  };

  const navigate = useNavigate();

  const handleAplliers = (id) => {
    navigate(`/dashboard/app/groups/appliers/${id}`);
  };

  const handleApply = async (id) => {
    let response;
    // console.log(user._id);
    // if (!applied) {
    //   response = await applyOffer(id, user._id);
    // } else {
    //   response = await unApplyOffer(id, user._id);
    // }
    // if (response.status !== "404") {
    //   setApplied(!applied);
    // }
    // offers();
  };

  const Departement = [
    { label: "RECEPTION", value: "RECEPTION" },
    { label: "NETTOYAGE", value: "NETTOYAGE" },
    { label: "RESTAURATION", value: "RESTAURATION" },
    { label: "MAINTENANCE", value: "MAINTENANCE" },
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
              {nom + " " + prenom}⭐
            </h5>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {departement}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {telephone}
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
          <Col className="d-flex w-100 justify-content-evenly ">
            <h4>numero Chambre</h4>
          </Col>
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
            // <button
            //   type="button"
            //   className={
            //     maxAppliers === nombre ? "btn disabled" : "btn btn-success"
            //   }
            //   onClick={() => {
            //     handleApply(id);
            //     handleShowApplied();
            //   }}
            // >
            //   {applied ? "UnApply" : "Apply"}
            // </button>

            <></>
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
          <Modal.Title>Staff Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">{nom + " " + prenom}</h2>

          <Col className="d-flex w-100 justify-content-evenly">
            <h4>departement</h4>
            <h4>{departement}</h4>
          </Col>
          <h4 className="my-3">telephone:</h4>
          <h5>{telephone}</h5>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal style={{ marginTop: "10rem" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Chambre : {` ${nom} ${prenom}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this chambre ?</Modal.Body>

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
        style={{ marginTop: "5rem" }}
        show={showEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Chambre : {` ${nom} ${prenom}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Update this Chambre ?</p>

          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { errors, setErrors, setSubmitting }) => {
              console.log(values);
              try {
                // const response = await editOffer(id, values);
                handleCloseEdit();
                // offers();
                // console.log(response);
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
                          name="nom"
                          placeholder="nom"
                          variant="outlined"
                          className="mt-4"
                        />

                        <InputText
                          type="text"
                          name="prenom"
                          placeholder="prenom"
                          variant="outlined"
                          className="mt-4"
                        />
                        <InputText
                          type="text"
                          name="telephone"
                          placeholder="telephone"
                          variant="outlined"
                          className="mt-4"
                        />
                        <MultipleSelect
                          name="departement"
                          label="Departement"
                          options={Departement}
                          required
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

export default CardStaff;
