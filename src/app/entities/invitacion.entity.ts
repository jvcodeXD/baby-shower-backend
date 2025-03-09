import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Invitacion {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nombre!: string;

  @Column()
  hora!: string;
}
