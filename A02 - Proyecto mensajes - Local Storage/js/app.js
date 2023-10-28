// listeners
const mensajeHTML = document.querySelector("textarea");
// otra forma de hacerlo es cogiendo la clase con .nombre, o con el nombre del campo;
//const mensaje = document.querySelector("textarea[value='Valor']");
const botonAgregar = document.querySelector("input[value='Agregar']");
const botonBorrar = document.querySelector("input[value='Borrar']");
const mensajeMostrado = document.querySelector("#lista-mensajes");
let listaMensajes = [];

// funciones
function almacenarMensaje(){
    // en el evento del boton debe estar todo lo que ocurre a la vez
    botonAgregar.addEventListener('click', (e) =>{
        e.preventDefault();
        const mensaje = mensajeHTML.value;
        if (mensaje !== ''){
            listaMensajes.push(mensaje)
        }
        localStorage.setItem('listamensaje', listaMensajes);
        // recibe este mensaje
        mostrarMensajes(mensaje);
        
    })
}

function mostrarMensajes() {
    // recupera los objetos y los serpara
    if(localStorage.getItem('listamensaje') !== null) {
        listaMensajes = localStorage.getItem('listamensaje').split(',');
    }
    else {
        listaMensajes = []
    }
    // los muestra en lista-mensajes con un salto de linea
    document.getElementById('lista-mensajes').innerHTML = listaMensajes.join("<br>"); 
}

function borrarMensaje(){
    botonBorrar.addEventListener('click', (e) =>{
        e.preventDefault();
        mensajeMostrado.textContent = ''
        localStorage.removeItem('listamensaje')
        mostrarMensajes(mensaje);
    }
)}

almacenarMensaje();
mostrarMensajes(mensaje);
borrarMensaje();

