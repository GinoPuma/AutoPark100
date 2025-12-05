const { calcularTarifa } = require("./tarifa.service");
const db = require("../models");

async function cerrarTicket(ticketId) {
  const id = Number(ticketId);

  if (isNaN(id)) {
    throw new Error("El ID del ticket no es válido");
  }

  const ticket = await db.Ticket.findByPk(id);

  if (!ticket) {
    throw new Error("Ticket no encontrado");
  }

  const tarifa = await db.Tarifa.findByPk(ticket.tarifa_id);
  if (!tarifa) {
    throw new Error("Tarifa no encontrado");
  }

  const salida = new Date();
  const dataTicket = {
    tipo: tarifa.tipo_tarifa,
    entrada: ticket.fecha_entrada,
    salida: salida,
    precio: tarifa.precio,
  };

  const total = calcularTarifa(dataTicket);

  ticket.fecha_salida = salida;
  ticket.monto_total = total;
  ticket.estado = "CERRADO";

  await ticket.save();

  return {
    ticketId: id,
    entrada: dataTicket.entrada,
    salida: dataTicket.salida,
    tipo: dataTicket.tipo,
    total,
  };
}

module.exports = { cerrarTicket };
