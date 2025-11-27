import axios from "axios";

const API_URL = "http://localhost:3000/api/tickets";

// ✅ Obtener todos los tickets
export const getTickets = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data.tickets || res.data;
};

// ✅ Crear un ticket
export const createTicket = async (ticketData) => {
  const res = await axios.post(API_URL, ticketData, { withCredentials: true });
  return res.data;
};

// ✅ Actualizar un ticket
export const updateTicket = async (id, ticketData) => {
  const res = await axios.put(`${API_URL}/${id}`, ticketData, {
    withCredentials: true,
  });
  return res.data;
};

// ✅ Eliminar un ticket
export const deleteTicket = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
