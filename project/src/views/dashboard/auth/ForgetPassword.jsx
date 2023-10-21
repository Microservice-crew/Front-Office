import React, { useState } from "react";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Formik, Form, Field } from "formik";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from "../../../assets/images/logo-full.png";
import login1 from "../../../assets/images/login/1.png";
import login2 from "../../../assets/images/login/2.png";
import login3 from "../../../assets/images/login/3.png";
import InputText from "../../../components/InputText";
import PasswordInput from "../../../components/passwordInput";
import { Stack } from "@mui/material";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import {
  loginSchema,
  registerCompanySchema,
  registerUserSchema,
  sendResetPasswordEmailSchema,
} from "../../../schemas/user.schema";
import { login, registerCompany, registerUser } from "../../../api/auth";
import google_logo from "../../../assets/images/icon-1.png";
import { sendResetPasswordEmail } from "../../../api/resetPassword";
const initialValues = {
  password: "",
  email: "",
};
// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const ForgetPassword = () => {
  const navigate = useNavigate();

  function handleSave(data) {
    localStorage.setItem("myData", JSON.stringify(data));
  }

  const [done, setDone] = useState(false);
  var response = {};
  return (
    <>
      <section className="sign-in-page ">
        <div id="container-inside" className="d-flex align-content-center">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters h-auto  align-content-center">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image
                        src={login1}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login2}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">
                        Connect with the world
                      </h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login3}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5  ">
              <div className="sign-in-from ">
                <h1 className="mb-0 mt-5 text-center">Forget Password</h1>
                <p className="text-center">Enter Your Email Please </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={sendResetPasswordEmailSchema}
                  onSubmit={async (values, { errors, setErrors }) => {
                    try {
                      console.log(values);
                      const response = await sendResetPasswordEmail(values);
                      handleSave(response.data);
                      console.log(response.status);
                      if (response.status !== 200) {
                        setErrors({
                          email: "wrong password or email",
                          password: "wrong password or email",
                        });
                        return;
                      } else {
                        setDone(true);
                        // navigate("/rest2");
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Grid container component="main" sx={{ height: "100vh" }}>
                      {/* <CssBaseline /> */}

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
                            <Stack sx={{ mb: 3, width: "100%" }} spacing={2}>
                              <InputText
                                type="text"
                                name="email"
                                placeholder="Email"
                              />
                            </Stack>
                            <Button
                              // href="/account"
                              disabled={done}
                              fullWidth
                              variant="contained"
                              sx={{ mt: 5, mb: 2 }}
                              type="submit"
                              className="bg-dark w-100  text-white fw-600"
                            >
                              Send
                            </Button>
                          </Form>
                          {done ? (
                            <div>
                              <span
                                className="fs-6 mt-2"
                                style={{ color: "#607d8b" }}
                              >
                                Check Your Email Please
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ForgetPassword;
