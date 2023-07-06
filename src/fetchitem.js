const fechtitems = async(id) => {
    const tipo = document.querySelector('.main__filtros .btn--active').id;

    try {
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=3920b5092f07054465522c38a24bcee3&language=es-MX`;

        const respuesta = await fetch(url)
        const datos = await respuesta.json()

        return datos;
    } catch (e) {
        console.log(e);
        
    }
}

export default fechtitems;