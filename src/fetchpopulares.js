const fechtpopulares = async() =>{
    
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos.results;

    }catch(error){
        console.log(error);
    }
}

export default fechtpopulares;


//hacemos la peticion a la api