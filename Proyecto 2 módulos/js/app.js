import { obtenerContactos } from "./funciones.js"; //primero exportar y luego importar


const contenedor = document.querySelector("#tabla-clientes tbody");
//let eliminarBtn ='';
document.addEventListener('DOMContentLoaded',() => {
    
    // abro la BBDD
    const request = indexedDB.open('CRM', 1);

    // en caso de error
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    // en caso de exito llamo a getcontact
    request.onsuccess = (event) => {
        const db = event.target.result;
        obtenerContactos(db)
    };

    // funcion obtener contactos

})

