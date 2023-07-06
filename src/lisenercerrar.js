const cerrar = document.getElementById('media')

cerrar.addEventListener('click', (e) => {
    if(e.target.closest('button')){

        cerrar.classList.remove('media--active')
    }
})