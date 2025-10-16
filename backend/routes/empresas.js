const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresa.controller");
const { validateEmpresa } = require("../validators/empresa.validator");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  validateEmpresa,
  empresaController.createEmpresa
);
router.get("/", protect, empresaController.getAllEmpresas);
router.get("/:id", protect, empresaController.getEmpresaById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  validateEmpresa,
  empresaController.updateEmpresa
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  empresaController.deleteEmpresa
);

module.exports = router;
