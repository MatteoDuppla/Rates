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

const usersRoutes = require('./routes/userRouter');
const ratesRoutes = require('./routes/rateRouter');

app.use('/users', usersRoutes);
app.use('/rates', ratesRoutes);



app.get('/crearcarpetadrive', (req, res) => {
    const name = req.query.name;
    const parentUrl = req.query.parent_url;

    if (!name || !parentUrl) {
        return res.status(400).send('Faltan parámetros en la solicitud');
    }
    
    const data = {
        name: name,
        parent_url: parentUrl
      };
      
      fetch(process.env.DRIVE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => res.send('Carpeta creada en Google Drive'))
        .catch(error => res.sendStatus(400));
  });

app.get('*', (req, res) => {
    res.redirect('/users/login')
})

app.listen(PORT, function () { console.log(`Servidor corriendo en el puerto ${PORT}`) });