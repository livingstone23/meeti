const Grupos = require('../models/grupos');

//Muestra el formulario para nuevos meetis
exports.formNuevoMeeti = async (req, res) => {
    const grupos = await Grupos.findAll({ where : { usuarioId : req.user.id }});

    //console.log(grupos);
    res.render('nuevo-meeti',{
        nombrePagina : 'Crear Nuevo Meeti',
        grupos
    })

}







