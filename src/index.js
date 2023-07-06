import fechtpopulares from "./fetchpopulares";
import cargartitulos from "./cargartitulos";
import cargargeneros from "./cargargneros";
import './lisenerfiltrogeneros'
import './lisenerfiltrofijo'
import './lisenerbuscar'
import './paginacion'
import './liseneritems'
import './lisenercerrar'

const cargar = async () => {
    const resultados = await fechtpopulares();
    cargartitulos(resultados);
    cargargeneros('movie');
}

cargar();


