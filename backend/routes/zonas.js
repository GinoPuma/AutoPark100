const express = require("express");
const router = express.Router();
const zonaController = require("../controllers/zona.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  zonaController.createZona
);
router.get("/", protect, zonaController.getAllZonas);
router.get("/:id", protect, zonaController.getZonasById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  zonaController.updateZona
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  zonaController.deleteZona
);

module.exports = router;