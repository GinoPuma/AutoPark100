const jwt = require('jsonwebtoken');
const db = require('../models'); 

const protect = async (req, res, next) => {
  let token;

  // Obtener el token de la cookie
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // Si no hay token, el usuario no está autenticado
  if (!token) {
    return res.status(401).json({ message: 'No autenticado. Por favor, inicia sesión.' });
  }

  // Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await db.Usuario.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Token inválido o usuario no encontrado.' });
    }

    req.usuario = usuario;
    next(); 

  } catch (err) {
    console.error('Error de autenticación:', err);
    return res.status(401).json({ message: 'Token inválido o expirado. Por favor, inicia sesión de nuevo.' });
  }
};

module.exports = { protect };