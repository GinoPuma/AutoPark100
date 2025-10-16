const db = require("../models");

exports.createRol = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const nuevoRol = await db.Rol.create({ nombre });

    res.status(201).json(nuevoRol);
  } catch (error) {
    console.error("Error al crear Rol", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await db.Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error al obtener Roles", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.getRolById = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await db.Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.status(200).json(rol);
  } catch (error) {
    console.error("Error al obtener Rol por ID", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const rol = await db.Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    rol.nombre = nombre || rol.nombre;

    await rol.save();

    res.status(200).json(rol);
  } catch (error) {
    console.error("Error al actualizar Rol", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await db.Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await rol.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar Rol", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
