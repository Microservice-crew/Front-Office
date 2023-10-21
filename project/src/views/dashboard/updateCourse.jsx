import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

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

const UpdateCourseComponent = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("myData");
  const token = JSON.parse(userData).token;
  const user = JSON.parse(userData).user;
  const idCourse = useParams().id;
  const API_Url = "http://127.0.0.1:9000/courses/";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(config);

  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertVisibilityF, setAlertVisibilityF] = useState(false);
  const [courseToUpdateData, setCourseToUpdateData] = useState(null);
  const [chapterTitleData, setChapterTitleData] = useState("");
  const [paragraphTitleData, setparagraphTitle] = useState("");
  const [paragraphContentData, setparagraphContentData] = useState();
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseDescription: "",
    courseContent: [],
    coursePhoto: null,
    courseOwner: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertVisibility(false);
    setAlertVisibilityF(false);
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
  const handleDeleteChapter = (indexChapter) => () => {
    let courseContentArray = [...courseData.courseContent];
    courseContentArray.splice(indexChapter, 1);
    setCourseData({ ...courseData, courseContent: courseContentArray });
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
  const handleCourseInputChange = (event) => {
    const { name, value } = event.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
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
        .put(
          API_Url + "updateCourseById/" + idCourse,
          { updatedCourseContent: courseData },
          config
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      setAlertVisibility(true);
      navigate("../../");
    } else {
      setAlertVisibilityF(true);
    }
  };

  // this fct/useEffect is used to fetch The object Course by its Id
  useEffect(() => {
    const fetchCourseToUpdateData = async () => {
      await axios
        .get(API_Url + "getCourseById/" + idCourse)
        .then((result) => {
          setCourseToUpdateData(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCourseToUpdateData();
  }, []);

  //this useEffect to fetch all the chapters data and insert it into courseData
  useEffect(() => {
    const fetchChapterData = async () => {
      const chapterPromises = courseToUpdateData.courseContent.map(
        (chapterId) => {
          return axios.get(API_Url + "getChapterById/" + chapterId);
        }
      );

      const chapterResponses = await Promise.all(chapterPromises);
      const chapterData = chapterResponses.map(
        (chapterResponse) => chapterResponse.data
      );

      const coureToupdate = {
        courseName: courseToUpdateData.courseName,
        courseDescription: courseToUpdateData.courseDescription,
        coursePhoto: courseToUpdateData.coursePhoto,
        courseOwner: courseToUpdateData.courseOwner,
        courseContent: chapterData.map((chapter) => ({
          chapterTitle: chapter.chapterTitle,
          chapterParagraphs: chapter.chapterParagraphs.map((parag) => ({
            paragraphTitle: parag.paragraphTitle,
            paragraphContent: parag.paragraphContent,
            paragraphVideos: parag.paragraphVideos,
            paragraphImages: parag.paragraphImages,
          })),
        })),
      };
      setCourseData(coureToupdate);
    };

    if (courseToUpdateData) {
      fetchChapterData();
    }
  }, [courseToUpdateData]);

  if (courseData && courseData.courseName) {
    // console.log(courseData)
    if (user._id === courseData.courseOwner) {
      return (
        <>
          <div id="content-page" className="content-page">
            <Container>
              <Row>
                <Card>
                  <Col lg="12">
                    <form id="myForm">
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
                          // error={requiredField}
                          id="outlined-basic"
                          label="Course Title"
                          name="courseName"
                          fullWidth
                          variant="outlined"
                          defaultValue={courseData.courseName}
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
                        defaultValue={courseData.courseDescription}
                        onChange={handleCourseInputChange}
                      />
                      <br />
                      <br />
                      <Form.Group className="form-group">
                        <Form.Label className="custom-file-input">
                          Update Course Image
                        </Form.Label>{" "}
                        <Form.Control
                          name="Course Image"
                          //defaultValue={courseData.coursePhoto}
                          type="file"
                          id="courseImage"
                          // onChange={(e)=>handleFileInputChange(e,"paragraphVideos",indexChapter,indexParag)
                        />
                      </Form.Group>

                      <Divider
                        style={{ margin: "13px 1px" }}
                        variant="middle"
                      />
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        align="center"
                      >
                        Chapters
                      </Typography>
                      <Divider
                        style={{ margin: "13px 1px" }}
                        variant="middle"
                      />

                      <div>
                        {courseData.courseContent.map((_, indexChapter) => (
                          <>
                            <TextField
                              id="outlined-basic"
                              label={`chapter ${indexChapter + 1} title`}
                              name={`chapterTitle${indexChapter}`}
                              fullWidth
                              variant="outlined"
                              defaultValue={_.chapterTitle}
                              onChange={(e) =>
                                handleChapterTitleInputChange(e, indexChapter)
                              }
                              required
                            />

                            <br />
                            <br />

                            {_.chapterParagraphs.map((_, indexParag) => (
                              <>
                                <br />
                                <br />
                                <TextField
                                  id="outlined-basic"
                                  label={`Paragraph ${indexParag + 1} title`}
                                  name="paragraphTitle"
                                  variant="outlined"
                                  defaultValue={_.paragraphTitle}
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
                                  defaultValue={_.paragraphContent}
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
                                    Update Paragraph Image
                                  </Form.Label>{" "}
                                  <Form.Control
                                    name="paragraphImages"
                                    type="file"
                                    id="image"
                                    // onChange={(e)=>handleFileInputChange(e,"paragraphImages",indexChapter,indexParag)}
                                  />
                                </Form.Group>
                                <br />
                                <br />
                                <Form.Group className="form-group">
                                  <Form.Label className="custom-file-input">
                                    Update Paragraph Video
                                  </Form.Label>{" "}
                                  <Form.Control
                                    name="paragraphVideos"
                                    type="file"
                                    id="video"
                                    // onChange={(e)=>handleFileInputChange(e,"paragraphVideos",indexChapter,indexParag)
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
                              onClick={handleDeleteChapter(indexChapter)}
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
                      Course updated successfully
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
  } else {
    return (
      <>
        <Container>
          <Row>
            <Card>LOAAAAADING</Card>
          </Row>
        </Container>
      </>
    );
  }
};

export default UpdateCourseComponent;
