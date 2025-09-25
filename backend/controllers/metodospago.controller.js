const db = require("../models");

exports.createMetodoPago = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoMetodoPago = await db.MetodosPago.create({ nombre });

    res.status(201).json(nuevoMetodoPago);
  } catch (error) {
    console.error("Error al crear metodo de pago", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllMetodosPago = async (req, res) => {
  try {
    const metodosPago = await db.MetodosPago.findAll();
    res.status(200).json(metodosPago);
  } catch (error) {
    console.error("Error al obtener mrtodos de pago", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getMetodoPagobyId = async (req, res) => {
  try {
    const { id } = req.params;
    const metodoPago = await db.MetodosPago.findByPk(id);

    res.status(201).json(metodoPago);
  } catch (error) {
    console.error("Error al crear metodo de pago", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateMetodoPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const metodoPago = await db.MetodosPago.findByPk(id);

    if (!metodoPago) {
      return res.status(404).json({ message: "Metodo de Pago no encontrado" });
    }

    metodoPago.nombre = nombre || metodoPago.nombre;

    await metodoPago.save();
    res.status(200).json(metodoPago);
  } catch (error) {
    console.error("Error al actualizar metodo de pago:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteMetodoPago = async (req, res) => {
  try {
    const { id } = req.params;
    const metodoPago = await db.MetodosPago.findByPk(id);

    if (!metodoPago) {
      return res.status(404).json({ message: "Metodo de Pago no encontrado" });
    }

    await metodoPago.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar metodo de pago:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
