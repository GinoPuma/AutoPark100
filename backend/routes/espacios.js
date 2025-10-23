/**
 * @swagger
 * tags:
 *   name: Espacios
 *   description: Endpoints de gestión de espacios
 */

/**
 * @swagger
 * /espacios:
 *   post:
 *     summary: Crea un nuevo espacio
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zona_id:
 *                 type: integer
 *                 example: 1
 *               numero:
 *                 type: string
 *                 example: "A101"
 *               estado:
 *                 type: string
 *                 example: "disponible"
 *     responses:
 *       201:
 *         description: Espacio creado exitosamente
 *       400:
 *         description: Error de validación
 *   get:
 *     summary: Lista todos los espacios
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de espacios obtenida correctamente
 */

/**
 * @swagger
 * /espacios/{id}:
 *   get:
 *     summary: Obtiene un espacio por ID
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Espacio encontrado
 *       404:
 *         description: Espacio no encontrado
 *
 *   put:
 *     summary: Actualiza un espacio existente
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zona_id:
 *                 type: integer
 *                 example: 1
 *               numero:
 *                 type: string
 *                 example: "A101"
 *               estado:
 *                 type: string
 *                 example: "ocupado"
 *     responses:
 *       200:
 *         description: Espacio actualizado correctamente
 *       404:
 *         description: Espacio no encontrado
 *
 *   delete:
 *     summary: Elimina un espacio por ID
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Espacio eliminado exitosamente
 *       404:
 *         description: Espacio no encontrado
 */

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
