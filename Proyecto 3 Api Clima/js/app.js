// constantes
const container = document.querySelector('.container');
const form = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

// listener
window.addEventListener('load', () => {
    form.addEventListener('submit', buscaTiempo)
})

const consultarAPI = async(ciudad, pais) => {
    try {
        // llamada API + key
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=0cb124d9474a6c689a7d8a47747ad257`)
        .then((respuesta) => {
            // Verificar el código de estado
            if (respuesta.status === 404) {
                console.log('404 Recursos no encontrados');
            } else if (respuesta.status === 401) {
                console.log('401 No autorizado');
            } else if (respuesta.status === 200) {
                return respuesta.json();
            } else {
                // Otros códigos de estado
                console.log(`Código de estado inesperado: ${respuesta.status}`);
            }
        })

        .then((data) => {
            if (data) {
                limpiarHTML();
                muestraTiempo(data);
            }
        })
        .catch((error) => {
            console.error(error);
        })

    } catch(error){
        console.log(error)
    }
}

function validarCiudad (ciudad) {
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s.'-]+$/;
    const resultado = regex.test(ciudad)

    return resultado
}

function mostrarError(mensaje) {
    // crea la capa
    const alerta = document.createElement('div');
    
    alerta.classList.add('bg-red-200', "border-red-300", "text-red-700", "px-3", "py-4", "rounded", "relative", "max-w-md", "mx-auto", "mt-7", "text-center" );
    alerta.innerHTML=`
    <strong> Datos Incorrectos </strong>
    <span class='block'> ${mensaje}</span>
    `
    container.appendChild(alerta)
    setTimeout(() => { alerta.remove() }, 3000)
}

function buscaTiempo(e) {

    e.preventDefault()

    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value;
    form.reset()
    
    // errores
    if (ciudad === "" && pais === ""){
        mostrarError("Los campos están vacios")
        return

    } else if (ciudad === "" || !validarCiudad(ciudad)) {
        mostrarError("El campo Ciudad no es valido");
        return;

    } else if (pais === "") {
        mostrarError("El campo Pais no es valido");
        return;
    }

    consultarAPI(ciudad, pais)
}

function muestraTiempo(tiempo){
    const { main: { temp, temp_max, temp_min }, name } = tiempo
    const actual = conversorGrados(temp)
    const maxima = conversorGrados(temp_max)
    const minima = conversorGrados(temp_min)
    
    const nombreCiudad = document.createElement('p')
    nombreCiudad.innerHTML = `Tiempo en ${name}`
    // estilo de la salida
    nombreCiudad.classList.add('font-bold','text-xl')

    const temperatura = document.createElement('p')
    temperatura.innerHTML = `${actual} &#8451`
    temperatura.classList.add('font-bold','text-xl')

    const tempMax = document.createElement('p')
    tempMax.innerHTML = `Temperatura maxima: ${maxima} &#8451`
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p')
    tempMin.innerHTML = `Temperatura minima: ${minima} &#8451`
    tempMin.classList.add('text-xl')

    // crea salida
    const div = document.createElement('div')
    div.classList.add('text-white')
    div.appendChild(nombreCiudad)
    div.appendChild(temperatura)
    div.appendChild(tempMax)
    div.appendChild(tempMin)

    resultado.appendChild(div)
}

function conversorGrados (temperatura) {
    return parseInt(temperatura - 273.15)
} 

// limpia
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.firstChild.remove();
    }
}