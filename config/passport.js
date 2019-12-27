const passport = require('passport');

//Permite iniciar sesion con un usuario y un password en una base de datos
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/usuarios');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
}, 
    async (email, password, next) => {
        //Codigo se ejecuta al llenar el formulario
        const usuario = await Usuarios.findOne({ 
                                            where : { email, activo : 1 } });

        //Revisar si existe o no 
        if(!usuario) return next(null, false, {
            message : 'Ese usuario no existe'
        });

        //El usuario existe, comparar su password
        const verificarPass = usuario.validarPassword(password);

        //Si el password es incorrecto
        if(!verificarPass) return next(null, false, {
            message : 'Password Incorrecto'
        });

        //Todo bien
        return next(null, usuario);

    } 

))

passport.serializeUser(function(usuario, cb) {
    cb(null, usuario);
});

passport.deserializeUser(function(usuario, cb) {
    cb(null, usuario);
});

module.exports = passport;



























