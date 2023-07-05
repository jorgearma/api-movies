import fetchgeneros from "./fetchgeneros";
import obtenergenero from "./obtenergenero";

const fechtpopulares = async(filtro = 'movie') =>{
    const tipo = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

    try{
        //obtenemos las peliculas
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;

        const generos = await fetchgeneros();
        
        resultados.forEach((resultado) => {
            //obtenemso el genero de cada pelicula y le ponemos en una nueva propieda
            resultado.genero = obtenergenero(resultado.genre_ids[0],generos )

        });

        return   resultados;


    }catch(error){
        console.log(error);
    }
}

export default fechtpopulares;


//hacemos la peticion a la api