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
};

// Importamos las funciones fetchgeneros y obtenergenero de sus respectivos módulos

// Definimos una función asincrónica llamada fechtpopulares
const fechtpopulares = async(filtro = 'movie') =>{
    
    // Checamos si el filtro es 'movie' o no, asignando la palabra 'movie' o 'tv' a la variable tipo
    const tipo = filtro === 'movie' ? 'movie':'tv';

    // Creamos la URL que vamos a usar para obtener los datos de la API de The Movie DB
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=3920b5092f07054465522c38a24bcee3&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

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
            resultados.genero = obtenergenero(resultado.genre_ids[0],generos );
        });

        // Devolvemos los resultados con el género añadido
        return resultados;

    }catch(error){
        // En caso de cualquier error, lo imprimimos en la consola
        console.log(error);
    }
};

const cargartitulos = (resultados, tipo) =>{

    //selecionamos el contenedor
    const contenedor = document.querySelector('#populares .main__grid');
    //reiniciamos el contenedor antes de cargar el siguiente
    contenedor.innerHTML = '';

    
    
    //creamos una plantilla por cada resultado de fetchpopulares.js
    resultados.forEach((resultado) => {
       


        const plantilla = `
    <div class="main__media" data-id="${resultado.id}">
        <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path
            }" alt="" />
        </a>
        <p class="main__media-titulo">${resultado.title || resultado.name}</p>
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

const contenedor$1 =document.getElementById('filtro-generos');
contenedor$1.addEventListener('click' , (e) => {
    e.preventDefault();

    if(e.target.closest('button')){
        contenedor$1.querySelector('.btn--active')?.classList.remove('btn--active');


        e.target.classList.add('btn--active');        

    }

});

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
    
    cargartitulos(resultados);

    filtropelicula.classList.remove('btn--active');
    filtroserie.classList.add('btn--active');

    document.querySelector('#populares .main__titulo').innerText = 'series populares';

});

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
        const respuesta = await fetch(url);
            const datos = await respuesta.json();
            const resultados = datos.results;
            //por cada resultado sacamos el genero 
            const generos = await fetchgeneros();
            resultados.forEach((resultado) => {
            //obtenemso el genero de cada pelicula y le ponemos en una nueva propieda
            resultado.genero = obtenergenero(resultado.genre_ids[0],generos );

        });

            return resultados;
        }catch(e){
        console.log(e);
    }

};

const btn = document.getElementById('btn-buscar');

btn.addEventListener('click', async(e) => {
    const resultados = await fetchbusqueda();

    cargartitulos(resultados);
});

const anterior = document.getElementById('pagina-anterior');
const siguiente = document.getElementById('pagina-siguiente');

siguiente.addEventListener('click', async(e) => {
    //obtenemos el numero de la pagina actual
    const paginaactual = document.getElementById('populares').dataset.pagina;

    try{
        const resultados = await fetchbusqueda(paginaactual +1);

        document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaactual) + 1);

        cargartitulos(resultados);
        window.scroll(0,0);        
    }catch(e){
        console.log(e);
    }
} );

anterior.addEventListener('click', async(e) => {
    const paginaactual = document.getElementById('populares').dataset.pagina;

    if(paginaactual > 1){
        try{
            const resultados = await fetchbusqueda(paginaactual - 1);

            document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaactual) - 1);

            cargartitulos(resultados);
            window.scroll(0,0);        
        }catch(e){
            console.log(e);
        }
    }

} );

const fechtitems = async(id) => {
    const tipo = document.querySelector('.main__filtros .btn--active').id;

    try {
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=3920b5092f07054465522c38a24bcee3&language=es-MX`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        return datos;
    } catch (e) {
        console.log(e);
        
    }
};

const contenedor = document.getElementById('populares');
const popup = document.getElementById('media');

contenedor.addEventListener('click', async(e) => {
    if(e.target.closest('.main__media')){
        popup.classList.add('media--active');

        const id = e.target.closest('.main__media').dataset.id;

        const resultado =  await fechtitems(id);

        const plantilla = `
        <div class="media__backdrop">
						<img
							src="https://image.tmdb.org/t/p/w500/${resultado.backdrop_path}"
							class="media__backdrop-image"
						/>
					</div>
					<div class="media__imagen">
						<img
							src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}"
							class="media__poster"
						/>
					</div>
					<div class="media__info">
						<h1 class="media__titulo">${resultado.title || resultado.name}</h1>
						<p class="media__fecha">${resultado.release_date} || ${resultado.first_air_date}</p>
						<p class="media__overview">${resultado.overview}</p>
					</div>
					<button class="media__btn">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
							class="media__btn-icono"
						>
							<path
								d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
							/>
						</svg>
					</button>
        `;
        document.querySelector('#media .media__contenedor').innerHTML = plantilla;
    }
});

const cerrar = document.getElementById('media');

cerrar.addEventListener('click', (e) => {
    if(e.target.closest('button')){

        cerrar.classList.remove('media--active');
    }
});

const cargar = async () => {
    const resultados = await fechtpopulares();
    cargartitulos(resultados);
    cargargeneros('movie');
};

cargar();
//# sourceMappingURL=bundle.js.map
