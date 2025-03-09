const { Router } = require("express");
const {
  InvitacionController,
} = require("../app/controllers/invitacionController");

const router = Router();

router.get("/", InvitacionController.getAll);
router.get("/:id", InvitacionController.getById);
router.post("/", InvitacionController.create);
router.delete("/:id", InvitacionController.delete);

module.exports = router;
