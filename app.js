//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 5050;

app.get("/", (req, res) => {
  res.send(`Aprendiendo express, ficha 3407181, ADSO en el curso de desarrollo web el 31 de julio de 2026`);
});

//otro endpoint
app.get("/otraruta", (req, res) => {
  //usando template string
  res.send(`<h1>Hola desde otra ruta</h1>,
    <h2>end point con res.send</h2>`);
});

app.get("/ruta2", (req, res) => {
  res.json({
    nombre: "juan esteban",
    apellido: "angulo perez",
    cargo: "aprendiz",
  });
});


app.get("/ruta3/:aprendiz/:otrodato", (req, res) => {
  const dato_aprendiz = req.params.aprendiz;
  const otro_dato = req.params.otrodato;
  res.json({"nombre":dato_aprendiz, "otro_dato":otro_dato});
});
  

app.get("/ruta4", (req, res) => {
  //capturar la el parametro de consulta query
  const orden = req.query.orden || "sin ordenar";
  const pagina = req.query.pagina || 1;
  res.send(`<h1>listado de aprendices</h1>
    <p>lista de orden ${orden}</p>
    <p>pagina ${pagina}</p>`);
});

app.listen(port, function() {
  console.log(`SERVIDOR: http://localhost:${port}`);
}); 