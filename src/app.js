const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const cors = require('cors');
const session = require("express-session");
const cookies = require('cookie-parser');
require('dotenv').config();
const jsforce = require('jsforce');

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

async function crearCarpeta(data) {
    try {
      const response = await fetch(process.env.DRIVE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }


  app.get('/crearcarpetadrive', async (req, res) => {
    const name = req.query.name;
    const parentUrl = req.query.parent_url;
    const id =  req.query.id;

    if (!name || !parentUrl) {
        return res.status(400).send('Faltan parámetros en la solicitud');
    }

    try {
        const folderResponse = await crearCarpeta({ name, parent_url: parentUrl });
        const jsforce = require("jsforce");const conn = new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            // loginUrl : "https://test.salesforce.com"
        });

        conn.login(process.env.USER, process.env.PASSWORD + process.env.SECURITY_TOKEN, (err, userInfo) => {
            if (err) { return console.error(err); }
          
            // update the Carpeta_Drive_URL__c field of an opportunity record
            const fields = { Carpeta_Drive_URL__c: folderResponse };
            conn.sobject('Opportunity').update({ Id: id, ...fields }, (err, result) => {
              if (err) { return console.error(err); }
              console.log(result);
            });
        });
        
        const folders = [
            {
                name: 'CONTABILIDAD',
                parent_url: folderResponse,
            },
            {
                name: 'COMERCIAL',
                parent_url: folderResponse,
            },
            {
                name: 'LEGAL',
                parent_url: folderResponse,
            },
        ];
        for (let folder of folders) {
            const folderResponse = await crearCarpeta(folder);
            console.log('Respuesta:', folderResponse);
        }
        console.log('Respuesta:', folderResponse);
        res.send('Carpeta creada en Google Drive');
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error.message);
    }
});





app.get('*', (req, res) => {
    res.redirect('/users/login')
})

app.listen(PORT, function () { console.log(`Servidor corriendo en el puerto ${PORT}`) });