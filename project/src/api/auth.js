import AxiosInstance from "../utils/axiosInstance";
export const login = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/signIn", values);
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const registerUser = async (values) => {
  try {
    console.log("registre hhhh");
    console.log(values);
    const response = await AxiosInstance.post("/auth/user", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const registerCompany = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/company", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerExpert = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/expert", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateProfile = async (id, values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(`/user/${id}`, values, config);
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: { ...user, ...response.data } };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updatePicture = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await AxiosInstance.put(`/user/picture`, values, config);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    window.location.reload();
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateProfilePicture = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await AxiosInstance.put(
      `/user/coverPhoto`,
      values,
      config
    );
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    window.location.reload();
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateCv = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await AxiosInstance.put(`/user/cv`, values, config);
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const UpdateExperience = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(
      `/user/experience`,
      values,
      config
    );
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const UpdateStudyCarrier = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(`/user/education`, values, config);
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const UpdateSkill = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(`/user/skill`, values, config);
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const UpdateCertificate = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await AxiosInstance.put(
      `/user/certification`,
      values,
      config
    );
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateProfileCompanyPicture = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await AxiosInstance.put(
      `/user/companyProfile`,
      values,
      config
    );
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    window.location.reload();
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const updateProfileCompanyCover = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await AxiosInstance.put(
      `/user/companyCover`,
      values,
      config
    );
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: response.data };
    localStorage.setItem("myData", JSON.stringify(data));
    window.location.reload();
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
