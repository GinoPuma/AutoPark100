const db = require("../models");

exports.createPago = async (req, res) => {
    try {
        const {metodo_pago_id, ticket_id, monto, referencia} = req.body;

        const metodoPago = await db.MetodosPago.findByPk(metodo_pago_id);
        const ticket = await db.Ticket.findByPk(ticket_id);

        if (!metodoPago) return res.status(404).json({message: 'Pago no encontrado'})
        if (!ticket) return res.status(404).json({message: 'Ticket no encontrado'})

        
        
    } catch (error) {
        
    }
}