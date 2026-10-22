const {Router} = require ("express")
//necesita el controller
const listarUsuarios = require("../controllers/usuariosController")
const crearUsuarios = require("../controllers/usuariosController")
const enrutadorUsuario = new Router()

enrutadorUsuario.get("/LISTADO", listarUsuarios)
//enrutadorUsuario.get("/:id")
enrutadorUsuario.post("/CREAR", crearUsuarios)
//enrutadorUsuario.put("/ACTUALIZAR")
//enrutadorUsuario.delete("/ELIMINAR")

module.exports = enrutadorUsuario