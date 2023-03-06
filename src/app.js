const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const cors = require('cors');
const session = require("express-session");
const cookies = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(cookies())
app.use(session({
    secret: "Esto es un secreto",
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req,res)=>{
    res.send("hola mundo");
})

app.listen(PORT, function () { console.log(`Servidor corriendo en el puerto ${PORT}`) });