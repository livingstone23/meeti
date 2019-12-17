const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router =  require('./routes');



//Configuracion y Modelos BD 
const db = require('./config/bd');
    require('./models/usuarios');
    db.sync().then(() => console.log('DB Conectado')).catch((error) => console.log(error)); 



//Variables de desarrollo
require('dotenv').config({path: 'variables.env'});



//Aplicacion principal
const app = express();



//Body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));



//Habilitar EJS como template engine
app.use(expressLayout);
app.set('view engine', 'ejs');



//Ubicacion de las vistas
app.set('views',path.join(__dirname, './views'));



//archivos staticos
app.use(express.static('public'));



//habilitar cookie parser
app.use(cookieParser());



//crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave : false,
    saveUninitialized : false
}))



//Agrega flash messages
app.use(flash());



//Middleware (usuario, logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});



//Routing
app.use('/', router ());



//Agrega el puerto
app.listen(process.env.PORT,() => {
    console.log('el servidor esta funcionando');
});


