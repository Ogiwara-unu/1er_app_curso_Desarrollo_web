const path = require("path");
const authServices = require("../services/authServices");

function mostrarLogin(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
}

function login(req, res) {
    const { usuario, password } = req.body;

    const resultado = authServices.login(usuario, password);

    if (!resultado.exito) {
        return res.status(401).json(resultado);
    }

    res.json(resultado);
}

module.exports = { mostrarLogin, login };
