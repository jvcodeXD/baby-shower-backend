import { Router } from "express";
import { InvitacionController } from "../app/controllers";

const router = Router();

router.get("/", InvitacionController.getAll);
router.get("/:id", InvitacionController.getById);
router.post("/", InvitacionController.create);
router.delete("/:id", InvitacionController.delete);

export default router;
