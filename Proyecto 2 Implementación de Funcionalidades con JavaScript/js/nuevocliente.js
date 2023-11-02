//listeners
document.addEventListener("DOMContentLoaded", () =>{
    const nombre = document.querySelector("#nombre");
    const email = document.querySelector("#email");
    const telefono = document.querySelector("#telefono");
    const empresa = document.querySelector("#empresa");

    const formulario = document.querySelector("#formulario");
    const spiner = document.querySelector("#spiner");

    const sent = document.querySelector("#formulario input[type='submit']");

    const clienteOBJ = {
        nombre:"",
        email:"",
        telefono:"",
        empresa:""
    }

    // blur
    nombre.addEventListener("blur", validar);    
    email.addEventListener("blur", validar);  
    telefono.addEventListener("blur", validar);
    empresa.addEventListener("blur", validar);
    // boton agregar cliente
    sent.addEventListener("click", (e) => {
        e.preventDefault()
        spiner.classList.remove("hidden")
        setTimeout(() => {
            spiner.classList.add("hidden")

            const alerta = document.createElement("p")
            // llamada al metodo principal
            crearBD()

            alerta.classList.add("bg-green-500", "text-center", "text-white", "rounded-lg", "mt-10", "text-sm")
            alerta.textContent = "Mensaje enviado con exito"
            formulario.appendChild(alerta)
            setTimeout(() =>{formulario.lastChild.remove()},3000)
        },3000)

    });

    function validar(e){
        const elemento = e.target
        if (elemento.value.trim() === ""){
            mostrarAlerta(`El campo ${elemento.id} esta vacio`, elemento.parentElement)
            clienteOBJ[elemento.name] = ""
            comprobarFormulario()
            return
        }
        if (elemento.id ==="nombre" && !validarNombre(elemento.value)){
            mostrarAlerta(`El ${elemento.id} no es valido`, elemento.parentElement)
            clienteOBJ[elemento.name] = ""
            comprobarFormulario()
            return 
        }
        if (elemento.id ==="telefono" && !validarTelefono(elemento.value)){
            mostrarAlerta(`El ${elemento.id} no es valido`, elemento.parentElement)
            clienteOBJ[elemento.name] = ""
            comprobarFormulario()
            return 
        }
        if (elemento.id === "email" && !validarEmail(elemento.value)){
            mostrarAlerta(`El ${elemento.id} no es valido`, elemento.parentElement)
            clienteOBJ[elemento.name] = ""
            comprobarFormulario()
            return
        }
        limpiarAlerta(elemento.parentElement)

        clienteOBJ[elemento.name] = elemento.value.trim().toLowerCase()
        comprobarFormulario(clienteOBJ)
    }
    function validarNombre(nombre){
        rexg = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
        resultado = rexg.test(nombre)
        return resultado
    }

    function validarEmail(email){
        rexg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        resultado = rexg.test(email)
        return resultado
    }
    function validarTelefono(telefono){
        rexg = /^(\+34|0034|34)?[6789]\d{8}$/;
        resultado = rexg.test(telefono)
        return resultado
    }
    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia)

        const error = document.createElement("p")
        error.textContent = mensaje
        error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector(".bg-red-600")
        if (alerta){
            alerta.remove()
        }
    }

    function comprobarFormulario(){
        const values = Object.values(clienteOBJ)
        if (values.includes("")){
            sent.disabled = true;
            sent.classList.add("opacity-50")
            return
        }
        sent.disabled = false;
        sent.classList.remove("opacity-50")
    }

    //BBDD
    if (!window.indexedDB) {
        console.log(`Tu navegador no soporta IndexedDB`);
        return;
    }
 
    function crearBD(){

        const request = indexedDB.open('CRM', 1);

        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };

        // evento se dispara cuando ocurre un upgrade
        request.onupgradeneeded = (event) => {
            let db = event.target.result;

            // create the Contacts object store 
            // with auto-increment id
            let store = db.createObjectStore('Contacts', {
                autoIncrement: true
            });

            // create an index on the email property
            let index = store.createIndex('email', 'email', {
                unique: true
            });
        };
        // evento de la 1º version de la BBDD CRM
        request.onsuccess = (event) => {
            let db = event.target.result;

            // insertar el contenido
            insertContact(db,clienteOBJ);

        };
    }

    function insertContact(db, contact) {
        // create a new transaction
        const txn = db.transaction('Contacts', 'readwrite');
    
        // get the Contacts object store
        const store = txn.objectStore('Contacts');
        //
        let query = store.put(contact);
    
        // handle success case
        query.onsuccess = function (event) {
            console.log(event);
        };
    
        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
    
        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            db.close();
        };
    }

    crearBD()

})