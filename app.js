const express = require('express');
const app = express();
require("dotenv/config");
const PUERTO = process.env.PUERTO || 5000;

app.get("/", function(req, res) {
  res.send('API Rest - Aprendices');
});



app.listen(PUERTO, () =>{
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${PUERTO}`);
});