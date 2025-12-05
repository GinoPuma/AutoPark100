import axios from "axios";

const API_URL = "http://localhost:3000/api/tickets"; 

export const getEntradas = async () => {
  const res = await axios.get(API_URL);
  return res.data.tickets || res.data;
};

export const createEntrada = async (entrada) => {
  const res = await axios.post(API_URL, entrada);
  return res.data;
};

export const updateEntrada = async (id, entrada) => {
  const res = await axios.put(`${API_URL}/${id}`, entrada);
  return res.data;
};

export const deleteEntrada = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
