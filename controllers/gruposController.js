const Categorias =require('../models/Categorias');
const Grupos = require('../models/grupos');
const uuid = require('uuid/v4');



const multer = require('multer');       //Paquete para subir archivos
const shortid = require('shortid');

const configuracionMulter = {
    limits : { fileSize: 200000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/grupos/');
        },
        filename : (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //el formato es valido
            next(null, true);
        } else {
            // el formato no es valido
            next(new Error('Formato no válido'), false);
        }
    }
}


const upload = multer(configuracionMulter).single('imagen');

//sube imagen en el servidor
exports.subirImagen = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            //console.log(error);
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE'){
                    req.flash('error', 'El Archivo es muy grande');
                } else {
                    req.flash('error', error.message);
                }
            } else if(error.hasOwnProperty('message')) {
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        } else {
            next();
        }
    })
}


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

    //leer la imagen
    if(req.file){
        grupo.imagen = req.file.filename;
    }
    


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




