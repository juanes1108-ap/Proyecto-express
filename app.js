const express = require('express');
const app = express();
const sistemaArchivo = require("fs");
const ruta = require("path");
const multer = require("multer");
require("dotenv/config");
const jwt = require("jsonwebtoken")

// Importación de validaciones y middlewares
const { validarAprendiz, generarId } = require("./utilidades/validaciones");
const registroMiddleware = require("./middleware/registroMiddleware");
const autenticadorMiddleware = require("./middleware/autenticadorMiddleware")

// Importación del manejador de errores
// Nota: Si en manejadorErrores.js exportas con "module.exports = { manejadorErrores }", 
// usa: const { manejadorErrores } = require("./middleware/manejadorErrores");
const manejadorErrores = require("./middleware/manejadorErrores");

const PUERTO = process.env.PUERTO || 5000;

// Middlewares globales de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Servir la carpeta de imágenes estáticas (opcional pero recomendado para ver las imágenes cargadas)
app.use('/misimagenes', express.static(ruta.join(__dirname, 'misimagenes')));

// Configurar almacenamiento de archivos con multer
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "misimagenes");
  },
  filename: (req, file, cb) => {
    const extensionArchivos = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extensionArchivos}`);
  }
});

const SubirArchivo = multer({ storage: almacenamiento });

// Middleware para logs de tiempo
app.use((req, res, next) => {
  console.log(`tiempo milisegundos: ${Date.now()}`);
  console.log(`fecha: ${new Date().toISOString()}`);
  next();
});

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
app.post("/api/aprendices", SubirArchivo.single("imagen"), (req, res) => {
  const nuevoAprendiz = req.body;

  const resultadoValidacion = validarAprendiz(nuevoAprendiz);
  if (!resultadoValidacion.esValido) {
    return res.status(400).json({ 
      error: "Datos no válidos", 
      detalles: resultadoValidacion.errores 
    });
  }

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

// Endpoints en construcción
app.put("/api/aprendices/:id", (req, res) => {
  res.status(200).json({ Mensaje: "endpoint en contruccion para modificar aprendices" });
});

app.delete("/api/aprendices/:id", (req, res) => {
  res.status(200).json({ Mensaje: "endpoint en contruccion de eliminar aprendices" });
});

// Endpoint para provocar un error intencional
app.get("/error", (req, res, next) => {
  next(new Error("error intencional para probar"));
});

//ruta protegida, necesita un token
app.get("/rutaprotegida", autenticadorMiddleware, (req, res)=>{
  res.json({mensaje:"esta ruta esta protegida"})
})

//endpoint iniciar sesion,generar token
app.post("/login", (req, res)=>{
  //capturar usuario y clave
  const {usuario, clave} = req.body
  const usuarioBd = {"user": "esteban", "clave": "abc1234"}
  //verificar datos
  if(usuario !== usuarioBd.user || clave !== usuarioBd.clave){
    res.json({mensaje: "credenciales incorrectas"})
  }
  //generar el token
  const token = jwt.sign({usuario:usuario}, process.env.JWT_SECRETO, {expiresIn: "2h"}
  )
  res.json({token: token})
})


// Middleware de manejo de errores (SIEMPRE debe ir de último, antes de app.listen)
app.use(manejadorErrores);

app.listen(PUERTO, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${PUERTO}`);
});