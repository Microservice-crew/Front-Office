import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import {Row, Col, Form, Container, Card} from 'react-bootstrap';
import { List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';




const TestComponent = () => {

    //general variables
    const userData = localStorage.getItem('myData');
    const currentConnectedUser = JSON.parse(userData).user;
    const currentConnectedToken = JSON.parse(userData).token;
    const idTest = useParams().id;
    const API_url = "http://127.0.0.1:9000/tests/";

    const navigate = useNavigate();

    //states
    const [testData, setTestData] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [indexCurrentQuestion, setIndexCurrentQuestion] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionsArray, setQuestionArray] = useState(null);
    


    useEffect(() => {
        const fetchTestData = async () => {
            const test = await axios.get(API_url+"getTestDataById/"+idTest);
            setTestData(test.data);
        }
        fetchTestData()
    },[])
    //fetch the question when the indexCurrentQuestion changes
    useEffect(() => {
        if(testData){
            setQuestionArray(testData.listOfQuestions);
        }
        
    },)
    
    

    if(testData && questionsArray){
        questionsArray[indexCurrentQuestion].suggestedResponse.map((s,i)=>{

        })

        return(
            <>
                <div id='content-page' className='content-page'>
                    <Container>
                        <Row>
                            <Col sm="200" lg="25">
                                <Card>
                                    <h1>Test : {testData.testTitle}</h1>
                                    {/** this is the bar of next and back */}
                                        <MobileStepper
                                            style={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            variant="progress"
                                            steps={testData.listOfQuestions.length} //lahne l nombre de questions 
                                            position="static"
                                            activeStep={activeStep} //lahne tzid +1 kol next button submited
                                        />
                                    {/** ends here */}

                                    <h3>{testData.listOfQuestions[indexCurrentQuestion].questionTitle}</h3>
                                    <br></br>
                                    {questionsArray[indexCurrentQuestion].suggestedResponse.map(
                                        (suggestedResponse, indexSuggestedResponse) => (
                                            <>
                                            <Form.Check className="d-block">
                                                <Form.Check.Input type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>{' '}
                                                <Form.Check.Label>
                                                    <h4>{suggestedResponse}</h4>
                                                </Form.Check.Label>
                                            </Form.Check>
                                            </>
                                        )
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }else{
        return (
            <>
            LOAAAADIIIING
            </>
        )
    }


        // if(indexCurrentQuestion<0){
    //     navigate("/error")
    // }else if(testData.listOfSubcribed.includes(currentConnectedUser._id)){
    //     return(
    //         <>
    //         <div id='content-page' className='content-page'>
    //             <Container>
    //                 <Row>
    //                     <Col sm="200" lg="25">
    //                         <Card>
    //                             hello world
    //                         </Card>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         </div>
    //         </>
    //     )
    // }else{
    //     return(
    //         <>
    //         <Container>
    //             <h2>You're not subscribed to this test. go back to <Link to="dashboard/app/profile-forum">tests list</Link></h2>
    //         </Container>
    //         </>
    //     );
    // }
    
}


export default TestComponent;