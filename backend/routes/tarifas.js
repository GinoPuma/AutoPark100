const express = require("express");
const router = express.Router();
const tarifaController = require("../controllers/tarifa.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  tarifaController.createTarifa
);      
router.get("/", protect, tarifaController.getAllTarifas);
router.get("/:id", protect, tarifaController.getTarifaById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  tarifaController.updateTarifa
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  tarifaController.deleteTarifa
);

module.exports = router;