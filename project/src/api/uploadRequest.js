import AxiosInstance from "../utils/axiosInstance";

//export const uploadImage =(data)=>API.post('/upload/',data)
export const uploadImage = async (data) => {
  try {
    const response = await AxiosInstance.post("/upload/", data);
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const uploadPost = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await AxiosInstance.post("/post", data, config);
    console.log(response);
    window.location.reload();
    return response;
  } catch (e) {
    console.log(e);
    return;
  }
};
