import AxiosInstance from "../utils/axiosInstance4";

export const addStaff = async (staff) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await AxiosInstance.post("/add/staff", staff, config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllstaff = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/", config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Adapt the other functions for updating and deleting hotels as needed.
