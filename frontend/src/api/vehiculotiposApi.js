    import axios from "axios";

const API_URL = "http://localhost:3000/api/vehiculotipos"; 

// Obtener todos los tipos de vehículo
export const getVehiculotipos = async () => {
  const res = await axios.get(API_URL, { withCredentials: true }); // 👈 incluye cookie de sesión
  return res.data;
};

// Crear un tipo de vehículo (solo administrador)
export const createVehiculotipo = async (vehiculotipo) => {
  const res = await axios.post(API_URL, vehiculotipo, { withCredentials: true });
  return res.data;
};

// Actualizar un tipo de vehículo
export const updateVehiculotipo = async (id, vehiculotipo) => {
  const res = await axios.put(`${API_URL}/${id}`, vehiculotipo, { withCredentials: true });
  return res.data;
};

// Eliminar un tipo de vehículo
export const deleteVehiculotipo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

// Obtener un tipo de vehículo por ID (opcional)
export const getVehiculotipoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};
