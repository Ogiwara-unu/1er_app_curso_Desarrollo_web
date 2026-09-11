const fs = require("fs");
const path = require("path");
const Estudiante = require("../models/estudiante");

const RUTA_ARCHIVO = path.join(__dirname, "..", "data", "estudiante.txt");

function leerEstudiantes() {
    if (!fs.existsSync(RUTA_ARCHIVO)) {
        return [];
    }

    const contenido = fs.readFileSync(RUTA_ARCHIVO, "utf-8");

    return contenido
        .split("\n")
        .map(linea => linea.trim())
        .filter(linea => linea.length > 0)
        .map(linea => {
            const [carne, nombre, apellidos, carrera, promedio] = linea.split(";").map(campo => campo.trim());
            return new Estudiante(carne, nombre, apellidos, carrera, Number(promedio));
        });
}

function guardarTodos(estudiantes) {
    const contenido = estudiantes
        .map(e => [e.carne, e.nombre, e.apellidos, e.carrera, e.promedio].join(";"))
        .join("\n");

    fs.writeFileSync(RUTA_ARCHIVO, contenido.length > 0 ? contenido + "\n" : "", "utf-8");
}

function listar() {
    return leerEstudiantes();
}

function buscarPorCarne(carne) {
    return leerEstudiantes().find(e => e.carne === carne);
}

function guardar(estudiante) {
    const estudiantes = leerEstudiantes();

    if (estudiantes.some(e => e.carne === estudiante.carne)) {
        throw new Error("Ya existe un estudiante con ese carné.");
    }

    estudiantes.push(estudiante);
    guardarTodos(estudiantes);
}

function modificar(estudiante) {
    const estudiantes = leerEstudiantes();
    const indice = estudiantes.findIndex(e => e.carne === estudiante.carne);

    if (indice === -1) {
        throw new Error("Estudiante no encontrado.");
    }

    estudiantes[indice] = estudiante;
    guardarTodos(estudiantes);
}

function eliminar(carne) {
    const estudiantes = leerEstudiantes();
    const nuevos = estudiantes.filter(e => e.carne !== carne);

    if (nuevos.length === estudiantes.length) {
        throw new Error("Estudiante no encontrado.");
    }

    guardarTodos(nuevos);
}

module.exports = {
    listar,
    buscarPorCarne,
    guardar,
    modificar,
    eliminar
};
