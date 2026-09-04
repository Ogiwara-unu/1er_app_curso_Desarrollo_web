const fs = require("fs");
const path = require("path");
const Usuario = require("../models/usuario");

const RUTA_ARCHIVO = path.join(__dirname, "..", "data", "usuarios.txt");

function leerUsuarios() {
    const contenido = fs.readFileSync(RUTA_ARCHIVO, "utf-8");

    return contenido
        .split("\n")
        .map(linea => linea.trim())
        .filter(linea => linea.length > 0)
        .map(linea => {
            const [usuario, password] = linea.split(";").map(campo => campo.trim());
            return new Usuario(usuario, password);
        });
}

function buscarPorUsuario(usuario) {
    const usuarios = leerUsuarios();
    return usuarios.find(u => u.usuario === usuario);
}

module.exports = {
    leerUsuarios,
    buscarPorUsuario
};
