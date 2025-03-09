const { InvitacionService } = require("../services/invitacionService");

const service = new InvitacionService();

class InvitacionController {
  static async getAll(req, res) {
    try {
      const invitaciones = await service.obtenerTodas();
      res.json(invitaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const invitacion = await service.obtenerPorId(req.params.id);
      if (!invitacion) return res.status(404).json({ error: "No encontrada" });
      res.json(invitacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, hora } = req.body;
      const nuevaInvitacion = await service.crearInvitacion(nombre, hora);
      res.status(201).json(nuevaInvitacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await service.eliminarInvitacion(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = { InvitacionController };
