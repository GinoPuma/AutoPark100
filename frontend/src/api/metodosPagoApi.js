import axios from "axios";

const API_URL = "http://localhost:3000/api/metodos-pago";

export const getMetodosPago = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data.metodosPago || res.data;
};

export const createMetodoPago = async (metodo) => {
  const res = await axios.post(API_URL, metodo, { withCredentials: true });
  return res.data;
};

export const updateMetodoPago = async (id, metodo) => {
  const res = await axios.put(`${API_URL}/${id}`, metodo, { withCredentials: true });
  return res.data;
};

export const deleteMetodoPago = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};
