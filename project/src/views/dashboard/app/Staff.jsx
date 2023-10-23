import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ProfileHeader from "../../../components/profile-header";
import { Modal } from "react-bootstrap";
import { addStaff, getAllstaff } from "../../../api/staff";
import CardTask from "../../../components/card/CardTask";
import InputText from "../../../components/InputText";
import { taskValidator } from "../../../schemas/tasks.schema";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import CardStaff from "../../../components/card/CardStaff";

const StaffsPage = () => {
  const initialValues = {
    nom: "",
    prenom: "",
    telephone: "",
    departement: "RECEPTION",
  };

  const [staffs, setStaffs] = useState([]); // Initialize as an empty array
  const [showAdd, setShowAdd] = useState(false);

  const getStaffList = () => {
    getStaffListData(); // Refresh the staff list.
    setShowAdd(false);
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

  const getStaffListData = async () => {
    try {
      const response = await getAllstaff();
      setStaffs(response);
    } catch (e) {
      console.error(e);
    }
  };
  const handleAll = async () => {
    const response = await getAllstaff();
    setStaffs(response.data);
  };

  useEffect(() => {
    getStaffListData(); // Initial load of staff list.
  }, []);

  // const addNewStaff = async (values) => {
  //   try {
  //     const response = await addStaff(values);
  //     console.log(response);
  //     getStaffListData(); // Refresh the staff list after adding a new staff.
  //     setShowAdd(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const optionsDepartement = [
    { label: "Reception", value: "RECEPTION" },
    { label: "Nettoyage", value: "NETTOYAGE" },
    { label: "Restauration", value: "RESTAURATION" },
    { label: "Maintenance", value: "MAINTENANCE" },
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
              Staff List:
            </h1>
            <div className="d-flex gap-3">
              <Button onClick={() => getStaffList()}>All Staffs</Button>
              <Button onClick={() => handleShowAdd()}>Add Staff</Button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-5">
            {staffs &&
              staffs.map((staff) => (
                <CardStaff
                  key={staff.id}
                  nom={staff.nom}
                  prenom={staff.prenom}
                  telephone={staff.telephone}
                  departement={staff.departement}
                />
              ))}
          </div>
          <Modal
            style={{ marginTop: "5rem" }}
            show={showAdd}
            onHide={handleShowAdd}
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
                  console.log(values.value);
                  try {
                    const response = await addStaff(JSON.stringify(values));
                    console.log(response);
                    handleCloseAdd();
                    getAllstaff();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Stack spacing={2}>
                      <label className="mt-3">First Name</label>
                      <InputText
                        type="text"
                        name="nom"
                        placeholder="First Name"
                      />
                      <label className="mt-3">Last Name</label>
                      <InputText
                        type="text"
                        name="prenom"
                        placeholder="Last Name"
                      />
                      <label className="mt-3">Telephone</label>
                      <InputText
                        type="text"
                        name="telephone"
                        placeholder="Telephone"
                      />
                      <label className="mt-3">Department</label>
                      <select name="departement" className="form-select">
                        {optionsDepartement.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
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
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default StaffsPage;
