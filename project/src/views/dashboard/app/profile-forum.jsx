import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Row, Col, Container, Nav, Button, Table, Tab} from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'

// images
import user1 from '../../../assets/images/user/1.jpg'
import user05 from '../../../assets/images/user/05.jpg'
import user01 from '../../../assets/images/user/01.jpg'
import user02 from '../../../assets/images/user/02.jpg'
import user03 from '../../../assets/images/user/03.jpg'
import user06 from '../../../assets/images/user/06.jpg'
import user07 from '../../../assets/images/user/07.jpg'
import user08 from '../../../assets/images/user/08.jpg'
import user09 from '../../../assets/images/user/09.jpg'
import user04 from '../../../assets/images/user/04.jpg'
import icon8 from '../../../assets/images/icon/08.png'
import icon9 from '../../../assets/images/icon/09.png'
import icon10 from '../../../assets/images/icon/10.png'
import icon11 from '../../../assets/images/icon/11.png'
import icon12 from '../../../assets/images/icon/12.png'
import icon13 from '../../../assets/images/icon/13.png'
import img1 from '../../../assets/images/page-img/profile-bg1.jpg'

const ProfileForums =() =>{

    const API_url = "http://127.0.0.1:9000/";
    const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
    
    const [testsDataArray, setTestsDataArray] = useState(null);
    const [ownersData, setOwnersData] = useState({});


    const handleClickApplyTest = (id) => {
        axios.put("http://127.0.0.1:9000/tests/applyUserById/"+id, {
            "userID": currentConnectedUser._id
        });
    }
    //getting the array of all tests DATA
    useEffect(() => {
        const fetchAllTestsData = async () => {
            await axios.get(API_url+"tests/getAllTestData").then(
                (result) => {
                    const data = result.data;
                    setTestsDataArray(data);
                }
            ).catch( (error) => console.log("error getting data"+error))
        };
        fetchAllTestsData();
    },[testsDataArray])
    //getting owners data of each test
    useEffect(() => {
        const fetchOwnersData = async (id) => {
            try{
                const result = await axios.get(API_url+"user/getUserById/"+id);
                const data = result.data;
                setOwnersData((prevState) => {
                    return {
                        ...prevState,
                        [id]: data.fullName
                    };
                });
            }catch(error) {
                console.log(error);
            }
        };
        if(testsDataArray){
            testsDataArray.forEach((singleTestData) => {
                const ownerId = singleTestData.testOwner;
                fetchOwnersData(ownerId);
            });
        }
    },[ownersData])
    
    

    if(testsDataArray){
        // console.log(ownersData);
        // console.log(testsDataArray);
        return(
            <>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Card>
                                <Card.Body className=" profile-page p-0">
                                    <div className="profile-header">
                                        <div className="position-relative">
                                            <img loading="lazy" src={img1} alt="profile-bg" className="rounded img-fluid"/>
                                        </div>
                                        <div className="user-detail text-center mb-3">
                                            <div className="profile-img">
                                                <img loading="lazy" src={user1} alt="profile" className="avatar-130 img-fluid" />
                                            </div>
                                            <div className="profile-detail">
                                                <h3>{currentConnectedUser.fullName}</h3>
                                            </div>
                                        </div>
                                        <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                                            <div className="social-info">
                                                <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                                    <li className="text-center ps-3">
                                                        <h6>Tests Taken</h6>
                                                        <p className="mb-0">690</p>
                                                    </li>
                                                    <li className="text-center ps-3">
                                                        <h6>Success Tests</h6>
                                                        <p className="mb-0">206</p>
                                                    </li>
                                                    <li className="text-center ps-3">
                                                        <h6>Failed Tests</h6>
                                                        <p className="mb-0">100</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Col lg={12}>
                                <Card>
                                    <Card.Body  className=" p-0">
                                        <div className="user-tabing p-3">
                                            <div style={{marginLeft: "50px !important"}} className="d-flex flex-wrap align-items-center justify-content-between">
                                                <Nav variant="pills" className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-100">
                                                    <Col style={{marginLeft: "50px !important"}} sm={4}>
                                                        <Nav.Link  eventKey="first" role="button">All Tests</Nav.Link>
                                                    </Col>
                                                    {(currentConnectedUser.role === "expert") ? (
                                                        <>
                                                        <Col style={{marginLeft: "50px !important"}} sm={4}>
                                                            <Nav.Link eventKey="second" role="button">My Tests</Nav.Link>
                                                        </Col>
                                                        </>
                                                    ):(
                                                        <>
                                                        </>
                                                    )}
                                                    <Col style={{marginLeft: "50px !important"}} sm={4}>
                                                        <Nav.Link eventKey="third" role="button">Tests Taken</Nav.Link>
                                                    </Col>
                                                </Nav>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>                        
                                <Tab.Content className="forum-content">
                                    <Tab.Pane eventKey="first" > 
                                        <Card> 
                                            <Card.Body className="p-0">
                                                <Table responsive className="forum-table mb-0 rounded">
                                                    <thead className="bg-primary text-white">
                                                        <tr>
                                                            <th>Tests</th>
                                                            <th>Owner</th>
                                                            <th>Timer</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {testsDataArray.map((singleTest, indexTest) => (
                                                            ( !singleTest.listOfSubcribed.includes(currentConnectedUser._id) && singleTest.testOwner !== currentConnectedUser._id) ? (
                                                                <>
                                                                <tr>
                                                                    <td className="col-lg-4">
                                                                        <div className="d-flex align-items-center">
                                                                            {/** insert test image here */}
                                                                            <img loading="lazy" className="img-fluid rounded-circle avatar-40" src={user01} alt=""/>
                                                                            <div className="media-body ms-3">
                                                                                <h6 className="mb-0">{singleTest.testTitle}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="col-lg-2">
                                                                        {Object.entries(ownersData).find(([id]) => id === singleTest.testOwner.toString())}
                                                                    </td>
                                                                    <td className="col-lg-2">
                                                                        {singleTest.testTimer} minutes
                                                                    </td>
                                                                    <td className="col-lg-4">
                                                                        <button onClick={(e) => handleClickApplyTest(singleTest._id)} type="submit" className="btn btn-primary d-block w-100">
                                                                            Apply Test
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                </>
                                                            ) : (
                                                                <>
                                                                </>
                                                            )
                                                            
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body> 
                                        </Card>
                                    </Tab.Pane>


                                    <Tab.Pane eventKey="second"> 
                                        <Card> 
                                            <Card.Body className="p-0">
                                                <Table responsive className="forum-table mb-0 rounded">
                                                    <thead className="bg-primary text-white">
                                                        <tr>
                                                            <th>Tests</th>
                                                            <th>Owner</th>
                                                            <th>Timer</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {testsDataArray.map( (singleTest, indexTest) => (
                                                            ( singleTest.testOwner == currentConnectedUser._id) ? (
                                                                <>
                                                                <tr>
                                                                    <td className="col-lg-4">
                                                                        <div className="d-flex align-items-center">
                                                                            {/** insert test image here */}
                                                                            <img loading="lazy" className="img-fluid rounded-circle avatar-40" src={user01} alt=""/>
                                                                            <div className="media-body ms-3">
                                                                                <h6 className="mb-0">{singleTest.testTitle}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="col-lg-2">
                                                                        {Object.entries(ownersData).find(([id]) => id === singleTest.testOwner.toString())}
                                                                    </td>
                                                                    <td className="col-lg-2">
                                                                        {singleTest.testTimer} minutes
                                                                    </td>
                                                                    <td className="col-lg-4">
                                                                    <Link to={"/updateTest/"+singleTest._id}>
                                                                        <button type="submit" className="btn btn-primary d-block w-100">
                                                                            Update
                                                                        </button>
                                                                    </Link>
                                                                    </td>
                                                                </tr>
                                                                </>
                                                            ): (
                                                                <>
                                                                </>
                                                            )
                                                        ))}
                                                        
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>


                                    <Tab.Pane eventKey="third" > 
                                        <Card> 
                                            <Card.Body>
                                                <Table responsive="lg" className="forum-table mb-0 rounded" >
                                                    <thead className="bg-primary text-white">
                                                        <tr>
                                                            <th>Tests</th>
                                                            <th>OWNER</th>
                                                            <th>TIMER</th>
                                                            <th>ACTIONS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {testsDataArray.map( (singleTest, indexTest) => ( 
                                                            (singleTest.listOfSubcribed.includes(currentConnectedUser._id) ? (
                                                                <>
                                                                <tr>
                                                                    <td className="col-lg-4">
                                                                        <div className="d-flex align-items-center">
                                                                            {/** insert test image here */}
                                                                            <img loading="lazy" className="img-fluid rounded-circle avatar-40" src={user09} alt=""/>
                                                                            <div className="media-body ms-3">
                                                                                <h6 className="mb-0">{singleTest.testTitle}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="col-lg-2">
                                                                        {Object.entries(ownersData).find(([id]) => id === singleTest.testOwner.toString())}
                                                                    </td>
                                                                    <td className="col-lg-2">
                                                                        {singleTest.testTimer} minutes
                                                                    </td>
                                                                    <td className="col-lg-4">
                                                                        <Link to={"/takeTest/"+singleTest._id}>
                                                                            <button type="submit" className="btn btn-primary d-block w-100">
                                                                                Take Test
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                </>
                                                            ): (
                                                                <>
                                                                </>
                                                            ) )
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Tab.Container>
                    </Row>
                </Container>
            </>
        )
    }else{
        return(
            <>
            LOAAAAADDIIIIIIING
            </>
        )
    }
}

export default ProfileForums;