const obtenergenero = (id, generos) => {
    let genero;
    // comprobamos el id del elmento con el id de la pelicula
    generos.forEach((elemento) => {
        if(id === elemento.id){
        genero = elemento.name;
        }
    });
    return genero
}

export default obtenergenero