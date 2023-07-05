import fechtpopulares from "./fetchpopulares";
import cargartitulos from "./cargartitulos";
import cargargeneros from "./cargargneros";
import './lisenerfiltrofijo'

const cargar = async () => {
    const resultados = await fechtpopulares();
    cargartitulos(resultados);
    cargargeneros('movie');
}

cargar();
cargargeneros();


