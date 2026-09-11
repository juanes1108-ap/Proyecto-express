const express = require('express');
const app = express();
require("dotenv/config");
//importacion de validaciones||||||||||||||||
const { validarAprendiz, generarId } = require("./utilidades/validaciones");

//importar middleware de registro
const registroMiddleware = require("./middleware/registroMiddleware");
app.use(registroMiddleware);

const PUERTO = process.env.PUERTO || 5000;

//importar libreria para subir archivos|||||||||||||||||
const multer = require("multer");
//configurar aalmacenamiento de archivos||||||||||||||||
const almacenamiento = multer.diskStorage(
  {destination: (req, file, cb) => {
    cb(null,"misimagenes")
  },
  filename: (req, file, cb) => {
    const extensionArchivos = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extensionArchivos}`);
  }
})

const SubirArchivo = multer({storage: almacenamiento});

// Middleware para que Express entienda JSON en las peticiones POST|||||||||||||||||||
app.use(express.json());
// Middleware para que Express entienda datos codificados en URL (formulario)|||||||||||||||
app.use(express.urlencoded({ extended: true }));



// Middleware creados|||||||||||||||||||||||||||||||||
app.use((req, res, next) => {
  console.log(`tiempo milisegundos: ${Date.now()}`);
  console.log(`fecha: ${new Date().toISOString()}`);
  next();
});




//configurar para lectura de archivos
const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaArchivoJson = ruta.join(__dirname, "datos.json");

// Endpoint raíz
app.get("/", function(req, res) {
  res.send('API Rest - Aprendices');
});

// Endpoint para VER los datos del archivo|||||||||||||
app.get("/api/aprendices", function(req, res) {
  sistemaArchivo.readFile(rutaArchivoJson, "utf8", function(error, datos) {
    if (error) {
      return res.status(500).json({ error: "Error al leer los datos" });
    }
    const listaAprendices = JSON.parse(datos);
    res.json(listaAprendices);
  });
});

// Endpoint para AGREGAR un aprendiz||||||||||||||||||||||||||||||||||
app.post("/api/aprendices", SubirArchivo.single("imagen"), (req, res) => {
  const nuevoAprendiz = req.body; // Recibe los datos enviados en la petición

  // Validar datos antes de procesar
  const resultadoValidacion = validarAprendiz(nuevoAprendiz);
  if (!resultadoValidacion.esValido) {
    return res.status(400).json({ 
      error: "Datos no válidos", 
      detalles: resultadoValidacion.errores 
    });
  }

  // Generar ID automático|||||||||||||||||||||||
  nuevoAprendiz.id = generarId();
  nuevoAprendiz.imagen = req.file ? `/misimagenes/${req.file.filename}` : "sin imagen";

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



//endpoint para modificar aprendices
app.put("/api/aprendices/:id", (req, res) => {
  res.status(200).json({ Mensaje: "endpoint en contruccion para modificar aprendices" });
});
//endpoint para eliminar aprendices
app.delete("/api/aprendices/:id", (req, res) => {
  res.status(200).json({ Mensaje: "endpoint en contruccion de eliminar aprendices" });
});


app.listen(PUERTO, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${PUERTO}`);
});