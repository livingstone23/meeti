const Categorias =require('../models/Categorias');
const Grupos = require('../models/grupos');
const uuid = require('uuid/v4');


exports.formNuevoGrupo = async (req, res) => {
    const categorias = await Categorias.findAll();
    
    
    

    res.render('nuevo-grupo',{
        nombrePagina : 'Crea un nuevo grupo',
        categorias
    });
};

//Almacena los grupos en la BD
exports.crearGrupo = async (req, res) => {
    //sanitizar
    req.sanitizeBody('nombre');
    req.sanitizeBody('url');


    const grupo = req.body;
    //almacena el usuario autenticado como el creador del grupo
    grupo.usuarioId = req.user.id;

    //grupo.categoriaId = request.body.categoria;
    grupo.id = uuid();

    try {
        //Almacena en la BD
        await Grupos.create(grupo);
        req.flash('Exito', 'Se ha creado el Grupo Correctamente');
        res.redirect('/administracion');

    } catch (error) {
        const erroresSequelize = error.errors.map( err => err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nuevo-grupo');
        
    }
    
}




