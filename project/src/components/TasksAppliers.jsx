import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAppliers, getOnetask } from "../api/tasks";
import { Box, Grid } from "@material-ui/core";
import { Formik } from "formik";
import { Stack } from "@mui/material";
import { updateScoreUser } from "../api/users";
import { scoreValidation } from "../schemas/user.schema.jsx";
import axiosInstance from "../utils/axiosInstance.jsx";
import { Verified } from "@mui/icons-material";

const TasksAppliers = ({ data, pageSize, role, confirm }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState([]);
  const pageCount = Math.ceil(users.length / pageSize);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliers, setAplliers] = useState();

  const { taskId } = useParams();

  const initialValues = {
    Score: 0,
  };
  const [A, setA] = useState(true);
  const [B, setB] = useState(true);
  const [C, setC] = useState(true);
  const [D, setD] = useState(true);
  const [E, setE] = useState(true);
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleAplliers = async () => {
    const response = await getAppliers(taskId);
    setAplliers(response);
  };

  const filteredData =
    appliers &&
    appliers.filter((item) => {
      return item?.user?.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  const [task, setTask] = useState({});
  const getOneTasks = async () => {
    const response = await getOnetask(taskId);
    setTask(response);
  };

  const updateScore = async (userId, score) => {
    const response = await updateScoreUser(userId, score);
    setTask(response);
  };
  const [Classment, setClassment] = useState("");
  const handelAccept = async (userId, score, Classment) => {
    const token = JSON.parse(localStorage.getItem("myData")).token;
    const values = {
      taskId: taskId,
      score: score,
      Classment: Classment,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      console.log(values);
      const response = await axiosInstance.put(
        `/tasks/accept/${taskId}/${userId}`,
        values,
        config
      );

      handleAplliers();
      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const checkClassment = (items) => {
    items?.map((item) => {
      if (item.Classment === "A") return setA(false);
      if (item.Classment === "B") return setB(false);
      if (item.Classment === "C") return setC(false);
      if (item.Classment === "D") return setD(false);
      if (item.Classment === "E") return setE(false);
    });
  };
  const [userId, setUserid] = useState();
  useEffect(() => {
    handleAplliers();
    getOneTasks();
    checkClassment(filteredData);
  }, []);
  const handleChecked = (e) => {
    e.preventDefault();
    setChecked(true);
    setUserid(e.target.value);
  };
  const renderTableData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    return (
      filteredData &&
      filteredData.map((item, index) => {
        console.log(item);
        return (
          <tr key={index}>
            <td>{item.user.fullName}</td>
            <td>{item.user.email}</td>
            <td>
              <a href={`${item.uri}`}>{item.uri}</a>
            </td>
            <td>{item.user.scoreTotal}</td>

            {!item.accepted ? (
              <td>
                {A && (
                  <Form.Check
                    inline
                    label="A"
                    name="score"
                    type="radio"
                    value={100}
                    onClick={(e) =>
                      handelAccept(item.user._id, e.target.value, "A")
                    }
                    disabled={item.accepted ? "disabled" : ""}
                  />
                )}
                {B && (
                  <Form.Check
                    inline
                    label="B"
                    name="score"
                    type="radio"
                    value={75}
                    onClick={(e) =>
                      handelAccept(item.user._id, e.target.value, "B")
                    }
                    disabled={item.accepted ? "disabled" : ""}
                  />
                )}
                {C && (
                  <Form.Check
                    inline
                    label="C"
                    name="score"
                    type="radio"
                    value={50}
                    onClick={(e) => {
                      handelAccept(item.user._id, e.target.value, "C");
                    }}
                    disabled={item.accepted ? "disabled" : ""}
                  />
                )}
                {D && (
                  <Form.Check
                    inline
                    label="D"
                    name="score"
                    type="radio"
                    value={25}
                    onClick={(e) =>
                      handelAccept(item.user._id, e.target.value, "D")
                    }
                    disabled={item.accepted ? "disabled" : ""}
                  />
                )}
                {E && (
                  <Form.Check
                    inline
                    label="E"
                    name="score"
                    type="radio"
                    value={10}
                    onClick={(e) =>
                      handelAccept(item.user._id, e.target.value, "E")
                    }
                    disabled={item.accepted ? "disabled" : ""}
                  />
                )}
              </td>
            ) : (
              <Form.Label>Verified</Form.Label>
            )}
          </tr>
        );
      })
    );
  };
  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <button key={i} onClick={() => handleClick(i)}>
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end align-items-center">
        <Col xs lg="8">
          <input
            className="my-5  w-25"
            type="text"
            placeholder="Search by Full Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Table className=" w-75 ml-9">
            <thead>
              <tr>
                <th>FullName</th>
                <th>Email</th>
                <th>GitHub URL</th>
                <th>score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </Table>
          <div>{renderPagination()}</div>
        </Col>
        <Col xs="2">
          <Card className="d-flex align-items-center justify-content-center bg-success text-center w-100 h-30">
            <Card.Header>
              <Card.Title>
                <h3>Index</h3>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <h5>ever rank here to give high score to your appliers</h5>
              <h6>nomber of days working X rank value</h6>
              <ul>
                <li>A = 100</li>
                <li>B = 75 </li>
                <li>C = 50 </li>
                <li>D = 25 </li>
                <li>E = 10 </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TasksAppliers;
