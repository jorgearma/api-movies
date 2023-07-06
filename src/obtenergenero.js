// Definimos una función llamada obtenergenero que toma un id y una lista de generos
const obtenergenero = (id, generos) => {
    let genero; // Declaramos una variable que almacenará el nombre del genero

    // Recorremos cada elemento en la lista de generos
    generos.forEach((elemento) => {
        // Si el id del elemento es igual al id dado
        if(id === elemento.id){
            // Asignamos el nombre del elemento (genero) a la variable genero
            genero = elemento.name;
        }
    });
    // Devolvemos el nombre del genero que corresponde al id dado
    return genero
}

// Exportamos la función obtenergenero para que se pueda usar en otros módulos
export default obtenergenero;
