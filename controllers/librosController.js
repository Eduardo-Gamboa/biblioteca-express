var con = require("../config/conexion");
var libroModel = require("../model/libroModel");
var borrar = require("fs");

module.exports = {
    index: function (req, res) {

        libroModel.obtener(con, function (err, datos) {
            res.render('libros/index', { title: 'Aplicacion con Node JS y Express', libros: datos });
        });
    },

    crear: function (req, res) {
        res.render('libros/crear');
    },

    guardar:function(req, res){
        libroModel.agregar(con, req.body, req.file, function (err) {
             res.redirect('/libros');
        });
    },
    eliminar:function(req, res){
        console.log("Recepcion de datos");
        console.log(req.params.id);

        libroModel.retornarDatosID(con, req.params.id, function (err, registros) {
            var nombreImg = "public/images/" + (registros[0].imagen);
            if(borrar.existsSync(nombreImg)){
                borrar.unlinkSync(nombreImg);
            }else{}
            
            libroModel.eliminar(con, req.params.id, function (err) {
                res.redirect('/libros'); 
            });
        });
    },
    editar:function (req, res) {
        libroModel.retornarDatosID(con, req.params.id, function (err, registros) {
            console.log(registros[0]);
            res.render('libros/editar', {libro:registros[0]});
        });
    },

    actualizar:function (req,res) {
        console.log(req.body.nombre);
        if(req.body.nombre){
            libroModel.actualizar(con, req.body, function (err) {
                
            });
        }
        if(req.file){
            if(req.file.filename){
                libroModel.retornarDatosID(con, req.body.id, function (err, registros) {
                    var nombreImg = "public/images/" + (registros[0].imagen);
                    if(borrar.existsSync(nombreImg)){
                        borrar.unlinkSync(nombreImg);
                    }else{}
                    
                    libroModel.actualizarArchivo(con, req.body, req.file, function (err) {
                        
                    })
                });
            }
        }
        res.redirect('/libros');
        // console.log(req.file.filename);
    }
}

