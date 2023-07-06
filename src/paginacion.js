import cargartitulos from "./cargartitulos";
import fetchbusqueda from "./fetchbusqueda";


const anterior = document.getElementById('pagina-anterior')
const siguiente = document.getElementById('pagina-siguiente')

siguiente.addEventListener('click', async(e) => {
    //obtenemos el numero de la pagina actual
    const paginaactual = document.getElementById('populares').dataset.pagina;

    try{
        const resultados = await fetchbusqueda(paginaactual +1);

        document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaactual) + 1)

        cargartitulos(resultados);
        window.scroll(0,0);        
    }catch(e){
        console.log(e);
    }
} )

anterior.addEventListener('click', async(e) => {
    const paginaactual = document.getElementById('populares').dataset.pagina;

    if(paginaactual > 1){
        try{
            const resultados = await fetchbusqueda(paginaactual - 1);

            document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaactual) - 1)

            cargartitulos(resultados);
            window.scroll(0,0);        
        }catch(e){
            console.log(e);
        }
    }

} )