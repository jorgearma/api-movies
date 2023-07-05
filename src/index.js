import fechtpopulares from "./fetchpopulares";
import cargartitulos from "./cargartitulos";

const cargar = async () => {
    const resultados = await fechtpopulares();
    cargartitulos(resultados);
}

cargar();


