// url = http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}
// api key = 0cb124d9474a6c689a7d8a47747ad257


// constantes
const form = document.querySelector('#formulario');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const tablaResultado = document.querySelector('#tabla');

// listener
window.addEventListener('load', () => {
    form.addEventListener('submit', buscaTiempo)
})

function consultarAPI(ciudad, pais){
    // datos API
    const API_Key = '0cb124d9474a6c689a7d8a47747ad257'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&lang=es&appid=${API_Key}`
    // llamada API
    fetch(url)
        .then((res) => res.json())
        .then(function(data) {
        
            console.log(data)
            
            // para quitar el texto actual
            limpiarHTML()
            muestraTiempo(data)
          })

}
// TODO: hacer pais dinamico, voy por validar la entrada

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
    <strong class='font-bold'>Datos Incorrectos</strong>
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
    // desestructura la info
    const { weather: [{ description, icon }], main: { temp, temp_max, temp_min, humidity },sys: {country}, name, wind: {speed, deg, gust} } = tiempo
    //const { weather: [{ id, main, description, icon}]} = clima // aqui llegaria el tipo de clima
    const actual = conversorGrados(temp)
    const maxima = conversorGrados(temp_max)
    const minima = conversorGrados(temp_min)
    const icono = icon

    console.log(icono)
    
    // estilo de la salida
    const iconoClima = document.createElement('div')
    iconoClima.innerHTML = `<img src="icons/${icono}.png">`
    iconoClima.classList.add()

    const climaActual = document.createElement('p')
    climaActual.innerHTML = `Estado: ${description}`
    climaActual.classList.add('text-2xl')

    const viento = document.createElement('p')
    viento.innerHTML = `Velocidad Viento: ${speed}`
    viento.classList.add('text-2xl')

    const nombreCiudad = document.createElement('p')
    nombreCiudad.innerHTML = `Tiempo en ${name}, ${country}`
    nombreCiudad.classList.add('font-bold','text-xl')

    const temperatura = document.createElement('p')
    temperatura.innerHTML = `${actual} &#8451`
    temperatura.classList.add('font-bold','text-6xl')

    const tempMax = document.createElement('p')
    tempMax.innerHTML = `Maxima: ${maxima} &#8451`
    tempMax.classList.add('text-2xl')

    const tempMin = document.createElement('p')
    tempMin.innerHTML = `Minima: ${minima} &#8451`
    tempMin.classList.add('text-2xl')

    // crea salida
    const divTemperatura = document.createElement('div')
    divTemperatura.classList.add('text-left','text-white','grow', 'mx-4')
    const divClima = document.createElement('div')
    divClima.classList.add('text-left','text-white','grow', 'mx-4')

    // tabla
    const tablaClima = document.createElement('div')
    tablaClima.innerHTML = `
        <table class="border-collapse table-fixed w-full text-sm table-auto rounded p-4">
            <thead class="bg-white dark:bg-slate-800 ">
                <tr>
                <th class='border-b dark:border-slate-600 font-medium p-4  pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Pais</th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Temp max</th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Temp min</th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Temp </th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Humedad</th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Viento</th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Direcc viento</th>
                <th class='border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Veloc viento</th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
                <tr>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${country}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${maxima}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${minima}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${actual}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${humidity}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${deg}º</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${gust}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${speed}</td>
                </tr>
            </tbody>
        </table>`
    tablaClima.classList.add('not-prose', 'relative', 'bg-slate-50','rounded-xl' ,'overflow-hidden', 'dark:bg-slate-800/25')     


    divClima.appendChild(iconoClima)
    divClima.appendChild(climaActual)
    divClima.appendChild(viento)
    divTemperatura.appendChild(nombreCiudad)
    divTemperatura.appendChild(temperatura)
    divTemperatura.appendChild(tempMax)
    divTemperatura.appendChild(tempMin)

    resultado.appendChild(divTemperatura)
    resultado.appendChild(divClima)
    tablaResultado.appendChild(tablaClima)
}

function conversorGrados (temperatura) {
    return parseInt(temperatura - 273.15)
} 

// limpia
function limpiarHTML(){

    if (tablaResultado.firstChild){
        tablaResultado.firstChild.remove();
    }

    while(resultado.firstChild){
        resultado.firstChild.remove();
    }
}