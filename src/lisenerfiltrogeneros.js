import cargartitulos from "./cargartitulos";
import fetchbusqueda from "./fetchbusqueda"

const contenedor =document.getElementById('filtro-generos');
contenedor.addEventListener('click' , async(e) => {
    e.preventDefault();

    if(e.target.closest('button')){
        contenedor.querySelector('.btn--active')?.classList.remove('btn--active'); //el ?  para que si no hay btn no de error


        e.target.classList.add('btn--active') 

        const resultados = await fetchbusqueda()
        cargartitulos(resultados)
        
        

    }

})