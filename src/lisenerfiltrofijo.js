import cargargeneros from "./cargargneros";
import cargartitulos from "./cargartitulos";
import fechtpopulares from "./fetchpopulares";

const filtropelicula = document.getElementById('movie')
const filtroserie =  document.getElementById('tv')


filtropelicula.addEventListener('click', async(e) =>{
    e.preventDefault();
    //cargamos en barra lateral los generos
    cargargeneros('movie');
    //obtenemos los resultados
    const resultados = await fechtpopulares('movie');
    //los cargamso en el DOM
    cargartitulos(resultados);

    filtroserie.classList.remove('btn--active')
    filtropelicula.classList.add('btn--active')

    document.querySelector('#populares .main__titulo').innerText = 'peliculas populares'
})

filtroserie.addEventListener('click', async(e) =>{
    e.preventDefault();

    cargargeneros('tv');

    const resultados = await fechtpopulares('tv');
    
    cargartitulos(resultados);

    filtropelicula.classList.remove('btn--active')
    filtroserie.classList.add('btn--active')

    document.querySelector('#populares .main__titulo').innerText = 'series populares'

})