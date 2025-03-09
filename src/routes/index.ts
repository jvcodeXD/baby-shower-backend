import { Router } from "express";
import invitacionRoutes from "./invitacion.route";

const router = Router();

router.use("/estado", (req, res) => {
  res.json({ estado: "API funcionando correctamente" });
});

router.use("/invitacion", invitacionRoutes);

export default router;
