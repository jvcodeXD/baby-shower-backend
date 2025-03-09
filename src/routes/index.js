const { Router } = require("express");
const invitacionRoutes = require("./invitacionRoutes");

const router = Router();

router.use("/estado", (req, res) => {
  res.json({ estado: "API funcionando correctamente" });
});

router.use("/invitacion", invitacionRoutes);

module.exports = router;
