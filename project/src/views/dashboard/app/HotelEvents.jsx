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

const ProfileEvents = () => {
  const initialValues = {
    name: "",
    description: "",
    requirements: [],
    nombre: 0,
    ExpireDate: "",
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
              Task Offers:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => handleAll()}>All Tasks</Button>

              <Button onClick={() => handleShowAdd()}>Add Task</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {tasks &&
              tasks.map((offer) => (
                <CardTask
                  id={offer._id}
                  name={offer.name}
                  description={offer.description}
                  ExpireDate={offer.ExpireDate}
                  requirements={offer.requirements}
                  nombre={offer.nombre}
                  publishedDate={offer.publishedDate}
                  owner={offer.owner}
                  offers={() => getTasks()}
                />
              ))}

            <Modal
              style={{ marginTop: "5rem" }}
              show={showAdd}
              onHide={handleCloseAdd}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
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
                              <label className="mt-3">Title</label>
                              <InputText
                                type="text"
                                name="name"
                                placeholder="Title"
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

                              <MultipleSelect
                                name="requirements"
                                label="Requirements"
                                options={options}
                                required
                                multiple
                              />
                              <label className="mt-3">Nombre Condidat</label>
                              <MultipleSelect
                                name="nombre"
                                label="Nombre Condidat"
                                options={optionsNombre}
                                required
                              />
                              <label className="mt-3">Expires Date</label>
                              <InputText
                                type="date"
                                name="ExpireDate"
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
