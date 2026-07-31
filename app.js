//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 5050;

app.get("/", (_, res) => {
  res.send(`Aprendiendo express, ficha 3407181, ADSO en el curso de desarrollo web el 31 de julio de 2026`);
});

//otro endpoint


app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
}); 