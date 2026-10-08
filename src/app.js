require("dotenv").config()
const express = require("express")


const miApp = express()

//mi aplicacion utiliza los middleware
miApp.use(express.json())
miApp.use(express.urlencoded({extended: true}))
//mportar middlewware propio 

//ruta principal de mi app 
miApp.get("/", (req, res )=>{
    res.send("Mi API Rest ficha 3407181.")
})


module.exports = miApp