import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

//profile-header

import CardTask from "../../components/card/CardTask";
import ProfileHeader from "../../components/profile-header";
import { getAlltasks } from "../../api/tasks";
// import img58 from "../../../assets/images/page-img/58.jpg";
// import img57 from "../../../assets/images/page-img/57.jpg";
// import img59 from "../../../assets/images/page-img/59.jpg";
// import img6 from "../../../assets/images/page-img/profile-bg6.jpg";

const CompanyTasks = () => {
  const [offers, setOffers] = useState();

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const getOffers = async () => {
    try {
      const response = await getAlltasks();
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

          setOffers(list);
        } else setOffers(response.data);
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
          setOffers(list);
        } else setOffers(response.data);
      } else {
        setOffers(
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
            Tasks Offers:
          </h1>
          <div className="d-flex flex-row flex-wrap gap-5">
            {offers &&
              offers.map((offer, index) => (
                <CardTask
                  key={index}
                  id={offer._id}
                  name={offer.name}
                  description={offer.description}
                  requirements={offer.requirements}
                  nombre={offer.nombre}
                  publishedDate={offer.publishedDate}
                  owner={offer.owner}
                  ExpireDate={offer.ExpireDate}
                  appliers={offer.appliers}
                  maxAppliers={offer.appliers.length}
                  offers={() => getOffers()}
                />
              ))}
          </div>
        </Container>
        <Col xs="2" className="mx-5">
          <Card className="d-flex align-items-center justify-content-center bg-success text-center w-100 h-30">
            <Card.Header>
              <Card.Title>
                <h3>Index</h3>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <h5>ever rank here to give high score to your appliers</h5>
              <h6>nomber of days working X rank value</h6>
              <ul>
                <li>A = 100</li>
                <li>B = 75 </li>
                <li>C = 50 </li>
                <li>D = 25 </li>
                <li>E = 10 </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default CompanyTasks;
