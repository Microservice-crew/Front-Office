import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Subject } from "@mui/icons-material";

const RatingsComponentUser = () => {
  const [rating, setRating] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [subjectId, setSubjectId] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [userRatings, setUserRatings] = useState([]);
  const [userRatingsData, setUserRatingsData] = useState(null);
  const [userData, setUserData] = useState(null);
  const UserId = useParams();
  const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/ratings/user/${UserId.id}/average`)
      .then((response) => {
        setAverageRating(response.data.averageRating);
      })
      .catch((error) => console.error(error.message));

    axios
      .get(`http://localhost:9000/ratings/user/${UserId.id}/ratings`)
      .then((response) => {
        setUserRatings(response.data);
      })
      .catch((error) => console.error(error.message));
    axios
      .get(`http://localhost:9000/user/user/${UserId.id}`) // Appeler l'API pour récupérer les données de l'utilisateur
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error(error.message));
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const p = userRatings.map((r) => {
        return axios.get(`http://localhost:9000/ratings/Rate/${r._id}`);
      });
      const ratingResponsive = await Promise.all(p);
      const ratingData = ratingResponsive.map((w) => (w.data ? w.data : null)); // Ajouter une vérification pour les données vides
      if (ratingData !== [] && ratingData) {
        setUserRatingsData(ratingData);
      }
    };
    fetchData();
  }, [userRatings, refresh]); // Ajouter le tableau de dépendances

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ratingValue = parseFloat(rating);
    axios
      .post(`http://localhost:9000/ratings/user/${UserId.id}/ratings`, {
        rating: ratingValue,
        comment: comment,
        user: currentConnectedUser._id,
      })
      .then((response) => {
        setMessage(response.data.message);
        setRating(0);
        setRefresh((prev) => !prev);
        setComment("");
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Erreur serveur.");
      });
  };

  const handleCancel = () => {
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      const p = userRatings.map((r) => {
        return axios.get(`http://localhost:9000/ratings/Rate/${r._id}`);
      });
      const ratingResponsive = await Promise.all(p);
      const ratingData = ratingResponsive.map((w) => (w.data ? w.data : null)); // Ajouter une vérification pour les données vides
      if (ratingData !== [] && ratingData) {
        setUserRatingsData(ratingData);
      }
    };
    fetchData();
  }, [userRatings]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>RATE THIS USER</h2>
          {averageRating !== null && (
            <div>Average of rates : {averageRating.toFixed(2)}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              size="large"
              precision={0.5}
              sx={{ color: "#ffc107" }}
            />
            <Form.Group controlId="comment">
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                as="textarea"
                value={comment}
                onChange={handleCommentChange}
                rows="3"
                required
              />
            </Form.Group>
            <Button type="submit">Send</Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Form>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <h3>List of rates for {rating?.rater?.fullName} :</h3>
          {userRatings.length > 0 ? (
            <ListGroup>
              {userRatingsData &&
                userRatingsData.map((rating, index) => (
                  <ListGroup.Item key={index}>
                    <div>User : {rating?.rater?.fullName}</div>
                    <div>Rate : {rating.rating}</div>
                    <div>Comment : {rating.comment}</div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          ) : (
            <p>No rating for this user.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RatingsComponentUser;
