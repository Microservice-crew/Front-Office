import React, { useState } from "react";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCourseComponent = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("myData");
  const token = JSON.parse(userData).token;
  const user = JSON.parse(userData).user;
  const API_Url = "http://127.0.0.1:9000/courses/";
  // const config = {
  //     headers: { Authorization: `Bearer ${token}`}
  // };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertVisibilityF, setAlertVisibilityF] = useState(false);
  const [requiredField, setrequiredField] = useState(false);
  const [chapterTitleData, setChapterTitleData] = useState("");
  const [paragraphTitleData, setparagraphTitle] = useState("");
  const [paragraphContentData, setparagraphContentData] = useState("");
  const [paragImData, setParagImData] = useState(null);
  const [paragVidData, setParagVidData] = useState(null);
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseDescription: "",
    courseContent: [
      {
        chapterTitle: "",
        chapterParagraphs: [
          {
            paragraphTitle: "",
            paragraphContent: "",
            paragraphVideos: null,
            paragraphImages: null,
          },
        ],
      },
    ],
    coursePhoto: "",
    courseOwner: user._id,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertVisibility(false);
    setAlertVisibilityF(false);
  };
  const handleAddChapter = () => {
    let newChapter = {
      chapterTitle: "",
      chapterParagraphs: [
        {
          paragraphTitle: "",
          paragraphContent: "",
          paragraphVideos: null,
          paragraphImages: null,
        },
      ],
    };
    let courseContentArray = courseData.courseContent;
    courseContentArray.push(newChapter);
    setCourseData({ ...courseData, courseContent: courseContentArray });
  };
  const handleAddParagraph = (indexChapter) => {
    let newParag = {
      paragraphTitle: "",
      paragraphContent: "",
      paragraphVideos: null,
      paragraphImages: null,
    };
    courseData.courseContent[indexChapter].chapterParagraphs.push(newParag);
    setCourseData({ ...courseData, courseContent: courseData.courseContent });
  };
  //check this bug
  const handleDeleteChapter = (index) => {
    console.log(index);
    let courseContentArray = courseData.courseContent;
    courseContentArray.splice(index, 1);
    setCourseData({ ...courseData, courseContent: courseContentArray });
    setChapterTitleData("");
  };
  const handleCourseInputChange = (event) => {
    const { name, value } = event.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setCourseData({
        ...courseData,
        coursePhoto: img,
      });
    }
  };
  const onParagImageChange = (event, indexParag, indexChapter) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let paragsArray =
        courseData.courseContent[indexChapter].chapterParagraphs;
      setParagImData(img);
      paragsArray[indexParag].paragraphImages = paragImData;
    }
    console.log(courseData);
  };
  const onParagVideoChange = (event, indexParag, indexChapter) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let paragsArray =
        courseData.courseContent[indexChapter].chapterParagraphs;
      setParagVidData(img);
      paragsArray[indexParag].paragraphImages = paragVidData;
    }
  };
  const handleChapterTitleInputChange = (event, index) => {
    let chaptersArray = courseData.courseContent;
    setChapterTitleData(event.target.value);
    chaptersArray[index].chapterTitle = chapterTitleData;
  };
  const handleParagrapheTitleInputChange = (
    event,
    indexChapter,
    indexParag
  ) => {
    let paragsArray = courseData.courseContent[indexChapter].chapterParagraphs;
    setparagraphTitle(event.target.value);
    paragsArray[indexParag].paragraphTitle = paragraphTitleData;
  };
  const handleParagrapheContentInputChange = (
    event,
    indexChapter,
    indexParag
  ) => {
    let paragsArray = courseData.courseContent[indexChapter].chapterParagraphs;
    setparagraphContentData(event.target.value);
    paragsArray[indexParag].paragraphContent = paragraphContentData;
  };
  const submitData = (event) => {
    const myForm = document.getElementById("myForm");
    if (myForm.checkValidity() && courseData.courseContent.length > 0) {
      axios
        .post(API_Url + "addCourse", courseData, config)
        .then((result) => {
          setAlertVisibility(true);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/dashboards/app/profile-events");
      console.log(courseData);
    } else {
      setAlertVisibilityF(true);
    }
  };

  if (user.role === "expert") {
    return (
      <>
        <div id="content-page" className="content-page">
          <Container>
            <Row>
              <Card>
                <Col lg="12">
                  <form id="myForm" encType="multipart/form-data">
                    <div>
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        align="center"
                      >
                        <strong>General info about the course</strong>
                      </Typography>
                      <Divider
                        style={{ margin: "13px 1px" }}
                        variant="middle"
                      />

                      <TextField
                        error={requiredField}
                        id="outlined-basic"
                        label="Course Title"
                        name="courseName"
                        fullWidth
                        variant="outlined"
                        onChange={handleCourseInputChange}
                        required
                      />
                    </div>
                    <br />
                    <TextField
                      id="outlined-multiline-static"
                      label="Course description"
                      name="courseDescription"
                      multiline
                      fullWidth
                      rows={8}
                      required
                      onChange={handleCourseInputChange}
                    />
                    <br />
                    <br />
                    <Form.Group className="form-group">
                      <Form.Label className="custom-file-input">
                        Course Image
                      </Form.Label>{" "}
                      <Form.Control
                        name="coursePhoto"
                        type="file"
                        id="courseImage"
                        onChange={onImageChange}
                      />
                    </Form.Group>

                    <Divider style={{ margin: "13px 1px" }} variant="middle" />
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      align="center"
                    >
                      <strong>Chapters</strong>
                    </Typography>
                    <Divider style={{ margin: "13px 1px" }} variant="middle" />

                    <div>
                      {courseData.courseContent.map((_, indexChapter) => (
                        <>
                          <TextField
                            id="outlined-basic"
                            label={`chapter ${indexChapter + 1} title`}
                            name={`chapterTitle${indexChapter}`}
                            fullWidth
                            variant="outlined"
                            onChange={(e) =>
                              handleChapterTitleInputChange(e, indexChapter)
                            }
                            required
                          />

                          {_.chapterParagraphs.map((_, indexParag) => (
                            <>
                              <br />
                              <br />
                              <TextField
                                id="outlined-basic"
                                label={`Paragraph ${indexParag + 1} title`}
                                name="paragraphTitle"
                                variant="outlined"
                                onChange={(e) =>
                                  handleParagrapheTitleInputChange(
                                    e,
                                    indexChapter,
                                    indexParag
                                  )
                                }
                                required
                              />
                              <br />
                              <br />
                              <TextField
                                id="outlined-basic"
                                label={`Paragraph ${indexParag + 1} textarea`}
                                multiline
                                rows={6}
                                fullWidth
                                name="paragraphContent"
                                variant="outlined"
                                onChange={(e) =>
                                  handleParagrapheContentInputChange(
                                    e,
                                    indexChapter,
                                    indexParag
                                  )
                                }
                                required
                              />
                              <br />
                              <br />
                              <Form.Group className="form-group">
                                <Form.Label className="custom-file-input">
                                  Paragraph Image
                                </Form.Label>{" "}
                                <Form.Control
                                  name="paragraphImages"
                                  type="file"
                                  id="image"
                                  // onChange={(e) => onParagImageChange(e,indexChapter,indexParag)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group">
                                <Form.Label className="custom-file-input">
                                  Paragraph Video
                                </Form.Label>{" "}
                                <Form.Control
                                  name="paragraphVideos"
                                  type="file"
                                  id="video"
                                  //  onChange={(e)=> onParagVideoChange(e,indexChapter,indexParag)}
                                />
                              </Form.Group>
                            </>
                          ))}
                          <br />
                          <br />

                          <Button
                            key={indexChapter + 1}
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={(event) =>
                              handleAddParagraph(indexChapter)
                            }
                          >
                            Add Paragraph
                          </Button>
                          <Button
                            key={indexChapter}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={(event) =>
                              handleDeleteChapter(indexChapter)
                            }
                          >
                            Delete
                          </Button>

                          <Divider
                            style={{ margin: "13px 1px" }}
                            variant="middle"
                          />
                        </>
                      ))}
                    </div>

                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddChapter}
                    >
                      Add chapter
                    </Button>
                  </form>
                </Col>
              </Card>
              <Stack spacing={2} sx={{ width: "40%" }}>
                <Button
                  variant="contained"
                  style={{ left: "160%" }}
                  startIcon={<SendIcon />}
                  onClick={(event) => submitData(event)}
                >
                  submit
                </Button>
                <Snackbar
                  open={alertVisibility}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Course added successfully
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={alertVisibilityF}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Please fill out all the necessary fields
                  </Alert>
                </Snackbar>
              </Stack>
            </Row>
          </Container>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Row>
            <Card>
              <h3>
                You do not have the Permission for this url. Go back{" "}
                <Link to="/">Home</Link>
              </h3>
            </Card>
          </Row>
        </Container>
      </>
    );
  }
};

export default AddCourseComponent;
