const Grupos = require('../models/grupos')

exports.panelAdministracion = async (req, res) => {
    const grupos = await Grupos.findAll( { where: { usuarioId : req.user.id }} )

    res.render('administracion', {
        nombrePagina : 'Panel de administracion', 
        grupos
    })
}