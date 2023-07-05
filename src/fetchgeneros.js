//obtenemos los generos con su id y nombre
const fetchgeneros = async (filtro = 'movie') => {
    //comprovamos que valor tiene el filtro
    const tipo = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos.genres;

    }catch(error){
        console.log(error);
    }
    

}

export default fetchgeneros;