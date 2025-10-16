const db = require("../models");

exports.createTarifa = async (req, res) => {
  try {
    const {
      vehiculo_tipo_id,
      precio_hora,
      precio_dia,
      precio_mes,
      descripcion,
    } = req.body;

    const vehiculoTipo = await db.VehiculoTipo.findByPk(vehiculo_tipo_id);

    if (!vehiculoTipo) {
      return res
        .status(404)
        .json({ message: "Tipo de vehiculo no encontrado" });
    }

    const nuevaTarifa = await db.Tarifa.create(
      vehiculo_tipo_id,
      precio_hora,
      precio_dia,
      precio_mes,
      descripcion
    );

    res.status(201).json(nuevaTarifa);
  } catch (error) {
    console.error("Error al crear Tarifa", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllTarifas = async (req, res) => {
  try {
    const tarifas = db.Tarifa.findAll();
    res.status(200).json(tarifas);
  } catch (error) {
    console.error("Error al obtener Tarifas", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getTarifaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarifa = await db.Tarifa.findByPk(id);

    if (!tarifa) {
      return res.status(404).json({ message: "Tarifa no encontrada" });
    }

    res.status(200).json(tarifa);
  } catch (error) {
    console.error("Error al obtener tarifa por ID", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateTarifa = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      vehiculo_tipo_id,
      precio_hora,
      precio_dia,
      precio_mes,
      descripcion,
    } = req.body;

    const vehiculoTipo = await db.VehiculoTipo.findByPk(vehiculo_tipo_id);

    if (!vehiculoTipo) {
      return res
        .status(404)
        .json({ message: "Tipo de vehiculo no encontrado" });
    }

    const tarifa = await db.Tarifa.findByPk(id);
    if (!tarifa) {
      return res.status(404).json({ message: "Tarifa no encontrado" });
    }

    tarifa.vehiculo_tipo_id = vehiculo_tipo_id || tarifa.vehiculo_tipo_id;
    tarifa.precio_hora = precio_hora || tarifa.precio_hora;
    tarifa.precio_dia = precio_dia || tarifa.precio_dia;
    tarifa.precio_mes = precio_mes || tarifa.precio_mes;
    tarifa.descripcion = descripcion || tarifa.descripcion;

    await tarifa.save();
    res.status(200).json(tarifa);
  } catch (error) {
    console.error("Error al Actualizar Tarifa", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteTarifa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarifa = await db.Tarifa.findByPk(id);

    if (!tarifa) {
      return res.status(404).json({ message: "Tarifa no encontrada" });
    }

    await tarifa.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar Tarifa", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
