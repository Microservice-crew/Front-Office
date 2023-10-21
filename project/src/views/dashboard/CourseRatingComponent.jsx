import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const RatingsComponentCourse = () => {
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [courseRatings, setCourseRatings] = useState([]);
  const [courseRatingsData, setCourseRatingsData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [avarageRating, setAvarageRating] = useState(1);
  const courseId = useParams();
  const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/ratings/course/${courseId.id}/average`)
      .then((response) => {
        setAvarageRating(response.data.averageRating);
      })
      .catch((error) => console.error(error.message));

    axios
      .get(`http://localhost:9000/ratings/course/${courseId.id}/ratings`)
      .then((response) => {
        console.log({ response });
        setCourseRatings(response.data.ratings);
        setAvarageRating(response.data.average);
      })
      .catch((error) => console.error(error.message));

    axios
      .get(`http://localhost:9000/courses/getCourseById/${courseId.id}`) // Call the API to retrieve course data
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const p = courseRatings.map((r) => {
        return axios.get(`http://localhost:9000/ratings/Rate/${r._id}`);
      });
      const ratingResponsive = await Promise.all(p);
      const ratingData = ratingResponsive.map((w) => (w.data ? w.data : null));
      if (ratingData !== [] && ratingData) {
        setCourseRatingsData(
          ratingData.map((r, i) => ({ ...r, user: courseRatings[i].user }))
        );
      }
    };

    fetchData();
  }, [courseRatings]);

  // Add dependency array

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
      .post(`http://localhost:9000/ratings/course/${courseId.id}/ratings`, {
        rating: ratingValue,
        comment: comment,
        user: currentConnectedUser._id,
      })
      .then((response) => {
        setMessage(response.data.message);
        setRating(0);
        setComment("");
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Server error.");
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const p = courseRatings.map((r) => {
        return axios.get(`http://localhost:9000/ratings/Rate/${r._id}`);
      });

      const ratingResponsive = await Promise.all(p);
      const ratingData = ratingResponsive.map((w) => (w.data ? w.data : null)); // Add a check for empty data
      if (ratingData !== [] && ratingData) {
        setCourseRatingsData(ratingData);
      }
    };
    fetchData();
  }, [courseRatings]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>RATE THIS COURSE</h2>
          {avarageRating !== null && (
            <div>Average of rates : {avarageRating} ⭐</div>
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
              <Form.Label>Comment :</Form.Label>
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
          <h3>List of rates for this course :</h3>
          {courseRatings.length > 0 ? (
            <ListGroup>
              {courseRatingsData &&
                courseRatingsData.map((rating, index) => (
                  <ListGroup.Item key={index}>
                    <div>User : {rating?.rater?.fullName}</div>
                    <div>Rate : {rating.rating}</div>
                    <div>Comment : {rating.comment}</div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          ) : (
            <p>No rating for this course.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RatingsComponentCourse;
