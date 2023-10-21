import React, { useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

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
import RegisterUser from "./RegisterUser";
import RegisterCompany from "./RegisterCompany";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const Register = () => {
  const options = [
    { value: "user", label: "User" },
    { value: "company", label: "Company" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
                <h1 className="mb-0 text-center">Register</h1>
                <p className="text-center">
                  Discover new opportunities everyday{" "}
                </p>
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <label htmlFor="dropdown" className="mr-3">
                    Select your role :
                  </label>
                  <br />
                  <select
                    id="dropdown"
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedOption === "user" && <RegisterUser />}
                {selectedOption === "company" && <RegisterCompany />}
                {!selectedOption && <RegisterUser />}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
