const express = require("express");
const router = express.Router();
const movimientosCajaController = require("../controllers/movimientocaja.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  movimientosCajaController.createMovimientoCaja
);
router.get("/", protect, movimientosCajaController.getAllMovimientosCaja);
router.get("/:id", protect, movimientosCajaController.getMoviminetoCajaById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  movimientosCajaController.updateMovimientoCaja
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  movimientosCajaController.deleteMovimientoCaja
);

module.exports = router;