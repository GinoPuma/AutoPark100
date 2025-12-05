import axios from "axios";

const API_URL = "http://localhost:3000/api/vehiculo-tipos";

export const getVehiculotipos = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

export const createVehiculotipo = async (vehiculotipo) => {
  const res = await axios.post(API_URL, vehiculotipo, { withCredentials: true });
  return res.data;
};

export const updateVehiculotipo = async (id, vehiculotipo) => {
  const res = await axios.put(`${API_URL}/${id}`, vehiculotipo, { withCredentials: true });
  return res.data;
};

export const deleteVehiculotipo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

export const getVehiculotipoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};
