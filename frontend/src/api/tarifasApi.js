import axios from "axios";

const API_URL = "http://localhost:3000/api/tarifas"; 

export const getTarifas = async () => {
  const res = await axios.get(API_URL, { withCredentials: true }); // 👈 cookie incluida
  return res.data.tarifas || res.data;
};

export const createTarifa = async (tarifa) => {
  const res = await axios.post(API_URL, tarifa, { withCredentials: true }); // 👈 cookie incluida
  return res.data;
};

export const updateTarifa = async (id, tarifa) => {
  const res = await axios.put(`${API_URL}/${id}`, tarifa, { withCredentials: true }); // 👈 cookie incluida
  return res.data;
};

export const deleteTarifa = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true }); // 👈 cookie incluida
  return res.data;
};
