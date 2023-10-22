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
import { addFlight,getAllFlights } from "../../../api/flight";
import CardFlight from "../../../components/card/CardFlight";

const Flights = () => {
  const initialValues = {
    flightNumber: "",
    departureCity: "",
    arrivalDateTime: "",
    departureDateTime: "",
    arrivalCity: "",
    airline: "",
    availableSeats: 0,
    ticketPrice: 0,
  };

  const [flights, setFlights] = useState();
  const [showAdd, setShowAdd] = useState(false);

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const getFlights = async () => {
    let offerFiltered;
    try {
      const response = await getAllFlights();
      setFlights(response);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handleAll = async () => {
    const response = await getAllFlights();
    setFlights(response.data);
  };


  useEffect(() => {
    getFlights();
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
              Flight:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => handleAll()}>All Flights</Button>

              <Button onClick={() => handleShowAdd()}>Add Flight</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {flights &&
              flights.map((offer) => (
                <CardFlight
                  id={offer._id}
                  flightNumber={offer.flightNumber}
                  departureCity={offer.departureCity}
                  arrivalDateTime={offer.arrivalDateTime}
                  departureDateTime={offer.departureDateTime}
                  arrivalCity={offer.arrivalCity}
                  airline={offer.airline}
                  availableSeat={offer.availableSeat}
                  ticketPrice={offer.ticketPrice}
                />
              ))}
            <Modal
              style={{ marginTop: "5rem" }}
              show={showAdd}
              onHide={handleCloseAdd}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Flight</Modal.Title>
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
                      const response = await addFlight(JSON.stringify(values));
                      console.log(response);
                      handleCloseAdd();
                      getFlights();
                    } catch (err) {
                      console.log(err);
                    }
                  }}
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
                              <Row className="w-100  mx-auto">
                                <Col className="mx-auto">
                                  <InputText
                                    type="text"
                                    name="flightNumber"
                                    placeholder="flight Number"
                                    variant="outlined"
                                    className="mt-4"
                                  />

                                  <InputText
                                    name="departureCity"
                                    variant="outlined"
                                    placeholder="Departure City"
                                    type="text"
                                    className="mt-4"
                                    required
                                  />

                                  <InputText
                                    name="arrivalCity"
                                    variant="outlined"
                                    placeholder="Arrival City"
                                    type="text"
                                    className="mt-4"
                                    required
                                  />
                                </Col>

                                <Col className="mx-auto">
                                  <InputText
                                    name="airline"
                                    placeholder="Airline"
                                    variant="outlined"
                                    type="text"
                                    className="mt-4"
                                    required
                                  />

                                  <InputText
                                    name="availableSeats"
                                    placeholder="Available Seats"
                                    variant="outlined"
                                    type="number"
                                    className="mt-4"
                                    required
                                  />

                                  <InputText
                                    name="ticketPrice"
                                    placeholder="ticket Price"
                                    variant="outlined"
                                    type="number"
                                    className="mt-4"
                                    required
                                  />
                                </Col>
                              </Row>
                              <label className="mt-3">Departure </label>
                              <InputText
                                name="departureDateTime"
                                variant="outlined"
                                type="date"
                                className="mt-4"
                                required
                              />
                              <label className="mt-3">Arrival </label>
                              <InputText
                                name="arrivalDateTime"
                                variant="outlined"
                                type="date"
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

export default Flights;
