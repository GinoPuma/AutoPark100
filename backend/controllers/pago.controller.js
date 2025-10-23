const db = require("../models");

exports.createPago = async (req, res) => {
  try {
    const { metodo_pago_id, ticket_id, monto, referencia } = req.body;
    if (!metodo_pago_id || !ticket_id || monto === undefined) {
      return res.status(400).json({
        message: "Campos requeridos: metodo_pago_id, ticket_id, monto.",
      });
    }

    const metodoPago = await db.MetodosPago.findByPk(metodo_pago_id);
    const ticket = await db.Ticket.findByPk(ticket_id);
    if (!metodoPago)
      return res.status(404).json({ message: "Método de pago no encontrado." });
    if (!ticket)
      return res.status(404).json({ message: "Ticket no encontrado." });

    if (ticket.estado === "cerrado" || ticket.fecha_salida) {
      return res.status(400).json({
        message: "No se pueden aplicar pagos a un ticket ya cerrado.",
      });
    }

    const nuevoPago = await db.Pago.create({
      metodo_pago_id,
      ticket_id,
      monto,
      referencia,
    });

    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error("Error al crear pago:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllPagos = async (req, res) => {
  try {
    const pagos = await db.Pago.findAll({
      include: [
        { model: db.MetodosPago, atributtes: ["metodo_pago_id", "nombre"] },
        { model: db.Ticket, atributtes: ["ticket_id", "monto_total"] },
      ],
    });
    res.status(200).json(pagos);
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await db.Pago.findByPk(id, {
      include: [
        { model: db.MetodosPago, atributtes: ["metodo_pago_id", "nombre"] },
        { model: db.Ticket, atributtes: ["ticket_id", "monto_total"] },
      ],
    });
    if (!pago) return res.status(404).json({ message: "Pago no encontrado." });
    res.status(200).json(pago);
  } catch (error) {
    console.error("Error al obtener pago:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updatePagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { metodo_pago_id, ticket_id, monto, referencia } = req.body;
    const pago = await db.Pago.findByPk(id);

    if (!pago) return res.status(404).json({ message: "Pago no encontrado." });

    if (metodo_pago_id !== undefined) {
      const metodo = await db.MetodosPago.findByPk(metodo_pago_id);
      if (!metodo)
        return res.status(404).json({
          message: "Método de pago no encontrado para la actualización.",
        });
      pago.metodo_pago_id = metodo_pago_id;
    }
    if (ticket_id !== undefined) {
      const ticket = await db.Ticket.findByPk(ticket_id);
      if (!ticket)
        return res
          .status(404)
          .json({ message: "Ticket no encontrado para la actualización." });
      pago.ticket_id = ticket_id;
    }
    if (monto !== undefined) pago.monto = monto;
    if (referencia !== undefined) pago.referencia = referencia;

    await pago.save();
    res.status(200).json(pago);
  } catch (error) {
    console.error("Error al actualizar pago:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deletePagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await db.Pago.findByPk(id);
    if (!pago) return res.status(404).json({ message: "Pago no encontrado." });

    const ticket = await db.Ticket.findByPk(pago.ticket_id);
    if (ticket && (ticket.estado === "cerrado" || ticket.fecha_salida)) {
      return res
        .status(400)
        .json({
          message: "No se puede eliminar un pago de un ticket ya cerrado.",
        });
    }

    await pago.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar pago:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
