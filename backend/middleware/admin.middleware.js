const authorizeRole = (roleName) => {
  return (req, res, next) => {
    if (req.user && req.user.role === roleName) {
      next(); 
    } else {
      res.status(403).json({ message: `Acceso denegado. Se requiere rol '${roleName}'.` });
    }
  };
};

const admin = authorizeRole('Admin'); 

module.exports = {
    admin,
};