import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProfileHeader from "../../components/profile-header";
import { getMeetsInvited, getMeetsOwner } from "../../api/meet";

const MeetsPage = () => {
  const [meetings, setMeetings] = useState();

  const user = JSON.parse(localStorage.getItem("myData"));
  const userId = user.user._id;
  const [expert, setExpert] = useState(false);
  const [company, setCompany] = useState(false);
  const user_id = userId; // Define user_id here

  const getMeetingsOwner = async (id) => {
    const response = await getMeetsOwner(id);
    const meetingsData = response.data.map((meet) => {
      return {
        ...meet,
        companyId: meet.company?._id,
      };
    });

    setMeetings(meetingsData);
    setCompany(meetingsData[0]?.company?._id);
  };

  const getMeetingsInvited = async (id) => {
    const response = await getMeetsInvited(id);
    setMeetings(response.data);
    console.log("Meetings : ", response);
  };

  useEffect(() => {
    if (user.user.role === "company") {
      setCompany(true);
      getMeetingsOwner(user.user._id);
    } else {
      setExpert(true);
      getMeetingsInvited(user.user._id);
    }
  }, [user.user._id, user.user.role]);

  return (
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div className="">
            <h1 className=" mb-5" style={{ fontWeight: "bold" }}>
              Meets:
            </h1>
            <div className="d-flex flex-row flex-wrap gap-5">
              {meetings &&
                meetings.map((meet) => (
                  <MeetingCard
                    isCompany={user.user.role === "company" ? true : false}
                    key={meet._id}
                    meet={meet}
                  />
                ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MeetsPage;

export const MeetingCard = ({ isCompany, meet }) => {
  const formatDate = (d) => {
    const date = new Date(d);
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <div
      className="card "
      style={{
        padding: "15px 30px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="card-body d-flex flex-column">
        <div className="">
          <h4
            className="card-title text-center mb-3"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {meet.name}
          </h4>

          <div>
            <h5 style={{ fontWeight: "bold", opacity: "0.8" }}>
              Starts Date :{" "}
            </h5>
            {formatDate(meet.startDateTime)}
          </div>
          <div className="mt-3">
            <h5 style={{ fontWeight: "bold", opacity: "0.8" }}>
              Expires Date :{" "}
            </h5>
            {formatDate(meet.expires)}
          </div>
        </div>
      </div>
      <div className="card-footer d-flex  align-items-center justify-content-between">
        <Link
          className="btn btn-primary btn-sm me-2"
          to={`/${isCompany ? "ratingsUser" : "ratingsCompany"}/${
            isCompany ? meet.invited : meet.owner
          }`}
        >
          {isCompany ? "Rate this User" : "Rate this Company"}
        </Link>
        <a href={meet.url} target="_blank">
          {" "}
          Join now
        </a>
      </div>
    </div>
  );
};
