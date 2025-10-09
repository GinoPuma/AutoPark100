const db = require('../models');
const bcrypt = require('bcryptjs');
const jwtHelper = require('../utils/jwt'); 

const saltRounds = 10; 

exports.signup = async (req, res) => {
  try {
    const { empresa_id, rol_id, nombre, username, correo, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario con estado 'activo' por defecto
    const nuevoUsuario = await db.Usuario.create({
      empresa_id,
      rol_id,
      nombre,
      username,
      correo,
      password: hashedPassword,
      estado: 'activo' 
    });

    // Generar token JWT y enviarlo como cookie
    jwtHelper.signToken(nuevoUsuario.usuario_id, res);

    // Responder con información del usuario 
    const { password: _, ...usuarioInfo } = nuevoUsuario.get({ plain: true });
    res.status(201).json({
      message: 'Usuario registrado y autenticado exitosamente.',
      user: usuarioInfo
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// --- Inicio de Sesión (Login) ---
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Encontrar al usuario por username
    const usuario = await db.Usuario.findOne({
      where: { username: username },
      include: [ 
        { model: db.Empresa, attributes: ['empresa_id', 'razon_social'] },
        { model: db.Rol, attributes: ['rol_id', 'nombre'] }
      ]
    });

    // Verificar si el usuario está activo
    if (usuario.estado !== 'activo') {
      return res.status(403).json({ message: 'Tu cuenta no está activa. Contacta al administrador.' });
    }

    // Generar token JWT y enviarlo como cookie
    jwtHelper.signToken(usuario.usuario_id, res);

    // Responder con información del usuario (sin contraseña)
    const { password: _, ...usuarioInfo } = usuario.get({ plain: true });
    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      user: usuarioInfo
    });

  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// --- Cierre de Sesión (Logout) ---
exports.logout = async (req, res) => {
  try {
    jwtHelper.deleteCookieJWT(res);

    res.status(200).json({ message: 'Cierre de sesión exitoso.' });
  } catch (error) {
    console.error('Error en cierre de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// --- Obtener Usuario Actual ---
exports.getMe = async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ message: 'No autenticado.' });
    }
    res.status(200).json(req.usuario);
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};