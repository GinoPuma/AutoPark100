const db = require("../models");
const zona = require("../models/zona");

exports.createZona = async (req, res) => {
  try {
    const { sede_id, nombre, descripcion } = req.body;

    const sede = await db.Sede.findByPk(sede_id);

    if (!sede) {
      res.status(404).json({ message: "Sede no encontrada" });
    }

    const nuevaZona = await db.Zona.create({ sede_id, nombre, descripcion });

    res.status(201).json(nuevaZona);
  } catch (error) {
    console.error("Error al crear zona", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllZonas = async (req, res) => {
  try {
    const zonas = await db.Zona.findAll();
    res.status(200).json(zonas);
  } catch (error) {
    console.error("Error al obtener zonas", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getZonasById = async (req, res) => {
  try {
    const { id } = req.params;
    const zona = await db.Zona.findByPk(id);

    if (!zona) {
      res.status(404).json({ message: "Zona no encontrada" });
    }

    res.status(200).json(zona);
  } catch (error) {
    console.error("Error al obtener zona por ID", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateZona = async (req, res) => {
  try {
    const { id } = req.params;
    const { sede_id, nombre, descripcion } = req.body;

    const sede = await db.Sede.findByPk(sede_id);
    if (!sede) {
      res.status(404).json({ message: "Sede no encontrada" });
    }

    const zona = await db.Zona.findByPk(id);
    if (!zona) {
      res.status(404).json({ message: "Zona no encontrada" });
    }

    zona.sede_id = sede_id || zona.sede_id;
    zona.nombre = nombre || zona.nombre;
    zona.descripcion = descripcion || zona.descripcion;

    await zona.save();
    res.status(200).json(zona);
  } catch (error) {
    console.error("Error al actualizar la zona", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteZona = async (req, res) => {
  try {
    const { id } = req.params;
    const zona = db.Zona.findByPk(id);

    if (!zona) {
      res.status(404).json({ message: "Zona no encontrada" });
    }

    await zona.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la zona", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
