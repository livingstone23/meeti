const Usuarios = require('../models/usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu Cuenta'
    });
}


exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    req.checkBody('confirmar', 'El password confirmado no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    //Leer los errores express
    const erroresExpress = req.validationErrors();

    //console.log(erroresExpress);

    try {
        await Usuarios.create(usuario);
        //const nuevoUsuario = await Usuarios.create(usuario);

        //TODO: Flash Message y redireccionar
        //console.log('Usuario creado', nuevoUsuario);
        req.flash('exito', 'Hemos enviado un E-mail, confirma tu cuenta');
        res.redirect('/iniciar-sesion');
    }
    catch(error) {

        // extraer el message de los errores
        const erroresSequelize = error.errors.map(err => err.message);

        //extraer unicamente el msg de los errores
        const errExp = erroresExpress.map(err => err.msg);

        //console.log(errExp);

        //unir los errores
        const listaerrores = [...erroresSequelize, ...errExp];

        //console.log(erroresSequelize);
        req.flash('error', listaerrores);
        res.redirect('/crear-cuenta');
    }
}

// Formulario para iniciar sesion 
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión'
    });
}












