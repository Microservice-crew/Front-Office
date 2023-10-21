import React, { useState } from "react";
import { Row, Col, Container, Form, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from "../../../assets/images/logo-full.png";
import login1 from "../../../assets/images/login/1.png";
import login2 from "../../../assets/images/login/2.png";
import login3 from "../../../assets/images/login/3.png";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
  let history = useNavigate();
  const initialState = {
    role: "user",
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    adress: "",
    city: "",
    birthday: "",
    gender: "",
    competence: "",
    experience: "",
    verify: "",
    webSite: "",
    checkremember: "",
  };
  const [signUp, setSignUp] = useState(false);
  const [isForget, setIsForget] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [data, setData] = useState(initialState);
  const [confirmpassword, setConfirmPassword] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (signUp) {
      console.log(data);
      setSignUp(false);
      setIsReset(false);
      setIsForget(false);
      history("/auth/sign-up");
    } else if (isForget) {
      console.log(data);
      setSignUp(false);
      setIsReset(false);
      setIsForget(false);
      history("/auth/sign-up");
    } else if (isReset) {
      console.log(data);
      setSignUp(false);
      setIsReset(false);
      setIsForget(false);
      history("/auth/sign-up");
    } else {
      console.log(data);
      history("/");
    }
  };
  const resetForm = () => {
    setData(initialState);
    setConfirmPassword(confirmpassword);
  };
  const elementsRole = (data) => {
    switch (data.role) {
      case "User":
        return (
          <div>
            <Row>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Date Of Birth: </Form.Label>
                  <Form.Control type="date" id="dob" name="dob" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Gender: </Form.Label>
                  <Form.Check className="form-check">
                    <Form.Check className="form-check form-check-inline">
                      <Form.Check.Input
                        type="radio"
                        className="form-check-input"
                        name="customRadio"
                        id="customRadio1"
                      />
                      <Form.Check.Label> Male</Form.Check.Label>
                    </Form.Check>
                    <Form.Check className="form-check form-check-inline">
                      <Form.Check.Input
                        type="radio"
                        className="form-check-input"
                        name="customRadio"
                        id="customRadio2"
                      />
                      <Form.Check.Label> Female</Form.Check.Label>
                    </Form.Check>
                  </Form.Check>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="form-group">
              <Form.Label>Competence</Form.Label>
              <Form.Control
                type="text"
                className="mb-0"
                id="exampleInputEmail2"
                placeholder="Enter your competence"
                name="competence"
                value={data.competence}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        );
      case "Expert":
        return (
          <div>
            <Row>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Date Of Birth: </Form.Label>
                  <Form.Control type="date" id="dob" name="dob" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Gender: </Form.Label>
                  <Form.Check className="form-check">
                    <Form.Check className="form-check form-check-inline">
                      <Form.Check.Input
                        type="radio"
                        className="form-check-input"
                        name="customRadio"
                        id="customRadio1"
                      />
                      <Form.Check.Label> Male</Form.Check.Label>
                    </Form.Check>
                    <Form.Check className="form-check form-check-inline">
                      <Form.Check.Input
                        type="radio"
                        className="form-check-input"
                        name="customRadio"
                        id="customRadio2"
                      />
                      <Form.Check.Label> Female</Form.Check.Label>
                    </Form.Check>
                  </Form.Check>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Competence</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-0"
                    id="exampleInputEmail2"
                    placeholder="Enter your competence"
                    name="competence"
                    value={data.competence}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Certificate Of expertise :</Form.Label>
                  <Form.Control
                    type="file"
                    name="verify"
                    value={data.verify}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      case "Company":
        return (
          <div>
            <Row>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>web site</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-0"
                    id="exampleInputEmail2"
                    placeholder="Enter your web site"
                    name="webSite"
                    value={data.webSite}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Register Commerce :</Form.Label>
                  <Form.Control
                    type="file"
                    name="verify"
                    value={data.verify}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        );

      default:
        return null;
    }
  };
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
                <h1 className="mb-0 text-center">
                  {signUp
                    ? "Register"
                    : isForget
                    ? "Forget your Password"
                    : isReset
                    ? "Reset your Password"
                    : "Login"}
                </h1>
                <p className="text-center">
                  Discover new opportunities everyday{" "}
                </p>
                <Form className="mt-4 " onSubmit={handleSubmit}>
                  {signUp ? (
                    <Row>
                      <Col>
                        <Form.Group className="form-group">
                          <Form.Label>Your Role</Form.Label>
                          <select
                            name="role"
                            onChange={handleChange}
                            className="form-select mb-3 shadow-none"
                          >
                            <option defaultValue>Select Your Role</option>
                            <option value="User">User</option>
                            <option value="Expert">Expert</option>
                            <option value="Company">Company</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="form-group">
                          <Form.Label>Your Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="mb-0"
                            id="exampleInputEmail1"
                            placeholder="Your Full Name"
                            name="fullname"
                            value={data.fullname}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  ) : (
                    <div></div>
                  )}
                  {!isReset && (
                    <Form.Group className="form-group">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        className="mb-0"
                        id="exampleInputEmail2"
                        placeholder="Enter email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )}
                  {!isForget && (
                    <>
                      <Row>
                        <Col>
                          <Form.Group className="form-group">
                            <Form.Label>
                              {isReset ? "New Password" : "Password"}
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className="mb-0"
                              id="exampleInputPassword1"
                              placeholder="Password"
                              name="password"
                              value={data.password}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        {signUp && (
                          <Col>
                            <Form.Group>
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                type="password"
                                className="mb-0"
                                id="exampleInputPassword1"
                                placeholder="Confirm Password"
                                name="confirmpassword"
                                value={data.confirmpassword}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                      {signUp && (
                        <>
                          <Row>
                            <Col>
                              <Form.Group className="form-group">
                                <Form.Label>Adress</Form.Label>
                                <Form.Control
                                  className="mb-0"
                                  id="exampleInputPassword1"
                                  placeholder="Enter your adress"
                                  type="text"
                                  name="adress"
                                  value={data.adress}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="form-group">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  type="text"
                                  className="mb-0"
                                  id="exampleInputPassword1"
                                  placeholder="City"
                                  name="city"
                                  value={data.city}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <div>{elementsRole(data)}</div>
                        </>
                      )}
                    </>
                  )}
                  <div className="d-flex justify-content-between">
                    <p
                      className="dark-color d-inline-block line-height-2"
                      onClick={() => {
                        resetForm();
                        setIsForget(false);
                        setSignUp((prev) => !prev);
                      }}
                    >
                      {SignUp && !isForget
                        ? "Already Have Account ? Login"
                        : "Don't have account Sign Up"}
                    </p>
                    <p
                      className="dark-color d-inline-block line-height-2"
                      onClick={() => {
                        setIsForget((prev) => !prev);
                        setSignUp(false);
                      }}
                    >
                      {!isForget && !signUp ? "forget password !?" : ""}
                    </p>
                  </div>
                  <div className="d-inline-block w-100">
                    <Button type="submit" className="btn-primary d-block w-100">
                      {signUp
                        ? "Register"
                        : isForget
                        ? "Forget now"
                        : isReset
                        ? "Reset now"
                        : "Login"}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
