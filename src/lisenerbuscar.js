import cargartitulos from "./cargartitulos";
import fetchbusqueda from "./fetchbusqueda"

const btn = document.getElementById('btn-buscar')

btn.addEventListener('click', async(e) => {
    const resultados = await fetchbusqueda();

    cargartitulos(resultados)
})