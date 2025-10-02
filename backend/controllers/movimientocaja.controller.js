const db = require("../models");

exports.createMovimientoCaja = async (req, res) => {
  try {
    const { sesion_caja_id, pago_id, tipo, descripcion } = req.body;
    const sesionCaja = await db.SesionCaja.findByPk(sesion_caja_id);
    const pago = await db.Pago.findByPk(pago_id);

    if (!sesionCaja) return res.status(404).json({ message: "Sesion de Caja no encontrada" });
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });
    
    const nuevoMovimientoCaja = await db.MovimientoCaja.create({
      sesion_caja_id,
      pago_id,
      tipo,
      descripcion,
    });
    res.status(201).json(nuevoMovimientoCaja);
  } catch (error) {}
};
