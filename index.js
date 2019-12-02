const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const router =  require('./routes');



require('dotenv').config({path: 'variables.env'})



const app = express();



//Habilitar EJS como template engine
app.use(expressLayout);
app.set('view engine', 'ejs');



//Ubicacion de las vistas
app.set('views',path.join(__dirname, './views'));



//archivos publicos
app.use(express.static('public'));



//Middleware (usuario, logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})



//Routing
app.use('/', router ());



//Agrega el puerto
app.listen(process.env.PORT,() => {
    console.log('el servidor esta funcionando');
});


