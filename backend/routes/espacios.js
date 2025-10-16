const express = require("express");
const router = express.Router();
const espacioController = require("../controllers/espacio.controller");
// const { validateEspacio } = require("../validators/espacio.validator");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  espacioController.createEspacio
);
router.get("/", protect, espacioController.getAllEspacios);
router.get("/:id", protect, espacioController.getEspacioById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  espacioController.updateEspacio
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  espacioController.deleteEspacio
);

module.exports = router;