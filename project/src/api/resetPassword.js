import AxiosInstance from "../utils/axiosInstance";
export const sendResetPasswordEmail = async (values) => {
  try {
    console.log(values);
    const response = await AxiosInstance.get(
      `/auth/restPasswordMail/${values.email}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const resetPassword = async (values, token) => {
  try {
    const response = await AxiosInstance.put(
      `/auth/reset/password/${token}`,
      values
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const changePassword = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(`/user/password`, values, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
