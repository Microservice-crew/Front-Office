import React, {useState, useEffect} from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';




// imports 

//



const CourseComponent = (props) => {

    //general variables
    const API_URL = "http://127.0.0.1:9000/courses/";
    const userData = localStorage.getItem('myData');
    const userId = JSON.parse(userData).user._id;
    const idCourse = useParams().id;
    const [chaptersArrayLength, setChaptersArrayLenght] = useState();
    const navigate = useNavigate();

    //this is for the progress bar next and back etc..
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    
    //##################################################


    //this useEffect is for fetching the object course From DB
    const [courseTitle, setCourseTitle] =useState(); //course Title
    const [chaptersArray, setChaptersArray] = useState(); //Array contains all the chapters Data
    const [courseContent, setCourseContent] = useState(); //Object Course from DB
    const [indexCurrentChapter, setIndexCurrentChapter] = useState(0); //Index of the chapter of the page
    //JSON object contains all the data of the course
    const [courseData, setCourseData] = useState({
        courseName: '',
        courseDescription: '',
        courseContent: [],
        coursePhoto: null,
        courseOwner: '',
    }); 
    useEffect(() => {
        const fetchCourseData = async () => {
            await axios.get(API_URL+"getCourseById/"+idCourse).then(
                (result) => {
                    setCourseContent(result.data);
                    setCourseTitle(result.data.courseName);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        };
        fetchCourseData();
    }, [])
    //this useEffect is for fetching all the data of the course (even chapters/parags)
    useEffect(() => {
        const fetchChapterData = async () => {
            const chapterPromises = courseContent.courseContent.map((chapterId) => {
                return axios.get(API_URL+"getChapterById/"+chapterId);
            });
    
            const chapterResponses = await Promise.all(chapterPromises);
            const chapterData = chapterResponses.map((chapterResponse) => chapterResponse.data);
            setChaptersArray(chapterData);
            setChaptersArrayLenght(chaptersArray.length);

            const cours = {
                courseName: courseContent.courseName,
                courseDescription: courseContent.courseDescription,
                coursePhoto: courseContent.coursePhoto,
                courseOwner: courseContent.courseOwner,
                courseContent: chapterData.map((chapter) => ({
                    chapterTitle: chapter.chapterTitle,
                    chapterParagraphs: chapter.chapterParagraphs.map((parag) => ({
                        paragraphTitle: parag.paragraphTitle,
                        paragraphContent: parag.paragraphContent,
                        paragraphVideos: parag.paragraphVideos,
                        paragraphImages: parag.paragraphImages
                    })),
                })),
            };
            setCourseData(cours);
        };

        if(courseContent){
            fetchChapterData();
        }
    }, [courseContent,chaptersArray])
    //this useEffect is to fetch the ProgressChapter data and set it to indexCurrentChapter
    useEffect(() => {
        const fetchProgressionData = async () => {
            await axios.get(API_URL+"getProgression/"+idCourse+"/"+userId).then(
                (result) => {
                    setIndexCurrentChapter(result.data[0].chapterProgression -1)
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        };
        fetchProgressionData();
    },[indexCurrentChapter]);

    const handleNext = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(chaptersArrayLength-1>indexCurrentChapter){
            setIndexCurrentChapter(indexCurrentChapter+1);
            await axios.put(API_URL+"updateProgression/"+idCourse+"/"+userId,{
                typeOfUpdate: 1
            });
        }else if (chaptersArrayLength-1 === indexCurrentChapter){
            navigate("/Quizzzz/"+idCourse);
        }else{
            navigate("/Error");
        }
    };
    const handleBack = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if(indexCurrentChapter>=1){
            setIndexCurrentChapter(indexCurrentChapter-1);
            await axios.put(API_URL+"updateProgression/"+idCourse+"/"+userId,{
                typeOfUpdate: -1
            });
        }else{
            navigate("/Error");
        }
    };

    if(courseData && chaptersArray){
        //verify if the current user connected is subscribed to the course
        if(indexCurrentChapter<0){
            navigate("/error")
        }
        else if(courseContent.courseSubcribed.includes(userId)){
            return(
                <>
                <div id='content-page' className='content-page'>
                    <Container>
                        <Row>
                            <Col sm="200" lg="25">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h2 className="card-title"><strong>Course : </strong>{courseTitle}</h2>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                
                                        {/** this is the bar of next and back */}
                                            <MobileStepper
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                variant="progress"
                                                steps={chaptersArrayLength} //lahne l nombre de chapitre 
                                                position="static"
                                                activeStep={activeStep}
                                                
                                            />
                                        {/** ends here */}
                                    
                                    
                                            <h3><strong>Chapter : </strong>{chaptersArray[indexCurrentChapter].chapterTitle}</h3>
                                    
                                        
                                        {/** this is where it begins the parags details and course details */}
                                            <Box
                                                component="main"
                                                sx={{ flexGrow: 1, p: 3, width: { sm: `100% px` } }}
                                            >
                                                <Toolbar />
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography paragraph>  {/** S mapping the chapter's parag */}
                                                            {chaptersArray[indexCurrentChapter].chapterParagraphs.map(
                                                                (paragraph,indexParagraph) => (
                                                                    <>
                                                                    <h5><u><strong>Pragraph title : </strong>{paragraph.paragraphTitle}</u></h5>
                                                                    <p><em>{paragraph.paragraphContent}</em></p>
                                                                    </>
                                                                )
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ width: '100%', maxWidth: 200, bgcolor: '#f8f9fa', textDecorationThickness:"4" }}>
                                                        <nav aria-label="secondary mailbox folders">
                                                            <List>
                                                                    {chaptersArray.map(
                                                                        (chapter,indexChapter) => (
                                                                            <>
                                                                            <ListItem disablePadding>
                                                                                <ListItemText primary={`${indexChapter+1}. ${chapter.chapterTitle}`} />
                                                                                <br/>
                                                                            </ListItem>
                                                                            </>
                                                                        )
                                                                    )}
                                                            </List>
                                                        </nav>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        {/**ends here */}
                                    
                                    
                                        {/** this is the bar of next and back */}
                                            <MobileStepper
                                                variant="progress"
                                                steps={chaptersArrayLength} //lahne l nombre de chapitre 
                                                position="static"
                                                activeStep={activeStep}
                                                nextButton={
                                                    <Button size="small" onClick={handleNext} disabled={activeStep === {chaptersArrayLength}}> {/*lahne nombre chapitre -1*/}
                                                        Next
                                                        {theme.direction === 'rtl' ? (
                                                            <KeyboardArrowLeft />
                                                        ) : (
                                                            <KeyboardArrowRight />
                                                        )}
                                                    </Button>
                                                }
                                                backButton={
                                                    <Button size="small" onClick={handleBack} >
                                                        {theme.direction === 'rtl' ? (
                                                            <KeyboardArrowRight />
                                                        ) : (
                                                            <KeyboardArrowLeft />
                                                        )}
                                                            Back
                                                    </Button>
                                                }
                                            />
                                        {/** ends here */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                </>
            )
        }else{
            return(
                <>
                <Container>
                    <h2>You're not subscribed to this course. go back to <Link to="/dashboards/app/profile-events">courses list</Link></h2>
                </Container>
                </>
            );
        }
    }else{
        return(
            <>
            <Container>
                LOAAAAAAAADIIIING... if it took too long : <Link to={"/home"}>Home</Link>
            </Container>
            </>
        )
    }
}

export default CourseComponent;