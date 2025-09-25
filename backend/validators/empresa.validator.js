const { body, param, validationResult } = require('express-validator');

// Middleware para manejar los errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); 
};

const validateEmpresa = [
  body('ruc')
    .optional({ checkFalsy: true }) 
    .isString().withMessage('El RUC debe ser un texto.')
    .trim() 
    .isLength({ min: 11, max: 20 }).withMessage('El RUC debe tener entre 11 y 20 caracteres.'), 

  body('razon_social')
    .optional({ checkFalsy: true })
    .isString().withMessage('La razón social debe ser un texto.')
    .trim()
    .isLength({ min: 1, max: 150 }).withMessage('La razón social debe tener entre 1 y 150 caracteres.'),

  handleValidationErrors
];

module.exports = {
  validateEmpresa,
  handleValidationErrors 
};