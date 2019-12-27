const Usuarios = require('../models/usuarios');
const enviarEmail = require('../handlers/emails');

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
        

        //Url de confirmacion 
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        //Enviar Email de confirmacion 
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirma tu cuenta de Meeti',
            archivo: 'confirmar-cuenta'
        });
        
        //const nuevoUsuario = await Usuarios.create(usuario);

        //Flash Message y redireccionar
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

//Confirma la suscripcion del usuario 
exports.confirmarCuenta = async (req, res, next) => {
    //Verificar que el usuario existe
    const usuario = await Usuarios.findOne({ where : { email: req.params.correo }});

    //console.log(req.params.correo);
    //console.log(usuario);

    //si no existe, redireccionar
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/crear-cuenta');
        return next();

    }

    //si existe, confirmar suscripcion y redireccionar
    //console.log(usuario.activo);
    usuario.activo = 1;
    await usuario.save();

    req.flash('exito','La cuenta se ha confirmado ya puedes iniciar sesión');
    res.redirect('/iniciar-sesion');
}

// Formulario para iniciar sesion 
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión'
    });
};












