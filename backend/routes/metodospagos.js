const express = require("express");
const router = express.Router();
const metodosPagoController = require("../controllers/metodospago.controller");
const { protect, restrictTo } = require("../middlewares/auth");
// const { validateMetodosPago } = require('../validators/metodospago.validator');

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  metodosPagoController.createMetodoPago
);
router.get("/", protect, metodosPagoController.getAllMetodosPago);
router.get("/:id", protect, metodosPagoController.getMetodoPagobyId);
router.put(
  "/",
  protect,
  restrictTo("Administrador"),
  metodosPagoController.updateMetodoPago
);
router.delete(
  "/",
  protect,
  restrictTo("Administrador"),
  metodosPagoController.deleteMetodoPago
);

module.exports = router;