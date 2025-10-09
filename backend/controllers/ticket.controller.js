const db = require("../models");

exports.createTicket = async (req, res) => {
  try {
    const {
      espacio_id,
      vehiculo_id,
      tarifa_id,
      fecha_entrada,
      fecha_salida,
      estado,
      monto_total,
    } = req.body;

    const espacio = await db.Espacio.findByPk(espacio_id);
    const vehiculo = await db.Vehiculo.findByPk(vehiculo_id);
    const tarifa = await db.Tarifa.findByPk(tarifa_id);

    if (!espacio) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }
    if (!tarifa) {
      return res.status(404).json({ message: "Tarifa no encontrada" });
    }

    const nuevoTicket = await db.Ticket.create({
      espacio_id,
      vehiculo_id,
      tarifa_id,
      fecha_entrada,
      fecha_salida,
      estado,
      monto_total,
    });

    res.status(201).json(nuevoTicket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await db.Ticket.findAll();
    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await db.Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      espacio_id,
      vehiculo_id,
      tarifa_id,
      fecha_entrada,
      fecha_salida,
      estado,
      monto_total,
    } = req.body;
    const ticket = await db.Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    ticket.espacio_id = espacio_id || ticket.espacio_id;
    ticket.vehiculo_id = vehiculo_id || ticket.vehiculo_id;
    ticket.tarifa_id = tarifa_id || ticket.tarifa_id;
    ticket.fecha_entrada = fecha_entrada || ticket.fecha_entrada;
    ticket.fecha_salida = fecha_salida || ticket.fecha_salida;
    ticket.estado = estado || ticket.estado;
    ticket.monto_total = monto_total || ticket.monto_total;

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await db.Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }
    await ticket.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
