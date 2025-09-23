const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.get("/", auth, contactController.getContact);
router.post("/", auth, contactController.postContact);
router.patch("/:id", auth, contactController.patchContact);
router.delete("/:id", auth, contactController.deleteContact);

module.exports = router;
