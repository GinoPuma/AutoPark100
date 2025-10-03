const db = require("../models");

exports.createVehiculoTipo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoVehiculoTipo = await db.VehiculoTipo.create({
      nombre,
      descripcion,
    });

    res.status(201).json(nuevoVehiculoTipo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllVehiculoTipos = async (req, res) => {
  try {
    const vehiculoTipos = await db.VehiculoTipo.findAll();
    res.status(200).json(vehiculoTipos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getVehiculoTipoById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoTipo = db.VehiculoTipo.findByPk(id);
    if (!vehiculoTipo) {
      res.status(404).json({ message: "Tipo de vehiculo no encontrado" });
    }

    res.status(200).json(vehiculoTipo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateVehiculoId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const vehiculoTipo = await db.VehiculoTipo.findByPk(id);

    if (!vehiculoTipo) {
      res.status(404).json("Tipo de vehiculo no encontrado");
    }

    vehiculoTipo.nombre = nombre || vehiculoTipo.nombre;
    vehiculoTipo.descripcion = descripcion || vehiculoTipo.descripcion;

    await vehiculoTipo.save();
    res.status(200).json(vehiculoTipo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteVehiculoTipo = async (req, res) => {
  const { id } = req.params;
  const vehiculoTipo = db.VehiculoTipo.findByPk(id);

  if (!vehiculoTipo) {
    res.status(404).json("Tipo de vehiculo no encontrado");
  }

  await vehiculoTipo.destroy();
  res.status(204).send();
  try {
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
