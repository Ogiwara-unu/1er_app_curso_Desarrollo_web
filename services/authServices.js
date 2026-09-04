const usuarioDAO = require("../dao/usuarioDAO");

function login(usuario, password) {
    if (!usuario || !password) {
        return { exito: false, mensaje: "Usuario y contraseña son obligatorios" };
    }

    const usuarioEncontrado = usuarioDAO.buscarPorUsuario(usuario);

    if (!usuarioEncontrado || usuarioEncontrado.password !== password) {
        return { exito: false, mensaje: "Usuario o contraseña incorrectos" };
    }

    return { exito: true, mensaje: "Login exitoso", usuario: usuarioEncontrado.usuario };
}

module.exports = { login };
