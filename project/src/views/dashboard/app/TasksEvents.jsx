import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container } from "react-bootstrap";

//profile-header
import ProfileHeader from "../../../components/profile-header";

import MultipleSelect from "../../../components/Select";

import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { Modal } from "react-bootstrap";
import InputText from "../../../components/InputText";
import { addTasks, getOwntasks } from "../../../api/tasks";
import CardTask from "../../../components/card/CardTask";
import { taskValidator } from "../../../schemas/tasks.schema";
import TextareaInput from "../../../components/TextareaInput";
import { addHotel ,getAllHotels} from "../../../api/hotel";

const ProfileEvents = () => {
  const initialValues = {
    nom: "",
    adresse: "",
    description: "",
    etoiles: 0,
    prixParNuit: 0,
  };

  const [hotels, setHotels] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

const getAllHotel = async () => {
    let offerFiltered;
    try {
      const response = await getAllHotels();
      setHotels(response);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handleAll = async () => {
    const response = await getAllHotels();
    setHotels(response.data);
  };



  useEffect(() => {
    getAllHotel();
  }, [filterMode, filterCategory]);

 



  const optionsEtoiles = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
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
              Hotels:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => handleAll()}>All Hotels</Button>

              <Button onClick={() => handleShowAdd()}>Add Hotel</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {hotels &&
              hotels.map((offer) => (
                <CardTask
                  id={offer._id}
                  nom={offer.nom}
                  description={offer.description}
                  adresse={offer.adresse}
                  etoile={offer.etoile}
                  prixParNuit={offer.prixParNuit}
                />
              ))}

            <Modal
              style={{ marginTop: "5rem" }}
              show={showAdd}
              onHide={handleCloseAdd}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Hotel</Modal.Title>
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
                      const response = await addHotel(JSON.stringify(values));
                      console.log(response);
                      handleCloseAdd();
                      getAllHotel();
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

                              <label className="mt-3">Nom Hotel</label>
                              <InputText
                                type="text"
                                name="nom"
                                placeholder="Nom Hotel"
                                variant="outlined"
                                className="mt-4"
                              />
                              <label className="mt-3">Adresse Hotel</label>
                              <InputText
                                type="text"
                                name="adresse"
                                placeholder="Nom Hotel"
                                variant="outlined"
                                className="mt-4"
                              />
                              <label className="mt-3">Description</label>
                              <TextareaInput
                                class="form-control w-100 mt-4"
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

                              <label className="mt-3">Etoiles</label>
                              <MultipleSelect
                                name="etoiles"
                                type="number"
                                label="Nombre etoiles"
                                options={optionsEtoiles}
                                required
                              />

                              <label className="mt-3">prixParNuit</label>
                              <InputText
                                name="prixParNuit"
                                variant="outlined"
                                type="number"
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

export default ProfileEvents;
