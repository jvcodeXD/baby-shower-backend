const {
  InvitacionRepository,
} = require("../repositories/invitacionRepository");

class InvitacionService {
  constructor() {
    this.repo = new InvitacionRepository();
  }

  async obtenerTodas() {
    return this.repo.getAll();
  }

  async obtenerPorId(id) {
    return this.repo.getById(id);
  }

  async crearInvitacion(nombre, hora) {
    return this.repo.create(nombre, hora);
  }

  async eliminarInvitacion(id) {
    return this.repo.delete(id);
  }
}

module.exports = { InvitacionService };
