import { Request, Response } from "express";
import { InvitacionService } from "../services";

const service = new InvitacionService();

export class InvitacionController {
  static async getAll(req: Request, res: Response) {
    try {
      const invitaciones = await service.obtenerTodas();
      res.json(invitaciones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const invitacion = await service.obtenerPorId(req.params.id);
      if (!invitacion) res.status(404).json({ error: "No encontrada" });
      res.json(invitacion);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { nombre, hora } = req.body;
      const nuevaInvitacion = await service.crearInvitacion(nombre, hora);
      res.status(201).json(nuevaInvitacion);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await service.eliminarInvitacion(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
