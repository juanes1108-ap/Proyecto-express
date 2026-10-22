//utillzar pirsma 
const ormPrisma = require("../config/conexion")
const listar = async() => {
    const datos = await ormPrisma.usuario.findMany()
    return datos
}

const crear = async(email, name, clave, foto)=>{
    const userNew = await ormPrisma.usuario.create({data:{
        email: email,
        name: name,
        clave: clave,
        foto: foto
    }})
    return userNew
}


module.exports  = {listar,crear}