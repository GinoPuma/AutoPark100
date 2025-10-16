const db = require("../models");
const reserva = require("../models/reserva");

exports.createReserva = async (req, res) => {
  try {
    const {
      cliente_id,
      sede_id,
      espacio_id,
      inicio_reserva,
      fin_reserva,
      estado,
      anticipo,
    } = req.body;
    if (
      !cliente_id ||
      !sede_id ||
      !espacio_id ||
      !inicio_reserva ||
      !fin_reserva ||
      !estado
    ) {
      return res.status(400).json({
        message:
          "Campos requeridos: cliente_id, sede_id, espacio_id, inicio_reserva, fin_reserva, estado.",
      });
    }
    const cliente = await db.Cliente.findByPk(cliente_id);
    const sede = await db.Sede.findByPk(sede_id);
    const espacio = await db.Espacio.findByPk(espacio_id);

    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado." });
    if (!sede) return res.status(404).json({ message: "Sede no encontrada." });
    if (!espacio)
      return res.status(404).json({ message: "Espacio no encontrado." });
    // Verificar si el espacio está libre para la reserva (si no es 'cancelada')
    // Buscar reservas existentes y/o tickets activos para ese espacio y comparar rangos de fechas.
    // Validar si el estado del espacio es 'ocupado' Y la reserva no es para 'cancelada'
    if (estado !== "cancelada") {
      const espacioActual = await db.Espacio.findByPk(espacio_id);
      if (espacioActual && espacioActual.estado === "ocupado") {
        // Verificar si hay reserva/ticket activo que solape con inicio de reserva
        // Buscar si ya hay una reserva/ticket CONFIRMADO o ACTIVO para ese espacio
        // en un rango de tiempo que se solape con la nueva reserva.
        const reservaExistente = await db.Reserva.findOne({
          where: {
            espacio_id: espacio_id,
            estado: { [db.Sequelize.Op.in]: ["confirmada", "pendiente"] },
            [db.Sequelize.Op.or]: [
              {
                // Solape 1: La nueva reserva comienza mientras la otra está activa
                inicio_reserva: { [db.Sequelize.Op.lt]: inicio_reserva },
                fin_reserva: { [db.Sequelize.Op.gt]: inicio_reserva },
              },
              {
                // Solape 2: La nueva reserva termina mientras la otra está activa
                inicio_reserva: { [db.Sequelize.Op.lt]: fin_reserva },
                fin_reserva: { [db.Sequelize.Op.gt]: fin_reserva },
              },
              {
                // Solape 3: La nueva reserva encierra a la otra
                inicio_reserva: { [db.Sequelize.Op.gte]: inicio_reserva },
                fin_reserva: { [db.Sequelize.Op.lte]: fin_reserva },
              },
              {
                // Solape 4: La otra reserva encierra a la nueva
                inicio_reserva: { [db.Sequelize.Op.lte]: inicio_reserva },
                fin_reserva: { [db.Sequelize.Op.gte]: fin_reserva },
              },
            ],
          },
        });
        // Verificar contra tickets activos
        const ticketActivo = await db.Ticket.findOne({
          where: {
            espacio_id: espacio_id,
            fecha_salida: null,
          },
        });

        if (reservaExistente || ticketActivo) {
          return res.status(409).json({
            message:
              "El espacio ya está ocupado o reservado para el período solicitado.",
          });
        }
      }
    }
    const nuevaReserva = await db.Reserva.create(
      cliente_id,
      sede_id,
      espacio_id,
      inicio_reserva,
      fin_reserva,
      estado,
      anticipo
    );
    if (estado === "confirmada") await espacio.update({ estado: "ocupado" });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await db.Reserva.findAll({
      include: [
        { model: db.Cliente, atributes: ["cliente_id", "nombre", "email"] },
        { model: db.Sede, atributes: ["sede_id", "nombre", "ubicacion"] },
        { model: db.Espacio, atributes: ["espacio_id", "numero", "zona_id"] },
      ],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getReservaById = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await db.Reserva.findByPk(id, {
      include: [
        { model: db.Cliente, atributes: ["cliente_id", "nombre", "apellido"] },
        { model: db.Sede, atributes: ["sede_id", "nombre", "ubicacion"] },
        { model: db.Espacio, atributes: ["espacio_id", "numero", "zona_id"] },
      ],
    });
    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada." });
    res.status(200).json(reserva);
  } catch (error) {
    console.error("Error al obtener reserva:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cliente_id,
      sede_id,
      espacio_id,
      inicio_reserva,
      fin_reserva,
      estado,
      anticipo,
    } = req.body;

    const reserva = await db.Reserva.findByPk(id);
    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada." });

    const oldEstado = reserva.estado;

    if (cliente_id !== undefined) {
      const Cliente = await db.Cliente.findByPk(cliente_id);
      if (!Cliente)
        return res
          .status(404)
          .json({ message: "Cliente no encontrado para la actualización." });
      reserva.cliente_id = cliente_id;
    }

    if (sede_id !== undefined) {
      const sede = await db.Sede.findByPk(sede_id);
      if (!sede)
        return res
          .status(404)
          .json({ message: "Sede no encontrada para la actualización." });
      reserva.sede_id = sede_id;
    }

    if (espacio_id !== undefined) {
      const espacio = await db.Espacio.findByPk(espacio_id);
      if (!espacio)
        return res
          .status(404)
          .json({ message: "Espacio no encontrado para la actualización." });
      reserva.espacio_id = espacio_id;
    }

    if (inicio_reserva !== undefined) reserva.inicio_reserva = inicio_reserva;
    if (fin_reserva !== undefined) reserva.fin_reserva = fin_reserva;
    if (anticipo !== undefined) reserva.anticipo = anticipo;

    if (estado !== undefined && estado !== oldEstado) {
      const estadosValidos = [
        "pendiente",
        "confirmada",
        "cancelada",
        "completada",
      ];
      if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
          message: `Estado inválido. Debe ser uno de: ${estadosValidos.join(
            ", "
          )}`,
        });
      }

      // Efectos secundarios al cambiar estado
      if (oldEstado !== "cancelada" && estado === "cancelada") {
        // Si la reserva original no estaba cancelada y ahora sí, libera el espacio
        // PERO SOLO SI NO HAY UN TICKET ACTIVO PARA ESE ESPACIO Y HORARIO
        const ticketActivo = await db.Ticket.findOne({
          where: {
            espacio_id: reserva.espacio_id,
            fecha_salida: null,
          },
        });
        if (!ticketActivo) {
          await db.Espacio.update(
            { estado: "libre" },
            { where: { espacio_id: reserva.espacio_id } }
          );
        }
      } else if (oldEstado !== "confirmada" && estado === "confirmada") {
        // Si la reserva se confirma y estaba libre, marca el espacio como ocupado
        // PERO SOLO SI NO HAY UN TICKET ACTIVO
        const ticketActivo = await db.Ticket.findOne({
          where: {
            espacio_id: reserva.espacio_id,
            fecha_salida: null,
          },
        });
        if (!ticketActivo) {
          await db.Espacio.update(
            { estado: "ocupado" },
            { where: { espacio_id: reserva.espacio_id } }
          );
        }
      }
      reserva.estado = estado;
    }
    await reserva.save();
    res.status(200).json(reserva);
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await db.Reserva.findByPk(id);
    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada." });
    if (reserva.estado === "confirmada") {
      const ticketActivo = await db.Ticket.findOne({
        where: {
          espacio_id: reserva.espacio_id,
          fecha_salida: null,
        },
      });
      if (!ticketActivo) {
        await db.Espacio.update(
          { estado: "libre" },
          { where: { espacio_id: reserva.espacio_id } }
        );
      }
    }
    await reserva.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
