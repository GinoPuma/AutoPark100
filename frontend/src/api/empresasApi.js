import axios from "axios";

const API_URL = "http://localhost:3000/api/empresas"; 

// ✅ Obtener todas las empresas
export const getEmpresas = async () => {
  const res = await axios.get(API_URL, { withCredentials: true }); // incluye cookie JWT
  return res.data.empresas || res.data;
};

// ✅ Crear una nueva empresa
export const createEmpresa = async (empresa) => {
  const res = await axios.post(API_URL, empresa, { withCredentials: true }); // incluye cookie JWT
  return res.data;
};

// ✅ Actualizar una empresa existente
export const updateEmpresa = async (id, empresa) => {
  const res = await axios.put(`${API_URL}/${id}`, empresa, { withCredentials: true }); // incluye cookie JWT
  return res.data;
};

// ✅ Eliminar una empresa
export const deleteEmpresa = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true }); // incluye cookie JWT
  return res.data;
};
