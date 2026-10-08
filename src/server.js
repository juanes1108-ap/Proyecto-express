const  miApp = require("./app")

const PUERTO = process.env.PUERTO || 5000

miApp.listen(PUERTO, ()=>{
    console.log(`Servidor Corriendo: http://localhost:${PUERTO}`)
})