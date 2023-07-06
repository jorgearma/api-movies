// Importamos las funciones fetchgeneros y obtenergenero de sus respectivos módulos
import fetchgeneros from "./fetchgeneros";
import obtenergenero from "./obtenergenero";

// Definimos una función asincrónica llamada fechtpopulares
const fechtpopulares = async(filtro = 'movie') =>{
    
    // Checamos si el filtro es 'movie' o no, asignando la palabra 'movie' o 'tv' a la variable tipo
    const tipo = filtro === 'movie' ? 'movie':'tv';

    // Creamos la URL que vamos a usar para obtener los datos de la API de The Movie DB
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

    try{
        // Hacemos una petición fetch a la URL
        const respuesta = await fetch(url);
        // Convertimos la respuesta en un objeto JSON
        const datos = await respuesta.json();
        // Extraemos los resultados de los datos
        const resultados = datos.results;

        // Llamamos a la función fetchgeneros para obtener los géneros
        const generos = await fetchgeneros();
        // Iteramos sobre cada resultado
        resultados.forEach((resultado) => {
            // Usamos la función obtenergenero para obtener el nombre del genero correspondiente a la id del genero en cada resultado y lo asignamos a una nueva propiedad 'genero' en el resultado
            resultado.genero = obtenergenero(resultado.genre_ids[0],generos )
        });

        // Devolvemos los resultados con el género añadido
        return resultados;

    }catch(error){
        // En caso de cualquier error, lo imprimimos en la consola
        console.log(error);
    }
}

// Exportamos la función fechtpopulares para que se pueda usar en otros módulos
export default fechtpopulares;

