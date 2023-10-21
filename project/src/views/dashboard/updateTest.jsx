import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


import {Row, Col, Form, Container, Card} from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { Padding } from '@mui/icons-material';

const UpdateTestComponent = () => {
    const navigate = useNavigate();
    const userData = localStorage.getItem("myData");
    const token = JSON.parse(userData).token;
    const user = JSON.parse(userData).user;
    const API_url = 'http://127.0.0.1:9000/tests/';
    const idTest = useParams().id;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
    const [testToUpdateData, setTestToUpdateData] = useState(null);
    const [questionData, setQuestionData] = useState("");
    const [suggestionData1, setSuggestionData1] = useState("");
    const [suggestionData2, setSuggestionData2] = useState("");
    const [suggestionData3, setSuggestionData3] = useState("");
    const [suggestionData4, setSuggestionData4] = useState("");
    const [selectionOption, setSelectionOption] = useState("");

    const [testData, setTestData] = useState({
        testTitle: "",
        testDescription: "",
        listOfQuestions: [
            {
                questionTitle: "",
                suggestedResponse: [],
                correctResponse: "",
            }
        ],
    })

    //this is the handler of the button delete of a question 
    //bug here it always deletes the last element
    const handleDeleteQuestion = (index) => {
        let questionsArray = testData.listOfQuestions;
        questionsArray.splice(index,1);
        setTestData({
            ...testData,
            listOfQuestions: questionsArray
        });
        if(testData.listOfQuestions.length === 1){
            setDeleteButtonDisabled(true);
        }
    }
    //this is the handler of the button add question
    const handleAddQuestion = () => {
        let newQuestion = {
            questionTitle: "",
            suggestedResponse: [],
            correctResponse: "",
        };
        testData.listOfQuestions.push(newQuestion);
        setTestData({...testData, listOfQuestions: testData.listOfQuestions});
    };
    //this is the handler of the changes in the TEST inputs fields (title, descript, timer...)
    const handleInputTest = (event) => {
        const {name, value} = event.target;
        setTestData({
            ...testData,
            [name]:value
        })
    };
    //this is the handler of the changes in the title of a question
    const handleQuestionTitleInputChange = (event, index) => {
        let questionsArray = testData.listOfQuestions;
        setQuestionData(event.target.value);
        questionsArray[index].questionTitle = questionData;
    };
    //this is the handler of the changes in the suggestions inputs fields
    const handleSuggestionInputChange = (event, index) => {
        const {name, value} = event.target;
        let questionsArray = testData.listOfQuestions;
        (name === "suggestionData1") ? ( setSuggestionData1(value) ) 
            : ( name === "suggestionData2" ) ? ( setSuggestionData2(value) )
            : ( name === "suggestionData3" ) ? ( setSuggestionData3(value) )
            : ( setSuggestionData4(value) );
        questionsArray[index].suggestedResponse = [suggestionData1, suggestionData2, suggestionData3, suggestionData4];

    };
    //this is the handler of the changes in the select fieldç
    const handleSelectChange = (event, index) => {
        setSelectionOption(event.target.value);
        const correctAnswer = testData.listOfQuestions[index].suggestedResponse[event.target.value -1];
        testData.listOfQuestions[index].correctResponse = correctAnswer;
    };
    //this is the handler when the button submit is clicked 
    const submitData = (event) => {
        const myForm = document.getElementById("myForm");
        if( myForm.checkValidity() ){
            axios.put(API_url+"updateTestById/"+idTest, { updatedTest: testData }, config).then(
                (result) => {
                    console.log("success");
                }
            ).catch( (error) => {
                    console.log("error"+ error);
            });
        }else{
            console.log("form invalid");
            console.log(myForm)
        }
    }

    //this is where I get and store testToUpdateData
    useEffect(() => {
        const fetchTestToUpdateData = async () => {
            const test = await axios.get(API_url+"getTestDataById/"+idTest);
            setTestToUpdateData(test.data);
            setTestData(test.data);
        }
        fetchTestToUpdateData()
    },[]);



    if(testToUpdateData){
        console.log(testData)
        return(
            <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="200" lg="25">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Test by DJA</h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <form id ="myForm">

                                        <Form.Group className="form-group">
                                            <Form.Label>Test Title </Form.Label>
                                            <Form.Control
                                                name='testTitle'
                                                type="text"
                                                defaultValue={testData.testTitle}
                                                required
                                                onChange={handleInputTest}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Test Description</Form.Label>
                                            <Form.Control
                                                name='testDescription'
                                                as="textarea"
                                                rows="5"
                                                defaultValue={testData.testDescription}
                                                onChange={handleInputTest}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label >Test Time</Form.Label>
                                            <Form.Control
                                                name='testTimer'
                                                type="time"
                                                defaultValue={`00:${testData.testTimer}`}
                                                onChange={handleInputTest}
                                                required
                                            />
                                        </Form.Group>

                                        <Divider style={{ margin: "13px 1px" }} variant="middle" />
                                        {testData.listOfQuestions.map((question, indexQuestion) => (
                                            <>
                                            <Form.Group className="form-group">
                                                <Form.Label>Question {indexQuestion+1}</Form.Label>
                                                <Form.Control
                                                    name={`question${indexQuestion}`}
                                                    as="textarea"
                                                    rows="3"
                                                    defaultValue={question.questionTitle}
                                                    required
                                                    onChange={(event) => handleQuestionTitleInputChange(event, indexQuestion)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Suggestion 1 </Form.Label>
                                                <Form.Control
                                                    name='suggestionData1'
                                                    type="text"
                                                    required
                                                    placeholder="Enter Suggestion 1"
                                                    defaultValue={question.suggestedResponse[0]}
                                                    onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Suggestion 2 </Form.Label>
                                                <Form.Control
                                                    name='suggestionData2'
                                                    type="text"
                                                    placeholder="Enter Suggestion 2"
                                                    defaultValue={question.suggestedResponse[1]}
                                                    required
                                                    onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>suggestion 3 </Form.Label>
                                                <Form.Control
                                                    name='suggestionData3'
                                                    type="text"
                                                    placeholder="Enter Suggestion 3"
                                                    defaultValue={question.suggestedResponse[2]}
                                                    required
                                                    onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Suggestion 4 </Form.Label>
                                                <Form.Control
                                                    name='suggestionData4'
                                                    type="text"
                                                    placeholder="Enter Suggestion 4"
                                                    defaultValue={question.suggestedResponse[3]}
                                                    required
                                                    onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Correct Answer</Form.Label>
                                                <select
                                                    key={indexQuestion}
                                                    className="form-select mb-3 shadow-none"
                                                    value={selectionOption}
                                                    onChange={(event) => handleSelectChange(event, indexQuestion)}
                                                >
                                                    <option defaultValue={"0"}></option>
                                                    <option value="1">{question.suggestedResponse[0]}</option>
                                                    <option value="2">{question.suggestedResponse[1]}</option>
                                                    <option value="3">{question.suggestedResponse[2]}</option>
                                                    <option value="4">{question.suggestedResponse[3]}</option>
                                                </select>
                                            </Form.Group>
                                            <Button
                                                style={{marginBottom: "10px"}}
                                                disabled={deleteButtonDisabled}
                                                variant="contained" 
                                                startIcon={<DeleteIcon />}
                                                onClick={(event) => {handleDeleteQuestion(indexQuestion)}}
                                            >
                                                Delete
                                            </Button>
                                            <Divider style={{ margin: "13px 1px" }} variant="middle" />
                                        
                                            </>
                                        ))}
                                        
                                        
                                        <Button
                                            variant="contained" 
                                            startIcon={<AddIcon />}
                                            onClick={handleAddQuestion}
                                        >
                                            Add question
                                        </Button>

                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Button variant="contained" color="success" 
                    onClick={submitData}
                    >
                        submit
                    </Button>
                </Container>
            </div>
            </>
        )
    }else{
        return(
            <>
            <Container>
                LOAAAADIIIIING
            </Container>
            </>
        )
    }
};

export default UpdateTestComponent;