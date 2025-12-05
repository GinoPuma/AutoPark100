import axios from "axios";

const API_URL = "http://localhost:3000/api/pagos";

export const getPagos = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data.pagos || res.data;
};

export const createPago = async (pago) => {
  const res = await axios.post(API_URL, pago, { withCredentials: true });
  return res.data;
};

export const updatePago = async (id, pago) => {
  const res = await axios.put(`${API_URL}/${id}`, pago, { withCredentials: true });
  return res.data;
};

export const deletePago = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};
