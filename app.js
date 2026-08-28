const express = require('express');
const app = express();
require("dotenv/config");
const PUERTO = process.env.PUERTO || 5000;
//configurar para lectura del archivo
const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaArchivoJson = ruta.join(__dirname, "datos.json");


//endpointraiz
app.get("/", function(req, res) {
  res.send('API Rest - Aprendices');
});

//endpoint para ver los datos del archivo
app.get("/api/aprendices", function(req, res)  {
  //los datos se pueden traer de una base de datos, de un archivo,etc
  sistemaArchivo.readFile(rutaArchivoJson, "utf8", function(error, datos) {
    if (error) {
      return res.json({error:"Error al leer los datos"});
    }
    const listaAprendices = JSON.parse(datos);
    res.json(listaAprendices);
  });
});

//endpoint para agregar un aprendiz
app.post("/api/aprendices", (req, res) => {
  res.json({Mensaje: "trabajando en el endpoint"})
});


app.listen(PUERTO, () =>{
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${PUERTO}`);
});