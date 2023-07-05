'use strict';

//obtenemos los generos con su id y nombre
const fetchgeneros = async (filtro = 'movie') => {
    //comprovamos que valor tiene el filtro
    const tipo = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos.genres;

    }catch(error){
        console.log(error);
    }
    

};

const obtenergenero = (id, generos) => {
    let genero;
    // comprobamos el id del elmento con el id de la pelicula
    generos.forEach((elemento) => {
        if(id === elemento.id){
        genero = elemento.name;
        }
    });
    return genero
};

const fechtpopulares = async(filtro = 'movie') =>{
    const tipo = filtro === 'movie' ? 'movie':'tv';

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    try{
        //obtenemos las peliculas
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;

        const generos = await fetchgeneros();
        
        resultados.forEach((resultado) => {
            //obtenemso el genero de cada pelicula y le ponemos en una nueva propieda
            resultado.genero = obtenergenero(resultado.genre_ids[0],generos );

        });

        return   resultados;


    }catch(error){
        console.log(error);
    }
};


//hacemos la peticion a la api

const cargartitulos = (resultados, tipo) =>{

    //selecionamos el contenedor
    const contenedor = document.querySelector('#populares .main__grid');
    //reiniciamos el contenedor antes de cargar el siguiente
    contenedor.innerHTML = '';

    
    
    //creamos una plantilla por cada resultado de fetchpopulares.js
    resultados.forEach((resultado) => {
        //aqui cambio el resultado.name por que la peticion es distinta para cada uno 
        let titulo;
        if (tipo === 'serie') {
            titulo = resultado.name;
        } else {
            titulo = resultado.title;
        }


        const plantilla = `
    <div class="main__media">
        <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path
            }" alt="" />
        </a>
        <p class="main__media-titulo">${titulo}</p>
        <p class="main__media-fecha">${resultado.genero}</p>
    </div>
    `;

    //insertamos la plantilla en el DOM
    contenedor.insertAdjacentHTML('beforeend', plantilla);
    });

    
};

const contenedorgenero = document.getElementById('filtro-generos');

//cargarmos los botones de genero
const cargargeneros = async(filtro) => {
    //tremos los generos y con filtro entro movi o tv
     const generos = await fetchgeneros(filtro);            
     //eliminamos los botones para cargar los nuevos
     contenedorgenero.innerHTML = '',
     
     generos.forEach((genero) => {                          //creamos un botton por cada uno con forEach  
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.innerText = genero.name;
            btn.setAttribute('data-id', genero.id);

            contenedorgenero.appendChild(btn);             //aqui aderimos el boton al DOM
            
        });
    };

const filtropelicula = document.getElementById('movie');
const filtroserie =  document.getElementById('tv');


filtropelicula.addEventListener('click', async(e) =>{
    e.preventDefault();
    //cargamos en barra lateral los generos
    cargargeneros('movie');
    //obtenemos los resultados
    const resultados = await fechtpopulares('movie');
    //los cargamso en el DOM
    cargartitulos(resultados);

    filtroserie.classList.remove('btn--active');
    filtropelicula.classList.add('btn--active');

    document.querySelector('#populares .main__titulo').innerText = 'peliculas populares';
});

filtroserie.addEventListener('click', async(e) =>{
    e.preventDefault();

    cargargeneros('tv');

    const resultados = await fechtpopulares('tv');
    
    cargartitulos(resultados, 'serie');

    filtropelicula.classList.remove('btn--active');
    filtroserie.classList.add('btn--active');

    document.querySelector('#populares .main__titulo').innerText = 'series populares';

});

const cargar = async () => {
    const resultados = await fechtpopulares();
    cargartitulos(resultados);
    cargargeneros('movie');
};

cargar();
cargargeneros();
//# sourceMappingURL=bundle.js.map
