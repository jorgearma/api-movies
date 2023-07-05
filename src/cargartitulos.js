const cargartitulos = (resultados) =>{
 
    const plantilla = `
    <div class="main__media">
        <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="./img/1.png" alt="" />
        </a>
        <p class="main__media-titulo">The boys</p>
        <p class="main__media-fecha">2021</p>
    </div>
    `

    resultados.forEach((resultado) => {
        console.log(resultado);
        
    });
    
};
export default cargartitulos;