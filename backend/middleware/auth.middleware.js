const jwt = require('jsonwebtoken');
const db = require('../models'); 
const dotenv = require('dotenv');
dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado: Token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.split(' ')[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await db.Usuario.findByPk(decoded.userId, {
        include: [{ model: db.Rol, as: 'Rol' }] 
    });

    if (!usuario || usuario.estado === false) { 
        return res.status(401).json({ message: 'No autorizado: Usuario inválido o inactivo' });
    }

    req.user = {
        userId: usuario.usuario_id,
        role: usuario.Rol.nombre,
        empresaId: usuario.empresa_id
    };

    next();

  } catch (error) {
    console.error('Error de autenticación:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'No autorizado: Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'No autorizado: Token inválido' });
    }
    res.status(500).json({ message: 'Error interno del servidor al autenticar', error: error.message });
  }
};

module.exports = authenticate;