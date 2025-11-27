const db = require("../models");

exports.createVehiculo = async (req, res) => {
  try {
    const { vehiculo_tipo_id, reserva_id, placa, descripcion } = req.body;
    const vehiculoTipo = await db.VehiculoTipo.findByPk(vehiculo_tipo_id);

    if (!vehiculoTipo) {
      return res
        .status(404)
        .json({ message: "Tipo de vehiculo no encontrado" });
    }

    const nuevoVehiculo = await db.Vehiculo.create({
      vehiculo_tipo_id,
      reserva_id,
      placa,
      descripcion,
    });
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllVehiculos = async (req, res) => {
  try {
    const vehiculos = await db.Vehiculo.findAll();
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehiculo_tipo_id, reserva_id, placa, descripcion } = req.body;

    if (
      vehiculo_tipo_id &&
      !(await db.VehiculoTipo.findByPk(vehiculo_tipo_id))
    ) {
      return res
        .status(404)
        .json({ message: "Tipo de vehículo no encontrado" });
    }
    if (reserva_id && !(await db.Reserva.findByPk(reserva_id))) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    const vehiculo = await db.Vehiculo.findByPk(id);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    vehiculo.vehiculo_tipo_id = vehiculo_tipo_id || vehiculo.vehiculo_tipo_id;
    vehiculo.reserva_id = reserva_id || vehiculo.reserva_id;
    vehiculo.placa = placa || vehiculo.placa;
    vehiculo.descripcion = descripcion || vehiculo.descripcion;

    await vehiculo.save();
    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    await vehiculo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
