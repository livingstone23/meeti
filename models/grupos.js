const Sequelize = require('sequelize');
const db = require('../config/bd');
const uuid = require('uuid/v4');
const Categorias = require('./categorias');
const Usuarios = require('./usuarios');

const Grupos = db.define('grupos',{
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    nombre:{
        type: Sequelize.TEXT(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg : 'El grupo debe tener un nombre'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT(500),
        allowNull: false,
        validate: {
            notEmpty: {
                msg : 'Coloca una descripción'
            }
        }
    },
    url: Sequelize.TEXT,
    imagen: Sequelize.TEXT   
})

Grupos.belongsTo(Categorias);
Grupos.belongsTo(Usuarios);

module.exports = Grupos;


























