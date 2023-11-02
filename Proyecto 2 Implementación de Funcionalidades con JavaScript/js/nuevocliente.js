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
        console.log(`Your browser doesn't support IndexedDB`);
        return;
    }
    crearBD()
    function crearBD(){
        //abir de BBDD IndexedDB https://es.javascript.info/indexeddb
        let openRequest = indexedDB.open('indexedDB', 1);

        //manejo de errores
        openRequest.onerror = function() {
            console.error("Error", openRequest.error);
          };
          
        // si va todo ok...  
        openRequest.onsuccess = function() {
        let db = openRequest.result;
        // continúa trabajando con la base de datos usando el objeto db

        openRequest.onupgradeneeded = function(event) {

            const db = event.target.result;
            // Create an objectStore for this database
            const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
            console.log(objectStore)

            //otra manera de crear onjetos
            // create the Contacts object store and indexes
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

            };
        };

          
    }
    
    

})