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
      type: "text",
      nullable: false,
    },
    hora: {
      type: "text",
      nullable: false,
    },
  },
});

module.exports = { Invitacion };
