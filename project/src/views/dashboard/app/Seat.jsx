import React, { useEffect, useState } from "react";
import ProfileHeader from "../../../components/profile-header";
import CardTask from "../../../components/card/CardTask";
import { taskValidator } from "../../../schemas/tasks.schema";

import { Button, Col, Container, Row } from "react-bootstrap";

//profile-header

import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { Modal } from "react-bootstrap";
import InputText from "../../../components/InputText";
import { addTasks, getOwntasks } from "../../../api/tasks";
import CardSeat from "../../../components/card/CardSeat";

const Seats = () => {
  const initialValues = {
    seatNumber: "",
    seatClass: "",
  };

  const [tasks, setTasks] = useState();
  const [showAdd, setShowAdd] = useState(false);

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const getTasks = async () => {
    let offerFiltered;
    try {
      const response = await getOwntasks();
      setTasks(offerFiltered);
    } catch (e) {
      console.log(e);
      return;
    }
  };
  const Departement = [
    { label: "RECEPTION", value: "RECEPTION" },
    { label: "NETTOYAGE", value: "NETTOYAGE" },
    { label: "RESTAURATION", value: "RESTAURATION" },
    { label: "MAINTENANCE", value: "MAINTENANCE" },
  ];
  const handleAll = async () => {
    const response = await getOwntasks();
    setTasks(response.data);
  };

  const handleFilterMode = (mode) => {
    setFilterMode(mode);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    getTasks();
  }, [filterMode, filterCategory]);
  return (
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div
            style={{
              height: "10px",
              marginTop: "5rem",
              marginBottom: "3rem",
            }}
            className="d-flex flex-row align-items-center justify-content-between mb-5"
          >
            <h1 className=" " style={{ fontWeight: "bold" }}>
              Seat:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => handleAll()}>All Seats</Button>

              <Button onClick={() => handleShowAdd()}>Add Seat</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {tasks &&
              tasks.map((offer) => (
                <CardSeat
                  id={offer._id}
                  seatClass={offer.seatClass}
                  seatNumber={offer.seatNumber}
                />
              ))}
            <Modal
              style={{ marginTop: "5rem" }}
              show={showAdd}
              onHide={handleCloseAdd}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Seat</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (
                    values,
                    { errors, setErrors, setSubmitting }
                  ) => {
                    console.log(values.value);
                    try {
                      const response = await addTasks(JSON.stringify(values));
                      console.log(response);
                      handleCloseAdd();
                      getTasks();
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
                              <label className="mt-3">Seat Number </label>
                              <InputText
                                type="text"
                                name="SeatNumber"
                                placeholder="Seat Number"
                                variant="outlined"
                                className="mt-4"
                              />
                              <label className="mt-3">Seat Class </label>
                              <InputText
                                name="seatClass"
                                variant="outlined"
                                placeholder="Seat Class"
                                type="text"
                                className="mt-4"
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
                                Add
                              </Button>
                            </Stack>
                          </Form>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Formik>
              </Modal.Body>
            </Modal>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Seats;
