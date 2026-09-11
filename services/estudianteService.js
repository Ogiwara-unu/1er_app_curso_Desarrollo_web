const estudiantesDAO = require("../dao/estudiantesDAO");

function listar() {
    return estudiantesDAO.listar();
}

function buscarPorCarne(carne) {
    return estudiantesDAO.buscarPorCarne(carne);
}

function guardar(estudiante) {
    if (!estudiante.carne || !estudiante.nombre || !estudiante.apellidos || !estudiante.carrera) {
        throw new Error("Todos los campos son obligatorios.");
    }

    if (estudiante.promedio === undefined || Number.isNaN(estudiante.promedio)) {
        throw new Error("El promedio debe ser un número válido.");
    }

    estudiantesDAO.guardar(estudiante);
}

function modificar(estudiante) {
    if (!estudiante.carne || !estudiante.nombre || !estudiante.apellidos || !estudiante.carrera) {
        throw new Error("Todos los campos son obligatorios.");
    }

    if (estudiante.promedio === undefined || Number.isNaN(estudiante.promedio)) {
        throw new Error("El promedio debe ser un número válido.");
    }

    estudiantesDAO.modificar(estudiante);
}

function eliminar(carne) {
    if (!carne) {
        throw new Error("El carné es obligatorio.");
    }

    estudiantesDAO.eliminar(carne);
}

module.exports = {
    listar,
    buscarPorCarne,
    guardar,
    modificar,
    eliminar
};
