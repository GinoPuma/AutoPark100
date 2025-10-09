const db = require("../models");

exports.createPago = async (req, res) => {
  try {
    const { metodo_pago_id, ticket_id, monto, referencia } = req.body;
    if (!metodo_pago_id || !ticket_id || monto === undefined) {
      return res.status(400).json({ message: 'Campos requeridos: metodo_pago_id, ticket_id, monto.' });
    }

    const metodoPago = await db.MetodosPago.findByPk(metodo_pago_id);
    const ticket = await db.Ticket.findByPk(ticket_id);

    if (!metodoPago) return res.status(404).json({ message: 'Método de pago no encontrado.' });
    if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado.' });

    if (ticket.estado === 'cerrado' || ticket.fecha_salida) {
      return res.status(400).json({ message: 'No se pueden aplicar pagos a un ticket ya cerrado.' });
    }

    const nuevoPago = await db.Pago.create({
      metodo_pago_id,
      ticket_id,
      monto,
      referencia
    });

    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error('Error al crear pago:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};