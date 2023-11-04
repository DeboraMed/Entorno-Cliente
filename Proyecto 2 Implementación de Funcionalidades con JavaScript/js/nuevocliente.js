
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
            // llamada al metodo que inserta al cliente
            DBInsertarContacto(clienteOBJ)

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

            // Crea el objeto contactos con ID autoincremento
            let store = db.createObjectStore('Contacts', {
                autoIncrement: true
            });

            // crea un indice en la propiedad email
            let index = store.createIndex('email', 'email', {
                unique: true
            });
        };
    }

    function DBInsertarContacto(contacto){

        const request = indexedDB.open('CRM', 1);

        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };

        // evento de la 1º version de la BBDD CRM
        request.onsuccess = (event) => {
            let db = event.target.result;
            // llama a insertar contacto
            insertarContacto(db,contacto);
        };
    }

    function insertarContacto(db, contacto) {
        // crea una nueva transacción
        const txn = db.transaction('Contacts', 'readwrite');
    
        // obtiene el objeto contactos
        const store = txn.objectStore('Contacts');
        //
        let query = store.put(contacto);
    
        // si va todo ok
        query.onsuccess = function (event) {
            console.log(event);
        };
    
        // manejo de errores
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
    
        // cierra la BD una vez que la transaccion finaliza
        txn.oncomplete = function () {
            db.close();
        };
    }

    crearBD()

    // Borrar BBDD
    /*var req = indexedDB.deleteDatabase('CRM');
    req.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };*/

})