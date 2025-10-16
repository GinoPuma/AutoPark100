const db = require("../models");

exports.createSesionCaja = async (req, res) => {
  try {
    const {
      usuario_id,
      saldo_inicial,
      fecha_abierto,
      fecha_cierre,
      saldo_cierre,
      estado,
    } = req.body;

    const usuario = await db.Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const nuevaSesionCaja = await db.SesionCaja.create({
      usuario_id,
      saldo_inicial,
      fecha_abierto,
      fecha_cierre,
      saldo_cierre,
      estado,
    });

    res.status(201).json(nuevaSesionCaja);
  } catch (error) {
    console.error("Error al crear Sesion Caja", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.getAllSesionCajas = async (req, res) => {
  try {
    const sesionCajas = await db.SesionCaja.findAll();
    res.status(200).json(sesionCajas);
  } catch (error) {
    console.error("Error al obtener Sesiones de Caja", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.getSesionCajaById = async (req, res) => {
  try {
    const { id } = req.params;

    const sesionCaja = await db.SesionCaja.findByPk(id);
    if (!sesionCaja) {
      return res.status(404).json({ message: "Sesion Caja no encontrada" });
    }

    res.status(200).json(sesionCaja);
  } catch (error) {
    console.error("Error al obtener Sesion Caja por ID", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.updateSesionCaja = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      usuario_id,
      saldo_inicial,
      fecha_abierto,
      fecha_cierre,
      saldo_cierre,
      estado,
    } = req.body;

    const usuario = await db.Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const sesionCaja = await db.SesionCaja.findByPk(id);
    if (!sesionCaja) {
      return res.status(404).json({ message: "Sesion Caja no encontrada" });
    }

    sesionCaja.usuario_id = usuario_id || sesionCaja.usuario_id;
    sesionCaja.saldo_inicial = saldo_inicial || sesionCaja.saldo_inicial;
    sesionCaja.fecha_abierto = fecha_abierto || sesionCaja.fecha_abierto;
    sesionCaja.fecha_cierre = fecha_cierre || sesionCaja.fecha_cierre;
    sesionCaja.saldo_cierre = saldo_cierre || sesionCaja.saldo_cierre;
    sesionCaja.estado = estado || sesionCaja.estado;

    await sesionCaja.save();

    res.status(200).json(sesionCaja);
  } catch (error) {
    console.error("Error al actualizar Sesion Caja", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.deleteSesionCaja = async (req, res) => {
  try {
    const { id } = req.params;

    const sesionCaja = await db.SesionCaja.findByPk(id);
    if (!sesionCaja) {
      return res.status(404).json({ message: "Sesion Caja no encontrada" });
    }

    await sesionCaja.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar Sesion Caja", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
