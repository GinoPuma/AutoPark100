import axios from "axios";

const API_URL = "http://localhost:3000/api/espacios";

// ✅ Obtener todos los espacios
export const getEspacios = async () => {
  const res = await axios.get(API_URL, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data.espacios || res.data;
};

// ✅ Crear un nuevo espacio
export const createEspacio = async (espacio) => {
  const res = await axios.post(API_URL, espacio, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data;
};

// ✅ Actualizar un espacio existente
export const updateEspacio = async (id, espacio) => {
  const res = await axios.put(`${API_URL}/${id}`, espacio, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data;
};

// ✅ Eliminar un espacio
export const deleteEspacio = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true }); // 🔒 incluye cookie JWT
  return res.data;
};
