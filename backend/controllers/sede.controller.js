const db = require("../models");

exports.createSede = async (req, res) => {
  try {
    const { empresa_id, nombre, direccion } = req.body;

    const empresa = await db.Empresa.findByPk(empresa_id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    const nuevaSede = await db.Sede.create({ empresa_id, nombre, direccion });
    res.status(201).json(nuevaSede);
  } catch (error) {
    console.error("Error al crear la sede:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllSede = async (req, res) => {
  try {
    const sedes = await db.Sede.findAll();
    res.status(200).json(sedes);
  } catch (error) {
    console.error("Error al obtener la sede:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getSedeById = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await db.Sede.findByPk(id);
    if (!sede) {
      return res.status(404).json({ message: "Sede no encotrada" });
    }
    res.status(200).json(sede);
  } catch (error) {
    console.error("Error al obtener la sede por ID");
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateSede = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa_id, nombre, direccion } = req.body;
    const sede = await db.Sede.findByPk(id);
    if (!sede) {
      return res.status(404).json({ message: "Sede no encotrada" });
    }
    if (empresa_id !== undefined) {
      const empresa = await db.Empresa.findByPk(empresa_id);
      if (!empresa) {
        return res
          .status(404)
          .json({ message: "Empresa no encontrada para la actualización" });
      }
      sede.empresa_id = empresa_id;
    }

    sede.nombre = nombre || sede.nombre;
    sede.direccion = direccion || sede.direccion;

    await sede.save();
    res.status(200).json(sede);
  } catch (error) {
    console.error("Error al actualizar sede:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteSede = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await db.Sede.findByPk(id);
    if (!sede) {
      return res.status(400).json({ message: "Sede no encontrada" });
    }
    await sede.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar sede:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor:", error: error.message });
  }
};
