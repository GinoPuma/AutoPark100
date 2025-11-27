const db = require("../models");

// Crear tarifa
exports.createTarifa = async (req, res) => {
  try {
    const { vehiculo_tipo_id, tipo_tarifa, precio, descripcion } = req.body;

    // Validación de tipo_tarifa
    const tiposValidos = ["hora", "dia", "mes"];
    if (!tiposValidos.includes(tipo_tarifa)) {
      return res.status(400).json({
        message: "tipo_tarifa inválido. Debe ser: hora, dia o mes",
      });
    }

    // Verificar el tipo de vehículo
    const vehiculoTipo = await db.VehiculoTipo.findByPk(vehiculo_tipo_id);
    if (!vehiculoTipo) {
      return res
        .status(404)
        .json({ message: "Tipo de vehículo no encontrado" });
    }

    // Crear la tarifa
    const nuevaTarifa = await db.Tarifa.create({
      vehiculo_tipo_id,
      tipo_tarifa,
      precio,
      descripcion,
    });

    res.status(201).json(nuevaTarifa);
  } catch (error) {
    console.error("Error al crear Tarifa", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// Obtener todas las tarifas
exports.getAllTarifas = async (req, res) => {
  try {
    const tarifas = await db.Tarifa.findAll();
    res.status(200).json(tarifas);
  } catch (error) {
    console.error("Error al obtener Tarifas", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener tarifa por ID
exports.getTarifaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarifa = await db.Tarifa.findByPk(id);

    if (!tarifa) {
      return res.status(404).json({ message: "Tarifa no encontrada" });
    }

    res.status(200).json(tarifa);
  } catch (error) {
    console.error("Error al obtener tarifa", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Actualizar tarifa
exports.updateTarifa = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehiculo_tipo_id, tipo_tarifa, precio, descripcion } = req.body;

    const tarifa = await db.Tarifa.findByPk(id);
    if (!tarifa) {
      return res.status(404).json({ message: "Tarifa no encontrada" });
    }

    // Validar tipo_tarifa si viene en el body
    if (tipo_tarifa) {
      const tiposValidos = ["hora", "dia", "mes"];
      if (!tiposValidos.includes(tipo_tarifa)) {
        return res.status(400).json({
          message: "tipo_tarifa inválido. Debe ser: hora, dia o mes",
        });
      }
      tarifa.tipo_tarifa = tipo_tarifa;
    }

    // Validar tipo de vehículo si viene en el body
    if (vehiculo_tipo_id) {
      const vt = await db.VehiculoTipo.findByPk(vehiculo_tipo_id);
      if (!vt) {
        return res
          .status(404)
          .json({ message: "Tipo de vehículo no encontrado" });
      }
      tarifa.vehiculo_tipo_id = vehiculo_tipo_id;
    }

    // Actualizar precio y descripción si llegan
    tarifa.precio = precio ?? tarifa.precio;
    tarifa.descripcion = descripcion ?? tarifa.descripcion;

    await tarifa.save();

    res.status(200).json(tarifa);
  } catch (error) {
    console.error("Error al actualizar Tarifa", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar tarifa
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
