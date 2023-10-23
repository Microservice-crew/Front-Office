import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";

//profile-header

import CardTask from "../../../components/card/CardTask";
import ProfileHeader from "../../../components/profile-header";
import { getAlltasks } from "../../../api/tasks";
import CardFlight from "../../../components/card/CardFlight";
import { getAllFlights } from "../../../api/flight";
// import img58 from "../../../assets/images/page-img/58.jpg";
// import img57 from "../../../assets/images/page-img/57.jpg";
// import img59 from "../../../assets/images/page-img/59.jpg";
// import img6 from "../../../assets/images/page-img/profile-bg6.jpg";

const FlightUser = () => {
  const [flights, setFlights] = useState([]);

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const getOffers = async () => {
    try {
      const response = await getAllFlights();
      const user = JSON.parse(localStorage.getItem("myData")).user;
      if (filterMode === "" || filterMode === "all") {
        if (user.role === "user") {
          const skills = JSON.parse(localStorage.getItem("myData")).user.skills;
          const skillsNames = skills.map((skills) =>
            skills.name.toLowerCase().replace(/\s+/g, " ").trim()
          );
          const list = response.data.filter((offer) =>
            offer.requirements.some((requirement) => {
              return skillsNames.some((skill) => {
                return (
                  skill.toLowerCase().replace(/\s+/g, " ").trim() ===
                  requirement.toLowerCase().replace(/\s+/g, " ").trim()
                );
              });
            })
          );

          setFlights(list);
        } else setFlights(response.data);
      }
      if (filterCategory === "" || filterCategory === "all") {
        if (user.role === "user") {
          const skills = JSON.parse(localStorage.getItem("myData")).user.skills;
          const skillsNames = skills.map((skills) =>
            skills.name.toLowerCase().replace(/\s+/g, " ").trim()
          );
          const list = response.data.filter((offer) =>
            offer.requirements.some((requirement) => {
              return skillsNames.some((skill) => {
                return (
                  skill.toLowerCase().replace(/\s+/g, " ").trim() ===
                  requirement.toLowerCase().replace(/\s+/g, " ").trim()
                );
              });
            })
          );
          setFlights(list);
        } else setFlights(response.data);
      } else {
        setFlights(
          response.data.filter((offer) => {
            return offer.category === filterCategory;
          })
        );
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    getOffers();
  }, [filterMode, filterCategory]);

  return (
    <>
      <ProfileHeader />
      <div
        id="content-page"
        className="content-page d-flex justify-content-end"
      >
        <Container className="mx-5">
          <h1 className=" mb-5" style={{ fontWeight: "bold" }}>
            Flights:
          </h1>
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
          </div>
        </Container>

        <Col xs="2" className="mx-5"></Col>
      </div>
    </>
  );
};

export default FlightUser;
