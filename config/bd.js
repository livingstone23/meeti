const Sequelize = require('sequelize');

module.exports = new Sequelize('meeti','postgres','admin',{
    host:'127.0.0.1',
    port: '5433',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    },
    ////codigo que permite ver las columnas para conocer cuando fue
    ////creado el registro y la ultima vez que se actualizo
    // define: {
    //     timestamps : false
    // },
    logging : false
})