import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

//profile-header

import { getAllOffers } from "../../api/offer";
import CardOffer from "../../components/card/CardOffer";
import ProfileHeader from "../../components/profile-header";
// import img58 from "../../../assets/images/page-img/58.jpg";
// import img57 from "../../../assets/images/page-img/57.jpg";
// import img59 from "../../../assets/images/page-img/59.jpg";
// import img6 from "../../../assets/images/page-img/profile-bg6.jpg";

const CompanyOffers = () => {
  const [offers, setOffers] = useState();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const getOffers = async () => {
    try {
      const response = await getAllOffers();

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
      } else {
        setOffers(
          response.data.filter((offer) => {
            return offer.mode === filterMode;
          })
        );
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
          const Score = JSON.parse(localStorage.getItem("myData")).user
            .scoreTotal;
          const liste = list.filter((offers) => {
            return offers?.ConditionScore <= Score;
          });
          console.log(liste);
          setOffers(liste);
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

  const handleFilterMode = (mode) => {
    setFilterMode(mode);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    getOffers();
  }, [filterMode, filterCategory]);

  const handleClose = () => setShow(false);

  const handleDelete = () => {};

  return (
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div className="">
            <h1 className=" mb-5" style={{ fontWeight: "bold" }}>
              Job Offers:
            </h1>
            <div className="d-flex flex-row flex-wrap gap-5">
              {offers &&
                offers.map((offer, index) => (
                  <CardOffer
                    key={index}
                    id={offer._id}
                    name={offer.name}
                    description={offer.description}
                    category={offer.category}
                    requirements={offer.requirements}
                    nombre={offer.nombre}
                    publishedDate={offer.publishedDate}
                    owner={offer.owner}
                    mode={offer.mode}
                    appliers={offer.appliers}
                    maxAppliers={offer.appliers.length}
                    ConditionScore={offer.ConditionScore}
                    offers={() => getOffers()}
                  />
                ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CompanyOffers;
