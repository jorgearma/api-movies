import fetchgeneros from "./fetchgeneros";
import obtenergenero from "./obtenergenero";

const fetchbusqueda = async(pagina = 1) => {
    //aqui vemos que filtro tenemos selecionado movie or tv 
    const tipo = document.querySelector('.main__filtros .btn--active').id;
    //acedemos al bton para saber cual tiene al active 
    const idGenero = document.querySelector('#filtro-generos .btn--active')?.dataset.id;
    //sacamso lso datos de year del DOM
    const yearinical = document.getElementById('años-min').value || 1950;
    const yearfinal = document.getElementById('años-max').value || 2023;
    //peticion al endpoint
    let url;
	if (tipo === 'movie') {
		url = `https://api.themoviedb.org/3/discover/movie?api_key=3920b5092f07054465522c38a24bcee3&language=es-MX&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${idGenero}&primary_release_date.gte=${yearinical}-01-01&primary_release_date.lte=${yearfinal}-12-31&region=US&page=${pagina}`;
	} else if (tipo === 'tv') {
		url = `https://api.themoviedb.org/3/discover/tv?api_key=3920b5092f07054465522c38a24bcee3&language=es-MX&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${idGenero}&first_air_date.gte=${yearinical}-01-01&first_air_date.lte=${yearfinal}-12-31&region=US&page=1${pagina}`;
	}
    try{
        const respuesta = await fetch(url)
            const datos = await respuesta.json();
            const resultados = datos.results;
            //por cada resultado sacamos el genero 
            const generos = await fetchgeneros();
            resultados.forEach((resultado) => {
            //obtenemso el genero de cada pelicula y le ponemos en una nueva propieda
            resultado.genero = obtenergenero(resultado.genre_ids[0],generos )

        });

            return resultados;
        }catch(e){
        console.log(e);
    }

}

export default fetchbusqueda