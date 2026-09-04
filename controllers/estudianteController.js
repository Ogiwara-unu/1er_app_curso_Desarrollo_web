/**
 * ==========================================
 * Controlador de Estudiantes
 * ==========================================
 */
 
const Estudiante = require("../models/Estudiante");
const EstudianteService = require("../services/EstudianteService");
 
/*=========================================
  Listar estudiantes
=========================================*/
 
function listar(req, res) {
 
    try {
 
        const estudiantes = EstudianteService.listar();
 
        res.json(estudiantes);
 
    }
    catch (error) {
 
        res.status(500).json({
 
            mensaje: error.message
 
        });
 
    }
 
}
 
/*=========================================
  Buscar estudiante
=========================================*/
 
function buscar(req, res) {
 
    try {
 
        const carne = req.params.carne;
 
        const estudiante =
            EstudianteService.buscarPorCarne(carne);
 
        if (!estudiante) {
 
            return res.status(404).json({
 
                mensaje: "Estudiante no encontrado."
 
            });
 
        }
 
        res.json(estudiante);
 
    }
    catch (error) {
 
        res.status(500).json({
 
            mensaje: error.message
 
        });
 
    }
 
}
 
/*=========================================
  Guardar estudiante
=========================================*/
 
function guardar(req, res) {
 
    try {
 
        const estudiante = new Estudiante(
 
            req.body.carne,
 
            req.body.nombre,
 
            req.body.apellidos,
 
            req.body.carrera,
 
            Number(req.body.promedio)
 
        );
 
        EstudianteService.guardar(estudiante);
 
        res.status(201).json({
 
            mensaje: "Estudiante guardado correctamente."
 
        });
 
    }
    catch (error) {
 
        res.status(400).json({
 
            mensaje: error.message
 
        });
 
    }
 
}
 
/*=========================================
  Modificar estudiante
=========================================*/
 
function modificar(req, res) {
 
    try {
 
        const estudiante = new Estudiante(
 
            req.body.carne,
 
            req.body.nombre,
 
            req.body.apellidos,
 
            req.body.carrera,
 
            Number(req.body.promedio)
 
        );
 
        EstudianteService.modificar(estudiante);
 
        res.json({
 
            mensaje: "Estudiante modificado correctamente."
 
        });
 
    }
    catch (error) {
 
        res.status(400).json({
 
            mensaje: error.message
 
        });
 
    }
 
}
 
/*=========================================
  Eliminar estudiante
=========================================*/
 
function eliminar(req, res) {
 
    try {
 
        const carne = req.params.carne;
 
        EstudianteService.eliminar(carne);
 
        res.json({
 
            mensaje: "Estudiante eliminado correctamente."
 
        });
 
    }
    catch (error) {
 
        res.status(400).json({
 
            mensaje: error.message
 
        });
 
    }
 
}
 
/*=========================================
  Exportar funciones
=========================================*/
 
module.exports = {
 
    listar,
 
    buscar,
 
    guardar,
 
    modificar,
 
    eliminar
 
};