const db = require('../models'); 

exports.createEmpresa = async (req, res) => {
  try {
    const { ruc, razon_social } = req.body;
    const nuevaEmpresa = await db.Empresa.create({ ruc, razon_social });
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    console.error('Error al crear empresa:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};


exports.getAllEmpresas = async (req, res) => {
  try {
    const empresas = await db.Empresa.findAll();
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

exports.getEmpresaById = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await db.Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    console.error('Error al obtener empresa por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

exports.updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { ruc, razon_social } = req.body;
    const empresa = await db.Empresa.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    empresa.ruc = ruc || empresa.ruc;
    empresa.razon_social = razon_social || empresa.razon_social;

    await empresa.save();
    res.status(200).json(empresa);
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

exports.deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await db.Empresa.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    await empresa.destroy();
    res.status(204).send(); 
  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};