const jwt = require ("jsonwebtoken")
//funcion para generar - verificador
const autenticadorMiddleware = (req, res, next)=> {
    const token = req.header("autenticar")?.split(" ")[1]
    if(!token){
        res.status(401).json({mensaje:"Acceso denegado no proporcina un token"})
    }
    jwt.verify(token, process.env.JWT_SECRETO, (error, usuario)=>{
        if(error){
            res.status(403).json({mensaje: "Token invalido"})
        }
        res.usuario = usuario
    })
}

module.exports = autenticadorMiddleware