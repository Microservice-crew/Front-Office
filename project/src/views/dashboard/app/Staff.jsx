import React, { useEffect, useState } from "react";
import ProfileHeader from "../../../components/profile-header";
import { Button, Container, Modal } from "react-bootstrap";
import CardTask from "../../../components/card/CardTask";
import { Form, Formik } from "formik";
import { addTasks, getOwntasks } from "../../../api/tasks";
import { taskValidator } from "../../../schemas/tasks.schema";
import { Grid } from "@material-ui/core";
import { Box, Stack } from "@mui/material";
import InputText from "../../../components/InputText";
import TextareaInput from "../../../components/TextareaInput";
import MultipleSelect from "../../../components/Select";
import CardStaff from "../../../components/card/CardStaff";

const Staff = () => {
  const initialValues = {
    nom: "",
    prenom: "",
    telephone: "",
    departement: "",
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
              Staff:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => handleAll()}>All Staffs</Button>

              <Button onClick={() => handleShowAdd()}>Add Staff</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {tasks &&
              tasks.map((offer) => (
                <CardStaff
                  id={offer._id}
                  nom={offer.nom}
                  prenom={offer.prenom}
                  telephone={offer.telephone}
                  departement={offer.departement}
                />
              ))}

            <Modal
              style={{ marginTop: "5rem" }}
              show={showAdd}
              onHide={handleCloseAdd}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Staff</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (
                    values,
                    { errors, setErrors, setSubmitting }
                  ) => {
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
                    <Grid container component="main">
                      <Grid item xs={12} sm={8} md={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ mb: 2 }} />
                          <Form>
                            <Stack sx={{ mt: 1 }} spacing={2}>
                              <Box sx={{ mb: 1 }} />

                              <label className="mt-3">Nom </label>
                              <InputText
                                type="text"
                                name="nom"
                                placeholder="Nom Hotel"
                                variant="outlined"
                                className="mt-4"
                              />
                              <label className="mt-3">Prenom </label>
                              <InputText
                                type="text"
                                name="nom"
                                placeholder="Nom Hotel"
                                variant="outlined"
                                className="mt-4"
                              />

                              <label className="mt-3">
                                Numéro telephonique
                              </label>
                              <InputText
                                name="prixParNuit"
                                variant="outlined"
                                type="text"
                                className="mt-4"
                                required
                              />
                              <MultipleSelect
                                name="Departement"
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

export default Staff;
