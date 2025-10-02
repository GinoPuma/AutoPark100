const db = require("../models");

exports.createCliente = async (req, res) => {
  try {
    const { empresa_id, doc_tipo, doc_num, nombre, apellido, email, telefono } =
      req.body;

    const empresa = await db.Empresa.findByPk(empresa_id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const nuevoCliente = await db.Cliente.create({
      empresa_id,
      doc_tipo,
      doc_num,
      nombre,
      apellido,
      email,
      telefono,
    });

    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al crear cliente:', error)
    res.status(500).json({message: 'Error interno del servidor', error: error.message})
  }
};

exports.getAllCliente = async (req, res) => {
  try {
    const clientes = await db.Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error)
    res.status(500).json({message: 'Error interno del servidor', error: error.message})
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error)
    res.status(500).json({message: 'Error interno del servidor', error: error.message})
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa_id, doc_tipo, doc_num, nombre, apellido, email, telefono } = req.body;
    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    if (empresa_id !== undefined) {
      const empresa = await db.Empresa.findByPk(empresa_id);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      cliente.empresa_id = empresa_id;
    }

    cliente.doc_tipo = doc_tipo || cliente.doc_tipo;
    cliente.doc_num = doc_num || cliente.doc_num;
    cliente.nombre = nombre || cliente.nombre;
    cliente.apellido = apellido || cliente.apellido;
    cliente.email = email || cliente.email;
    cliente.telefono = telefono || cliente.telefono;

    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al actualizar cliente:', error)
    res.status(500).json({message: 'Error interno del servidor', error: error.message})
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await cliente.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar cliente:', error)
    res.status(500).json({message: 'Error interno del servidor', error: error.message})
  }
};
