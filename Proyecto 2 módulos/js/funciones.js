export function obtenerContactos(db) {
    // se abre la transaccion de la BBDD
    const txn = db.transaction('Contacts', 'readonly');
    const objectStore = txn.objectStore('Contacts');
    
    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            // aqui se guarda cada contacto
            let contacto = cursor.value;

            // mostrar el objeto en el html por cada objeto aqui
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-black tracking-wider">${contacto.nombre}</td>
                    <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-black tracking-wider">${contacto.email}</td>
                    <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-black tracking-wider">${contacto.telefono}</td>
                    <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-black tracking-wider">${contacto.empresa}</td>
                    <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-black tracking-wider">
                        <a href="#" id="modificar-${cursor.key}" type="button" class="mb-1 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modificar</a>
                        <br>
                        <a href="#" id="eliminar-${cursor.key}" type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"> Eliminar </a>
                    </td>
                    `;
            contenedor.appendChild(row);
            
            // eliminar la fila seleccionada
            let eliminarBtn = document.querySelector("#eliminar-" + cursor.key);
            // evento del boton
            eliminarBtn.addEventListener("click", (e)=>{
                let myId = e.target.id.split("-")[1];
                myId = parseInt(myId)
                
                eliminarContacto(myId)
            })

            // modificar la fila seleccionada
            let modificarBtn = document.querySelector("#modificar-" + cursor.key);
            // evento del boton
            modificarBtn.addEventListener("click", (e)=>{
                let myId = e.target.id.split("-")[1];
                myId = parseInt(myId)
                
                //metodo de editarCliente.js
                modificarContacto(myId)
                // guardo ID en el localStorage
                localStorage.setItem('myId', myId)
                
            })

            cursor.continue();
        }
    }

    // cierra la BD una vez que la transaccion finaliza
    txn.oncomplete = function () {
    db.close();
    };

};

function eliminarContacto(id){ 

    const request = indexedDB.open('CRM', 1);

    // en caso de error
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    // en caso de exito llamo a getcontact
    request.onsuccess = (event) => {
        const db = event.target.result;
        const txn = db.transaction('Contacts', 'readwrite');

        const store = txn.objectStore('Contacts');
        let query = store.delete(id);

        query.onsuccess = function (event) {
            console.log(event);
            // limpiar HTML y obtener contactos
            limpiarHTML()
            obtenerContactos(db)
            
        };

        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }

        // close the database once the transaction completes
        txn.oncomplete = function () {
            console.log("onComplete de eliminar contacto")
            db.close();
        };
    };

}

function limpiarHTML(){
    while (contenedor.firstChild) {
        contenedor.firstChild.remove();
      }
}