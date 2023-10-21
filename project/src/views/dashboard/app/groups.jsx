import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, Navigate } from "react-router-dom";
import ProfileHeader from "../../../components/profile-header";

import axios from "axios";

// images
import gi1 from "../../../assets/images/page-img/gi-1.jpg";
import user05 from "../../../assets/images/user/05.jpg";
import user06 from "../../../assets/images/user/06.jpg";
import user07 from "../../../assets/images/user/07.jpg";
import user08 from "../../../assets/images/user/08.jpg";
import user09 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import img1 from "../../../assets/images/page-img/profile-bg1.jpg";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Groups = () => {

  const API_url = "http://127.0.0.1:9000/";
  const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
  // console.log(currentConnectedUser)

  const [courseData, setCourseData] = useState(null);
  const [ownersData, setOwnersData] = useState({});
  const [coursePicture, setCoursePicture] = useState("http://127.0.0.1:9000/data/1681830270752-deddyPhotoDeProfil.jpg");

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchAllCoursesData = async () => {
    await axios.get(API_url+"courses/getAllCourses").then(
      async (result) => {
        const data = result.data;
        setCourseData(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  const handleApplyingCourse = async (courseId) => {
    await axios.put(API_url+"courses/applyToCourse/"+courseId, {
      userID: currentConnectedUser._id
    }).then(
      (result) => {
        if(result.status == 200){
          console.log("applied successfully")
        }else{
          console.log("applied NON successfully")
        }
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect( () => {
    fetchAllCoursesData();
  },[]);

  useEffect(() => {
    const fetchOwnerData = async (id) => {
      try {
        const result = await axios.get(API_url+"user/getUserById/"+id);
        const data = result.data;
        setOwnersData((prevState) => {
          return {
            ...prevState,
            [id]: data.fullName // assuming that the name of the owner is stored in the "name" field of the response object
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (courseData) {
      courseData.forEach((singleCourseData) => {
        const ownerId = singleCourseData.courseOwner;
        console.log(ownerId)
        fetchOwnerData(ownerId);
      });
    }
  }, [courseData]);

  // const res = fetchOwnersData("64248c024db8ea26a26d203f");

  if(courseData){
    console.log(courseData)
    return (
      <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="All Courses" value="1" />
                <Tab label="My Courses" value="2" />
                </TabList>
            </Box>


              <TabPanel value="1">
                <>
                <div id="content-page" className="content-page">
                  <Container>
          
                    { courseData.map((singleCourseData, indexCourse) => (
                      
                      <>
                        <div className="d-grid gap-3 d-grid-template-1fr-19">
                          <Card className="mb-0">
                            <div className="top-bg-image">
                              {/** insert image of course here */}
                              <img key={indexCourse} src={img1} className="img-fluid w-100" alt="group-bg" />
                            </div>
                            <Card.Body className=" text-center">
                            <div className="group-icon">
                              {`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}` === `http://127.0.0.1:9000/data/` ? (
                                <>
                                <img
                                  key={indexCourse}
                                  src={gi1}
                                  alt="profile-img"
                                  className="rounded-circle img-fluid avatar-120"
                                />
                                </>
                              ): (
                                <>
                                <img
                                  key={indexCourse}
                                  src={`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}`}
                                  alt="profile-img"
                                  className="rounded-circle img-fluid avatar-120"
                                />
                                </>
                              )}
                              
                            </div>
                            <div className="group-info pt-3 pb-3">
                              <h4>
                                {singleCourseData.courseName}
                              </h4>
                              <p key={indexCourse}> {singleCourseData.courseDescription} </p>
                            </div>
                            <div className="group-details d-inline-block pb-3">
                              <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                                <li className="pe-3 ps-3">
                                  <p className="mb-0">Course By</p>
                                  <h6>{Object.entries(ownersData).find(([id,value]) => id=== singleCourseData.courseOwner.toString())}</h6>
                                </li>
                              </ul>
                            </div>
                            <div className="group-member mb-3">
                              <div className="iq-media-group">
                                <Link to="#" className="iq-media">
                                  <img
                                    className="img-fluid avatar-40 rounded-circle"
                                    src={user05}
                                    alt=""
                                  />
                                </Link>
                                <Link to="#" className="iq-media">
                                  <img
                                    className="img-fluid avatar-40 rounded-circle"
                                    src={user06}
                                    alt=""
                                  />
                                </Link>
                                <Link to="#" className="iq-media">
                                  <img
                                    className="img-fluid avatar-40 rounded-circle"
                                    src={user07}
                                    alt=""
                                  />
                                </Link>
                                <Link to="#" className="iq-media">
                                  <img
                                    className="img-fluid avatar-40 rounded-circle"
                                    src={user08}
                                    alt=""
                                  />
                                </Link>
                                <Link to="#" className="iq-media">
                                  <img
                                    className="img-fluid avatar-40 rounded-circle"
                                    src={user09}
                                    alt=""
                                  />
                                </Link>
                                <Link to="#" className="iq-media">
                                  <img
                                    className="img-fluid avatar-40 rounded-circle"
                                    src={user10}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            { singleCourseData.courseOwner == currentConnectedUser._id ? ( 
                                <>
                                <Link to={"/updateCourse/"+singleCourseData._id}>
                                  <button type="submit" className="btn btn-primary d-block w-100">
                                    Update
                                  </button>
                                </Link>
                                </>
                              ): singleCourseData.courseSubcribed.includes(currentConnectedUser._id) ?
                              (
                                <>
                                <Link to={"/course/"+singleCourseData._id}>
                                  <button type="submit" className="btn btn-primary d-block w-100">
                                    Go to course
                                  </button>
                                </Link>
                                <Link to={"/ratingsCourse/" + singleCourseData._id}>
      <button type="submit" className="btn btn-primary d-block w-100">
        Rate this course
      </button>
    </Link>
                                </>
                              ): (
                                <>
                                <Link to={"/course/"+singleCourseData._id}>
                                  <button type="submit" className="btn btn-primary d-block w-100" onClick={(event) => handleApplyingCourse(singleCourseData._id)}>
                                    Apply
                                  </button>
                                </Link>
                                </>
                              ) }
                        </Card.Body>
                      </Card>
                      
                    </div>
                      </>
                    )) }
          
                  </Container>
                </div>
                </>
              </TabPanel>

              
              <TabPanel value="2">
                  <>
                  <div id="content-page" className="content-page">
                    <Container>
                    { courseData.map((singleCourseData, indexCourse) => (
                      <>
                      { singleCourseData.courseOwner == currentConnectedUser._id ? (
                        <>
                          <div className="d-grid gap-3 d-grid-template-1fr-19">
                            <Card className="mb-0">
                              <div className="top-bg-image">
                                <img key={indexCourse} src={img1} className="img-fluid w-100" alt="group-bg" />
                              </div>
                              <Card.Body className=" text-center">
                              <div className="group-icon">
                                <img
                                  key={indexCourse}
                                  src={gi1}
                                  alt="profile-img"
                                  className="rounded-circle img-fluid avatar-120"
                                />
                              </div>
                              <div className="group-info pt-3 pb-3">
                                <h4>
                                  <Link key={indexCourse} to="/dashboards/app/group-detail">{singleCourseData.courseName}</Link>
                                </h4>
                                <p key={indexCourse}> {singleCourseData.courseDescription} </p>
                              </div>
                              <div className="group-details d-inline-block pb-3">
                                <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                                  <li className="pe-3 ps-3">
                                    <p className="mb-0">Course By</p>
                                    <h6>{Object.entries(ownersData).find(([id,value]) => id=== singleCourseData.courseOwner.toString())}</h6>
                                  </li>
                                </ul>
                              </div>
                              <div className="group-member mb-3">
                                <div className="iq-media-group">
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user05}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user06}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user07}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user08}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user09}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user10}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              </div>
                              <Link to={"/updateCourse/"+singleCourseData._id}>
                                <button type="submit" className="btn btn-primary d-block w-100">
                                  Update
                                </button>
                              </Link>
                          </Card.Body>
                        </Card>
                        
                      </div>
                        </>
                      ) : singleCourseData.courseSubcribed.includes(currentConnectedUser._id) ? (
                        <>
                        <div className="d-grid gap-3 d-grid-template-1fr-19">
                            <Card className="mb-0">
                              <div className="top-bg-image">
                                <img key={indexCourse} src={img1} className="img-fluid w-100" alt="group-bg" />
                              </div>
                              <Card.Body className=" text-center">
                              <div className="group-icon">
                                <img
                                  key={indexCourse}
                                  src={gi1}
                                  alt="profile-img"
                                  className="rounded-circle img-fluid avatar-120"
                                />
                              </div>
                              <div className="group-info pt-3 pb-3">
                                <h4>
                                  <Link key={indexCourse} to="/dashboards/app/group-detail">{singleCourseData.courseName}</Link>
                                </h4>
                                <p key={indexCourse}> {singleCourseData.courseDescription} </p>
                              </div>
                              <div className="group-details d-inline-block pb-3">
                                <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                                  <li className="pe-3 ps-3">
                                    <p className="mb-0">Course By</p>
                                    <h6>{Object.entries(ownersData).find(([id,value]) => id=== singleCourseData.courseOwner.toString())}</h6>
                                  </li>
                                </ul>
                              </div>
                              <div className="group-member mb-3">
                                <div className="iq-media-group">
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user05}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user06}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user07}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user08}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user09}
                                      alt=""
                                    />
                                  </Link>
                                  <Link to="#" className="iq-media">
                                    <img
                                      className="img-fluid avatar-40 rounded-circle"
                                      src={user10}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              </div>
                              <Link to={"/course/"+singleCourseData._id}>
                                <button type="submit" className="btn btn-primary d-block w-100">
                                  Go to course
                                </button>
                              </Link>
                          </Card.Body>
                        </Card>
                        
                        </div>
                        </>
                      ) : (
                        <></>
                      )}
                      </>
                    ))}
                    </Container>
                  </div>
                  </>
              </TabPanel>
            </TabContext>
          </Box>
      </>
    );
  }else{
    return (
      <div>
        LOAAAAAING
      </div>
    )
  }
  
};

export default Groups;
