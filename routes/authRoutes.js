const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => res.redirect("/login"));
router.get("/login", authController.mostrarLogin);
router.post("/login", authController.login);

module.exports = router;
