const jwt = require('jsonwebtoken');

// Función para crear un token JWT
const signToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn:`${process.env.JWT_COOKIE_EXPIRES_IN}d` ,
  });

  // Opciones para la cookie
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'Lax', 
  };

  // Asigna la cookie al objeto de respuesta
  res.cookie('jwt', token, cookieOptions);
  return token; 
};

// Función para eliminar la cookie JWT
const deleteCookieJWT = (res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
};

module.exports = {
  signToken,
  deleteCookieJWT,
};