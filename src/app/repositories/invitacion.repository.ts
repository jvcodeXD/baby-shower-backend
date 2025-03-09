import { AppDataSource } from "../../config";
import { Invitacion } from "../entities";
import { Repository } from "typeorm";

export class InvitacionRepository {
  private repo: Repository<Invitacion>;

  constructor() {
    this.repo = AppDataSource.getRepository(Invitacion);
  }

  async getAll() {
    return this.repo.find();
  }

  async getById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async create(nombre: string, hora: string) {
    const invitacion = this.repo.create({ nombre, hora });
    return this.repo.save(invitacion);
  }

  async delete(id: string) {
    return this.repo.delete({ id });
  }
}
