import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

//profile-header
import ProfileHeader from "../../../components/profile-header";

import CardOffer from "../../../components/card/CardOffer";
import axiosInstance from "../../../utils/axiosInstance";
import { addOffer, editOffer, getOwnOffers } from "../../../api/offer";
import MultipleSelect from "../../../components/Select";

import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { Modal } from "react-bootstrap";
import InputText from "../../../components/InputText";
import { addOfferSchema } from "../../../schemas/offer.shema";
import TextareaInput from "../../../components/TextareaInput";

const ProfileEvents = () => {
  const initialValues = {
    numeroChambre: 0,
    type: "",
    capacite: 0,
    prixParNuit: 0,
    disponibilite: "",
    name: "",
    description: "",
    requirements: [],
    nombre: 0,
    category: "",
    ConditionScore: 0,
    mode: "",
  };

  const [offers, setOffers] = useState();
  const [showAdd, setShowAdd] = useState(false);

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const getOffers = async () => {
    let offerFiltered;
    try {
      const response = await getOwnOffers();
      if (filterMode === "" || filterMode === "all") {
        setOffers(response.data);
      } else {
        offerFiltered = response.data.filter((offer) => {
          return offer.mode === filterMode;
        });
      }
      if (filterCategory === "" || filterCategory === "all") {
        setOffers(response.data);
      } else {
        offerFiltered = response.data.filter((offer) => {
          return offer.category === filterCategory;
        });
      }
      setOffers(offerFiltered);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handleAll = async () => {
    const response = await getOwnOffers();
    setOffers(response.data);
  };

  const handleFilterMode = (mode) => {
    setFilterMode(mode);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    getOffers();
  }, [filterMode, filterCategory]);

  const options = [
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
  ];

  const optionsMode = [
    { label: "TRUE ", value: "TRUE" },
    { label: "FALSE", value: "FALSE" },
  ];

  const optionsCategory = [
    { label: "SIMPLE", value: "SIMPLE" },
    { label: "DOUBLE", value: "DOUBLE" },
    { label: "SUITE", value: "SUITE" },
  ];

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
              Chambres:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => handleAll()}>All Chambres</Button>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown">
                  {filterCategory === "" || filterCategory === "all"
                    ? "Type Chambre"
                    : filterCategory}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      handleFilterMode("");
                      handleFilterCategory("SIMPLE");
                    }}
                  >
                    SIMPLE
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleFilterMode("");
                      handleFilterCategory("DOUBLE");
                    }}
                  >
                    DOUBLE
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleFilterMode("");
                      handleFilterCategory("SUITE");
                    }}
                  >
                    SUITE
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {filterMode === "" || filterMode === "all"
                    ? "Disponibilite"
                    : filterMode}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      handleFilterCategory("");
                      handleFilterMode("TRUE");
                    }}
                  >
                    TRUE
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleFilterCategory("");
                      handleFilterMode("FALSE");
                    }}
                  >
                    FALSE
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button onClick={() => handleShowAdd()}>Add Chambre</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {offers &&
              offers.map((offer) => (
                <CardOffer
                  id={offer._id}
                  name={offer.name}
                  description={offer.description}
                  category={offer.category}
                  requirements={offer.requirements}
                  nombre={offer.nombre}
                  publishedDate={offer.publishedDate}
                  owner={offer.owner}
                  mode={offer.mode}
                  ConditionScore={offer.ConditionScore}
                  offers={() => getOffers()}
                />
              ))}

            <Modal
              style={{ marginTop: "5rem" }}
              show={showAdd}
              onHide={handleCloseAdd}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Chambre</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (
                    values,
                    { errors, setErrors, setSubmitting }
                  ) => {
                    console.log(values);
                    try {
                      const response = await addOffer(values);
                      console.log(response);
                      handleCloseAdd();
                      getOffers();
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

                              <label className="mt-3">numero Chambre</label>
                              <InputText
                                type="text"
                                name="numeroChambre"
                                placeholder="numero Chambre"
                                variant="outlined"
                                className="mt-4"
                              />
                              <Row className="d-flex w-100  mx-auto">
                                <Col className="mx-auto">
                                  <MultipleSelect
                                    name="type"
                                    label="Type Chambre"
                                    options={optionsCategory}
                                    required
                                  />
                                </Col>
                                <Col xs={6} className="mx-auto">
                                  <MultipleSelect
                                    name="disponibilite"
                                    label="Disponibilite"
                                    options={optionsMode}
                                    required
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Row className="d-flex w-100 justify-content-evenly">
                                  <Col xs={6} className="mx-auto">
                                    <MultipleSelect
                                      name="capacite"
                                      label="capacite"
                                      options={optionsNombre}
                                      required
                                    />
                                  </Col>
                                  <Col xs={6} className="mx-auto">
                                    <InputText
                                      name="prixParNuit"
                                      label="prixParNuit"
                                      variant="outlined"
                                      type="number"
                                      className="mt-4"
                                      required
                                    />
                                  </Col>
                                </Row>
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

export default ProfileEvents;
