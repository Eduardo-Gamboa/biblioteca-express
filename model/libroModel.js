module.exports={
    obtener:function(conex, funcion){
        conex.query("SELECT *FROM libros", funcion);
    },
    agregar:function(conex, datos, archivo, funcion){
        conex.query("insert into libros (nombre, imagen) values(?, ?)", [datos.nombre, archivo.filename], funcion)
    },
    eliminar:function(conex, id, funcion) {
        conex.query("delete from libros where id = ?", [id], funcion)
    },
    retornarDatosID:function (conex, id, funcion) {
        conex.query("Select *from libros where id=?", [id], funcion);
    },
    actualizar:function name(conex, datos, funcion){
        conex.query("update libros set nombre =? where id=?", [datos.nombre, datos.id], funcion)
    },
    actualizarArchivo:function name(conex, datos, archivo, funcion){
        conex.query("update libros set imagen =? where id=?", [archivo.filename, datos.id], funcion)
    }
}