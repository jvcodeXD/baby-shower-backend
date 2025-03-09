import { InvitacionRepository } from "../repositories";

export class InvitacionService {
  private repo: InvitacionRepository;

  constructor() {
    this.repo = new InvitacionRepository();
  }

  async obtenerTodas() {
    return this.repo.getAll();
  }

  async obtenerPorId(id: string) {
    return this.repo.getById(id);
  }

  async crearInvitacion(nombre: string, hora: string) {
    return this.repo.create(nombre, hora);
  }

  async eliminarInvitacion(id: string) {
    return this.repo.delete(id);
  }
}
