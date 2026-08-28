//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 5050;
//uso de middleware bode-parse
app.use(express.json())

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

//endpoint
app.post("/ruta2", (req, res)=>{
  const todosDatos = req.body
  const name = req.body.nombre
  const lastname =  req.body.cargo
  res.status(201).json({Datos: todosDatos, nombre: name, cargo: lastname})
})

// Endpoint de login con validaciones
app.post("/login", (req, res) => {
  const { usuario, perfil, contraseña } = req.body;
  
  // Validar datos faltantes
  if (!usuario && !perfil && !contraseña) {
    return res.status(400).json({
      mensaje: "No se enviaron datos. Por favor proporcione usuario, perfil y contraseña."
    });
  }
  
  if (!usuario) {
    return res.status(400).json({
      mensaje: "Falta el campo 'usuario'. Por favor ingrese su usuario."
    });
  }
  
  if (!perfil) {
    return res.status(400).json({
      mensaje: "Falta el campo 'perfil'. Por favor ingrese su perfil (Admin/User)."
    });
  }
  
  if (!contraseña) {
    return res.status(400).json({
      mensaje: "Falta el campo 'contraseña'. Por favor ingrese su contraseña."
    });
  }
  
  // Validar el perfil
  if (perfil !== "Admin" && perfil !== "User") {
    return res.status(400).json({
      mensaje: "Perfil no válido. Los perfiles permitidos son: 'Admin' o 'User'."
    });
  }
  
  // Mensaje según el perfil
  if (perfil === "Admin") {
    return res.status(200).json({
      mensaje: `Bienvenido Administrador ${usuario}. Tiene acceso completo al sistema.`
    });
  } else if (perfil === "User") {
    return res.status(200).json({
      mensaje: `Bienvenido Usuario ${usuario}. Tiene acceso limitado al sistema.`
    });
  }
});


app.listen(port, function() {
  console.log(`SERVIDOR: http://localhost:${port}`);
}); 