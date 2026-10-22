require("dotenv").config()
const express = require("express")
const enrutadorGeneral = require("./routers")

const miApp = express()

//mi aplicacion utiliza los middleware
miApp.use(express.json())
miApp.use(express.urlencoded({extended: true}))
//mportar middlewware propio 

//ruta principal de mi app 
miApp.get("/", (req, res )=>{
    res.send("Mi API Rest ficha 3407181.")
})

miApp.use("/api", enrutadorGeneral) 

module.exports = miApp