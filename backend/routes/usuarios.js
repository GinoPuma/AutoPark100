const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../middlewares/auth");
const usuarioController = require("../controllers/usuario.controller");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  usuarioController.createUsuario
);
router.get(
  "/",
  protect,
  restrictTo("Administrador"),
  usuarioController.getAllUsuarios
);
router.get(
  "/:id",
  protect,
  restrictTo("Administrador"),
  usuarioController.getUsuarioById
);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  usuarioController.updateUsuario
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  usuarioController.deleteUsuario
);

module.exports = router;