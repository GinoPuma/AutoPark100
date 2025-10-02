const db = requiere("../models");

exports.createVehiculo = async (req, res) => {
  try {
    const { vehiculo_tipo_id, cliente_id, placa, color } = req.body;
    const vehiculoTipo = await db.VehiculoTipo.findByPk(vehiculo_tipo_id);
    const cliente = await db.Cliente.findByPk(cliente_id);
    if (!vehiculoTipo) {
      res.status(404).json({ message: "Tipo de vehiculo no encontrado" });
    }

    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
    const nuevoVehiculo = await db.Vehiculo.create({
      vehiculo_tipo_id,
      cliente_id,
      placa,
      color,
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
    const { vehiculo_tipo_id, cliente_id, placa, color } = req.body;
    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    vehiculo.vehiculo_tipo_id = vehiculo_tipo_id || vehiculo.vehiculo_tipo_id;
    vehiculo.cliente_id = cliente_id || vehiculo.cliente_id;
    vehiculo.placa = placa || vehiculo.placa;
    vehiculo.color = color || vehiculo.color;

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
    const vehiculo = db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    vehiculo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
