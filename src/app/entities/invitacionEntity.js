const { EntitySchema } = require("typeorm");

const Invitacion = new EntitySchema({
  name: "Invitacion",
  tableName: "invitaciones",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    nombre: {
      type: "varchar",
      nullable: false,
    },
    hora: {
      type: "varchar",
      nullable: false,
    },
  },
});

module.exports = { Invitacion };
