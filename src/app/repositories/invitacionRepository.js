const { AppDataSource } = require("../../config/data-source");
const { Invitacion } = require("../entities/invitacionEntity");

class InvitacionRepository {
  constructor() {
    this.repo = AppDataSource.getRepository(Invitacion);
  }

  async getAll() {
    return this.repo.find();
  }

  async getById(id) {
    return this.repo.findOneBy({ id });
  }

  async create(nombre, hora) {
    const invitacion = this.repo.create({ nombre, hora });
    return this.repo.save(invitacion);
  }

  async delete(id) {
    return this.repo.delete({ id });
  }
}

module.exports = { InvitacionRepository };
