import axios from "axios";

const API_URL = "http://localhost:3000/api/vehiculos";

export const getVehiculos = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return Array.isArray(res.data) ? res.data : res.data.vehiculos || [];
};

export const createVehiculo = async (vehiculo) => {
  const res = await axios.post(API_URL, vehiculo, { withCredentials: true });
  return res.data;
};

export const updateVehiculo = async (id, vehiculo) => {
  const res = await axios.put(`${API_URL}/${id}`, vehiculo, { withCredentials: true });
  return res.data;
};

export const deleteVehiculo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};
