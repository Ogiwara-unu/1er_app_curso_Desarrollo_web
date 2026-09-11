const express = require("express");
const path = require("path");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");

router.get("/estudiantes/pagina", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "estudiantes.html"));
});

router.get("/estudiantes", estudianteController.listar);
router.get("/estudiantes/:carne", estudianteController.buscar);
router.post("/estudiantes", estudianteController.guardar);
router.put("/estudiantes", estudianteController.modificar);
router.delete("/estudiantes/:carne", estudianteController.eliminar);

module.exports = router;
