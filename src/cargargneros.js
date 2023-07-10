import fetchgeneros from "./fetchgeneros";

const contenedorgenero = document.getElementById('filtro-generos');
//cargarmos los botones de genero
const cargargeneros = async(filtro) => {
    //tremos los generos y con filtro entro movi o tv
     const generos = await fetchgeneros(filtro);            
     //eliminamos los botones para cargar los nuevos
     contenedorgenero.innerHTML = '',
     
     generos.forEach((genero) => {                          //creamos un botton por cada uno con forEach  
            const btn = document.createElement('button')
            btn.classList.add('btn');
            btn.innerText = genero.name;
            btn.setAttribute('data-id', genero.id);

            contenedorgenero.appendChild(btn)             //aqui aderimos el boton al DOM
            
        });
const borrarbtn = contenedorgenero.querySelectorAll('.btn')
        borrarbtn.forEach((e) =>{
            const textbtn = e.innerText
            if(textbtn === 'Action' ||  textbtn === 'Comedy' ){
                e.remove()

            }
        })
  
    }   

export default cargargeneros