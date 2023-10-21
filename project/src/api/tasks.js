import AxiosInstance from "../utils/axiosInstance";

export const addTasks = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await AxiosInstance.post("/tasks/", values, config);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAlltasks = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/tasks/all", config);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getOnetask = async (taskId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get(
      `/tasks/oneTask/${taskId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const applytask = async (taskId, userId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const values = {
    id: userId,
  };
  try {
    const response = await AxiosInstance.put(
      `/tasks/apply/${taskId}/${userId}`,
      values,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const unApplytask = async (taskId, userId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;
  const values = {
    id: userId,
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(
      `/tasks/unapply/${taskId}/${userId}`,
      values,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOwntasks = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/tasks/company", config);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const edittask = async (id, values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(
      `/tasks/update/${id}`,
      values,
      config
    );
    console.log(response);
    window.location.reload();

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deletetask = async (id) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.delete(`/tasks/${id}`, config);
    console.log(response);
    window.location.reload();

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getAppliers = async (taskId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get(
      `/tasks/appliers/${taskId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateUri = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    console.log(values);
    const response = await AxiosInstance.put(
      `/tasks/updateuri/${values.id}`,
      { body: { uri: values.url, user: values.user } },
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
