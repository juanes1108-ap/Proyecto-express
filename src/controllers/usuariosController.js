const crear = require("../services/usuariosServices")
const { usuario } = require("../config/conexion")
const listar = require("../services/usuariosServices")
const listarUsuarios = async(req,res) =>{
    try {
        const usuarios = await listar()
        res.status(200).json({usuarios})
    } catch (error) {
        res.status(500).json({"error-mensaje":error.message})
    }

}

const crearUsuario = async(req, res)=>{
    try {
        const {email, name, clave, foto} = req.body
        const usuarioNuevo = await crear(email, name, clave, foto)
        res.status(201).json({usuarios})
    } catch (error) {
        res.status(500).json({"error-mensaje":error.message})
    }

}

module.exports = listarUsuarios,crearUsuario