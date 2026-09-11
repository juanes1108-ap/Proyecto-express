const express = require('express');
const app = express();
require("dotenv/config");

const PUERTO = process.env.PUERTO || 5000;

//importar libreria para subir archivos
const multer = require("multer");


// Middleware para que Express entienda JSON en las peticiones POST
app.use(express.json());
// Middleware para que Express entienda datos codificados en URL (formulario)
app.use(express.urlencoded({ extended: true }));
//configurar para lectura de archivos
const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaArchivoJson = ruta.join(__dirname, "datos.json");

// Endpoint raíz
app.get("/", function(req, res) {
  res.send('API Rest - Aprendices');
});

// Endpoint para VER los datos del archivo
app.get("/api/aprendices", function(req, res) {
  sistemaArchivo.readFile(rutaArchivoJson, "utf8", function(error, datos) {
    if (error) {
      return res.status(500).json({ error: "Error al leer los datos" });
    }
    const listaAprendices = JSON.parse(datos);
    res.json(listaAprendices);
  });
});

// Endpoint para AGREGAR un aprendiz
app.post("/api/aprendices", (req, res) => {
  const nuevoAprendiz = req.body; // Recibe los datos enviados en la petición

  sistemaArchivo.readFile(rutaArchivoJson, "utf8", (error, datos) => {
    if (error) {
      return res.status(500).json({ error: "Error al leer los datos" });
    }

    const listaAprendices = JSON.parse(datos);
    listaAprendices.push(nuevoAprendiz);

    sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        return res.status(500).json({ error: "No se pudo guardar el aprendiz" });
      }
      res.status(201).json({ Mensaje: "Aprendiz agregado correctamente" });
    });
  });
});

app.listen(PUERTO, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${PUERTO}`);
});