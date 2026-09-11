const express = require("express");
 
const path = require("path");
 
const app = express();
 
 
/*
=================================
Middleware
=================================
*/
 
 
app.use(express.json());
 
app.use(express.urlencoded({
    extended:true
}));
 
 
/*
=================================
Archivos públicos
=================================
*/
 
app.use(express.static(
    path.join(__dirname,"public")
));
 
 
/*
=================================
Rutas
=================================
*/
 
const authRoutes =
require("./routes/authRoutes");
 
 
const estudianteRoutes =
require("./routes/estudianteRoutes");
 
 
app.use("/",authRoutes);
 
app.use("/",estudianteRoutes);
 
 
 
/*
=================================
Servidor
=================================
*/
 
app.listen(2000,()=>{

    console.log(
        "Servidor iniciado en puerto 2000"
    );

});
 
 
 
 
 
 
/* // ==========================================
// Importación de módulos
// ==========================================
 
const express = require("express");
const path = require("path");
 
// ==========================================
// Crear la aplicación Express
// ==========================================
 
const app = express();
 
// ==========================================
// Configuración
// ==========================================
 
const PORT = 3000;
 
// ==========================================
// Middleware
// ==========================================
 
// Permite recibir datos JSON
 
app.use(express.json());
 
// Permite recibir datos enviados desde formularios HTML
 
app.use(express.urlencoded({ extended: true }));
 
// Archivos públicos
// CSS
// JavaScript
// imágenes
 
app.use(express.static(path.join(__dirname, "public")));
 
// ==========================================
// Importar rutas
// ==========================================
 
const authRoutes = require("./routes/authRoutes");
const estudianteRoutes = require("./routes/estudianteRoutes");
 
// ==========================================
// Registrar rutas
// ==========================================
 
app.use("/", authRoutes);
 
app.use("/", estudianteRoutes);
 
// ==========================================
// Ruta para páginas inexistentes
// ==========================================
 
app.use((req, res) => {
 
    res.status(404).send("Error 404 - Página no encontrada");
 
});
 
// ==========================================
// Iniciar servidor
// ==========================================
 
app.listen(PORT, () => {
 
    console.log("--------------------------------");
 
    console.log("Servidor iniciado correctamente");
 
    console.log("Puerto:", PORT);
 
    console.log("http://localhost:" + PORT);
 
    console.log("--------------------------------");
 
}); */