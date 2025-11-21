const { body, validationResult } = require('express-validator');

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
    .exists({ checkFalsy: true }).withMessage('El RUC es obligatorio.')
    .isLength({ min: 11, max: 11 }).withMessage('El RUC debe tener exactamente 11 dígitos.')
    .matches(/^\d+$/).withMessage('El RUC solo puede contener números.'),

  body('razon_social')
    .exists({ checkFalsy: true }).withMessage('La razón social es obligatoria.')
    .isString().withMessage('La razón social debe ser un texto.')
    .trim()
    .isLength({ min: 1, max: 150 }).withMessage('La razón social debe tener entre 1 y 150 caracteres.'),

  handleValidationErrors
];

module.exports = {
  validateEmpresa,
  handleValidationErrors
};