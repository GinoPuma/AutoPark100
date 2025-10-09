const db = require("../models");

exports.createUsuario = async (req, res) => {
  try {
    const { rol_id, empresa_id, nombre, username, correo, password, estado } =
      req.body;
    const rol = await db.Rol.findByPk(rol_id);
    const empresa = await db.Empresa.findByPk(empresa_id);

    if (!rol) {
      res.status(404).json({ message: "Rol no encontrado" });
    }
    if (!empresa) {
      res.status(404).json({ message: "Empresa no encontrada" });
    }

    const nuevoUsuario = await db.Usuario.create({
      rol_id,
      empresa_id,
      nombre,
      username,
      correo,
      password,
      estado,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear Usuario", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener Usuarios", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener Usuario por ID", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol_id, empresa_id, nombre, username, correo, password, estado } =
      req.body;
    const rol = await db.Rol.findByPk(rol_id);
    const empresa = await db.Empresa.findByPk(empresa_id);

    if (!rol) {
      res.status(404).json({ message: "Rol no encontrado" });
    }
    if (!empresa) {
      res.status(404).json({ message: "Empresa no encontrada" });
    }

    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.rol_id = rol_id || usuario.rol_id;
    usuario.empresa_id = empresa_id || usuario.empresa_id;
    usuario.nombre = nombre || usuario.nombre;
    usuario.username = username || usuario.username;
    usuario.correo = correo || usuario.correo;
    usuario.password = password || usuario.password;
    usuario.estado = estado || usuario.estado;

    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al actualizar el Usuario", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await db.Usuario.findByPk(id);

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el Usuario", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
