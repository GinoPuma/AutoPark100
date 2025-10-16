const express = require("express");
const router = express.Router();
const vehiculoTipoController = require("../controllers/vehiculoTipo.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  vehiculoTipoController.createVehiculoTipo
);
router.get("/", protect, vehiculoTipoController.getAllVehiculoTipos);
router.get("/:id", protect, vehiculoTipoController.getVehiculoTipoById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  vehiculoTipoController.updateVehiculoTipo
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  vehiculoTipoController.deleteVehiculoTipo
);

module.exports = router;