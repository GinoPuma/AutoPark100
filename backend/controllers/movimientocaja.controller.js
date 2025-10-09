const db = require("../models");

exports.createMovimientoCaja = async (req, res) => {
  try {
    const { sesion_caja_id, pago_id, tipo, descripcion, monto } = req.body;

    const sesionCaja = await db.SesionCaja.findByPk(sesion_caja_id);
    const pago = await db.Pago.findByPk(pago_id);

    if (!sesionCaja)
      return res.status(404).json({ message: "Sesion de Caja no encontrada" });
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });

    if (!sesionCaja.estado) {
      return res.status(400).json({
        message: "No se pueden realizar movimientos en sesiones cerradas",
      });
    }

    const tiposValidos = ["ingreso", "egreso"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        message: `Tipo de movimiento inválido. Debe ser uno de: ${tiposValidos.join(
          ", "
        )}`,
      });
    }
    if (monto < 0) {
      return res
        .status(400)
        .json({ message: "El monto no puede ser negativo." });
    }

    const nuevoMovimientoCaja = await db.MovimientoCaja.create({
      sesion_caja_id,
      pago_id,
      tipo,
      descripcion,
      monto,
    });

    res.status(201).json(nuevoMovimientoCaja);
  } catch (error) {
    console.log("Error interno del servidor", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllMovimientosCaja = async (req, res) => {
  try {
    const movimientosCaja = await db.MovimientoCaja.findAll();
    res.status(200).json(movimientosCaja);
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getMoviminetoCajaById = async (req, res) => {
  try {
    const { id } = req.params;
    const movimientoCaja = await db.MovimientoCaja.findByPk(id);

    if (!movimientoCaja) {
      return res
        .status(404)
        .json({ message: "Movimiento de caja no encontrado" });
    }

    res.status(200).json(movimientoCaja);
  } catch (error) {
    console.error("Error al obtener movimiento de caja por ID:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateMovimientoCaja = async (req, res) => {
  try {
    const { id } = req.params;
    const { sesion_caja_id, pago_id, tipo, descripcion, monto } = req.body;
    const movimientoCaja = await db.MovimientoCaja.findByPk(id);

    if (!movimientoCaja) {
      return res
        .status(404)
        .json({ message: "Movimiento de caja no encontrado" });
    }

    const sesionCaja = await db.SesionCaja.findByPk(sesion_caja_id);
    if (!sesionCaja || sesionCaja.estado) {
      return res.status(400).json({
        message: "No se pueden realizar movimientos en sesiones cerradas",
      });
    }
    if (sesion_caja_id !== undefined) {
      const nuevaSesion = await db.SesionCaja.findByPk(sesion_caja_id);
      if (!nuevaSesion)
        return res
          .status(404)
          .json({ message: "Nueva sesión de caja no encontrada." });
      if (!nuevaSesion.estado)
        return res
          .status(400)
          .json({
            message: "No se puede asignar a una sesión de caja cerrada.",
          });
      movimientoCaja.sesion_caja_id = sesion_caja_id;
    }
    if (pago_id !== undefined) {
      const nuevoPago = await db.Pago.findByPk(pago_id);
      if (!nuevoPago)
        return res.status(404).json({ message: "Nuevo pago no encontrado." });
      movimientoCaja.pago_id = pago_id;
    }
    if (tipo !== undefined) {
      const tiposValidos = ["ingreso", "egreso"];
      if (!tiposValidos.includes(tipo)) {
        return res
          .status(400)
          .json({
            message: `Tipo de movimiento inválido. Debe ser uno de: ${tiposValidos.join(
              ", "
            )}`,
          });
      }
      movimientoCaja.tipo = tipo;
    }
    if (descripcion !== undefined) movimiento.descripcion = descripcion;
    if (monto !== undefined) {
      if (monto < 0)
        return res
          .status(400)
          .json({ message: "El monto no puede ser negativo." });
      movimientoCaja.monto = monto;
    }

    await movimiento.save();
    res.status(201).json(movimiento);
  } catch (error) {
    console.error("Error al actualizar movimiento de caja:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteMovimientoCaja = async (req, res) => {
  try {
    const { id } = req.params;
    const movimientoCaja = await db.MovimientoCaja.findByPk(id);

    if (!movimientoCaja) {
      return res
        .status(404)
        .json({ message: "Movimiento de caja no encontrado" });
    }

    const sesionCaja = await db.SesionCaja.findByPk(movimiento.sesion_caja_id);
    if (!sesionCaja || !sesionCaja.estado) {
      return res
        .status(400)
        .json({
          message:
            "No se puede eliminar un movimiento de una sesión de caja cerrada.",
        });
    }

    await movimientoCaja.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar movimiento de caja:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
