import AxiosInstance from "../utils/axiosInstance";

export const addOffer = async (values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.post("/offer", values, config);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllOffers = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/offer/all", config);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const applyOffer = async (offreId, userId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const values = {
    id: userId,
  };
  try {
    const response = await AxiosInstance.put(
      `/offer/apply/${offreId}/${userId}`,
      values,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const unApplyOffer = async (offreId, userId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;
  const values = {
    id: userId,
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(
      `/offer/unapply/${offreId}/${userId}`,
      values,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOwnOffers = async () => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get("/offer/company", config);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editOffer = async (id, values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(
      `/offer/update/${id}`,
      values,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteOffer = async (id) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.delete(`/offer/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getAppliers = async (offerId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.get(
      `/offer/appliers/${offerId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
