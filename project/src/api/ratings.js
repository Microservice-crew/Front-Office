import AxiosInstance from "../utils/axiosInstance";

export const addOffer = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    
    const response = await AxiosInstance.post("/offer", values, config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getReletedCompany=async()=>{
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    
    const response = await AxiosInstance.get("/ratings/releted", config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}