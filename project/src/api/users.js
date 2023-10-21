import axios from "axios";
import axiosInstance from "../utils/axiosInstance.js";

export const updateScoreUser = async (userId, Score) => {
  try {
    const token = JSON.parse(localStorage.getItem("myData")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    };
    const response = await axios.put(
      `http://localhost:9000/user/updateScore/${userId}`,
      config,
      parseInt(Score)
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getOneCompanies = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("myData")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    };
    const response = await axios.get(
      `http://localhost:9000/user/companies/${userId}`,
      config
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getOneUser = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("myData")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    };
    const response = await axios.get(
      `http://localhost:9000/user/user/${userId}`,
      config
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
