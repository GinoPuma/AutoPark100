const express = require("express");
const router = express.Router();
const sesionCajaController = require("../controllers/sesioncaja.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  sesionCajaController.createSesionCaja
);
router.get("/", protect, sesionCajaController.getAllSesionCajas);
router.get("/:id", protect, sesionCajaController.getSesionCajaById);
router.put(
  "/:id",
  protect,
  sesionCajaController.updateSesionCaja
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  sesionCajaController.deleteSesionCaja
);

module.exports = router;