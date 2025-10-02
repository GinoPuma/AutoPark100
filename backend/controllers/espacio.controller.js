const db = require("../models");

exports.createEspacio = async (req, res) => {
    try {
        const { zona_id, numero, estado } = req.body;

        const zona = await db.Zona.findByPk(zona_id)
        if (!zona) {
            return res.status(404).json({ message: "Zona no encontrada" });
        }
        const nuevoEspacio = await db.Espacio.create({ zona_id, numero, estado });
        res.status(201).json(nuevoEspacio);
    } catch (error) {
        console.error("Error al crear espacio:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

exports.getAllEspacios = async (req, res) => {
    try {
        const espacios = await db.Espacio.findAll();
        res.status(200).json(espacios);
    } catch (error) {
        console.error("Error al obtener espacios:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

exports.getEspacioById = async (req, res) => {
    try {
        const { id } = req.params;
        const espacio = await db.Espacio.findByPk(id);
        if (!espacio) {
            return res.status(404).json({ message: "Espacio no encontrado" });
        }
        res.status(200).json(espacio);
    } catch (error) {
        console.error("Error al obtener espacio por ID:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

exports.updateEspacio = async (req, res) => {
    try {
        const { id } = req.params;
        const { zona_id, numero, estado } = req.body;
        const espacio = await db.Espacio.findByPk(id);
        if (!espacio) {
            return res.status(404).json({ message: "Espacio no encontrado" });
        }
        if (zona_id !== undefined) {
            const zona = await db.Zona.findByPk(zona_id);
            if (!zona) {
                return res.status(404).json({ message: "Zona no encontrada para la actualización" });
            }
            espacio.zona_id = zona_id;
        }

        espacio.numero = numero || espacio.numero;
        espacio.estado = estado || espacio.estado;

        await espacio.save();
        res.status(200).json(espacio);
    } catch (error) {
        console.error("Error al actualizar espacio:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

exports.deleteEspacio = async (req, res) => {
    try {
        const { id } = req.params;
        const espacio = await db.Espacio.findByPk(id);
        if (!espacio) {
            return res.status(404).json({ message: "Espacio no encontrado" });
        }
        await espacio.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar espacio:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}