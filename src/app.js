const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req,res)=>{
    res.send("hola mundo");
})

app.listen(PORT, function () { console.log(`Servidor corriendo en el puerto ${PORT}`) });