const db = require('../models'); 

// --- Validación para Signup ---
const validateSignup = async (req, res, next) => {
  const { empresa_id, rol_id, username, password, correo } = req.body;
  console.log(Object.keys(db));

  if (!empresa_id || !rol_id || !username || !password) {
    return res.status(400).json({ message: 'Campos requeridos: empresa_id, rol_id, username, password.' });
  }

  try {
    console.log(Object.keys(db));
    const empresa = await db.Empresa.findByPk(empresa_id);
    if (!empresa) return res.status(404).json({ message: 'Empresa no encontrada.' });

    const rol = await db.Rol.findByPk(rol_id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado.' });

    // Validación de formato de correo electrónico
    if (correo && !/\S+@\S+\.\S+/.test(correo)) {
        return res.status(400).json({ message: 'Formato de correo electrónico inválido.' });
    }

    // Validación de username y password
    if (username.length < 4) {
        return res.status(400).json({ message: 'El nombre de usuario debe tener al menos 4 caracteres.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Verificar unicidad ANTES de crear 
    const existingUser = await db.Usuario.findOne({
      where: { [db.Sequelize.Op.or]: [{ username: username }, { correo: correo }] }
    });
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario o correo electrónico ya está en uso.' });
    }

  } catch (error) {
    console.error('Error de validación en signup:', error);
    return res.status(500).json({ message: 'Error interno de validación.' });
  }

  next(); 
};

// --- Validación para Login ---
const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos.' });
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
};