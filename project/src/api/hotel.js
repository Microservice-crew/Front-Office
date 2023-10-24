import AxiosInstance from "../utils/axiosInstance2";

export const addHotel = async (hotel) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await AxiosInstance.post("/hotel/creer", hotel, config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllHotels = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/hotel/all", config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getOneHotel = async (idHotel) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(idHotel);
  try {
    const response = await AxiosInstance.get(`/hotel/${idHotel}`, config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteHotel = async (idHotel) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.delete(
      `/hotel/supprimer/${idHotel}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const addChambre = async (chambre) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await AxiosInstance.post(
      "/chambre/creer",
      chambre,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};


export const getAllChambres = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/chambre/all", config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Adapt the other functions for updating and deleting hotels as needed.
