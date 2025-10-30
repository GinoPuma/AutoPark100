import axios from "axios";

const API_URL = "http://localhost:3000/api/sedes";

// ✅ Obtener todas las sedes
export const getSedes = async () => {
  const res = await axios.get(API_URL, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data.sedes || res.data;
};

// ✅ Crear una nueva sede
export const createSede = async (sede) => {
  const res = await axios.post(API_URL, sede, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data;
};

// ✅ Actualizar una sede existente
export const updateSede = async (id, sede) => {
  const res = await axios.put(`${API_URL}/${id}`, sede, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data;
};

// ✅ Eliminar una sede
export const deleteSede = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data;
};
