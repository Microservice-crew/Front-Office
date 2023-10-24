import AxiosInstance from "../utils/axiosInstance3";

export const addFlight = async (flight) => {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await AxiosInstance.post("/flight/add", flight, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const getAllFlights = async () => {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const response = await AxiosInstance.get("/flight/all", config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const getOneFlight = async (idFlight) => {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    console.log(idFlight);
    try {
        const response = await AxiosInstance.get(`/flight/${idFlight}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const updateFlight = async (idFlight, flight) => {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await AxiosInstance.put(`/flight/update/${idFlight}`, flight, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteFlight = async (id) => {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const response = await AxiosInstance.delete(`/flight/delete/${id}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};
