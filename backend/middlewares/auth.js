const jwt = require("jsonwebtoken");
const db = require("../models");

// Middleware para autenticación
const protect = async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "No autenticado. Por favor, inicia sesión." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Incluir el Rol en la consulta
    const usuario = await db.Usuario.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Rol,
          attributes: ["rol_id", "nombre"],
        },
      ],
    });

    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Token inválido o usuario no encontrado." });
    }

    req.usuario = usuario;
    next();
  } catch (err) {
    console.error("Error de autenticación:", err);
    return res
      .status(401)
      .json({
        message:
          "Token inválido o expirado. Por favor, inicia sesión de nuevo.",
      });
  }
};

// Middleware para verificar roles
const restrictTo = (...rolesPermitidos) => {
  return (req, res, next) => {
    const rolUsuario = req.usuario.Rol?.nombre;

    if (!rolUsuario) {
      return res.status(403).json({
        message: "No se pudo determinar el rol del usuario.",
      });
    }

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({
        message: "No tienes permiso para realizar esta acción.",
      });
    }

    next();
  };
};

module.exports = { protect, restrictTo };
