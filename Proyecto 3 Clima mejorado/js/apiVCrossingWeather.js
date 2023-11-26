
// constantes
const form = document.querySelector('#formulario');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const tablaResultado = document.querySelector('#tabla');

// listener
window.addEventListener('load', () => {
    form.addEventListener('submit', buscaTiempo)
})

// API secundaria
function consultarAPIsec(ciudad, pais){
    const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${ciudad},${pais}&contentType=json&unitGroup=metric&shortColumnNames=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8f634e9damsh2795633417d3a44p1e96ccjsn9e8ad38907b5',
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };

    //llamda a la api
    fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                // Manejo de errores
                throw new Error(`Error en la solicitud: ${res.status}`)
            }
            return res.json()
        })
        .then((data) => {
            console.log(data)
            limpiarHTML()
            muestraTiempo(data)
        })
        .catch((error) => {
            mostrarError(error) 
            console.error("Ha ocurrido un error:", error)
            
        })
}

function validarCiudad (ciudad) {
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s&'(),.-]+$/;
    const resultado = regex.test(ciudad)

    return resultado
}

function validarPais (pais) {
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s&'(),.-]+$/;
    const resultado = regex.test(pais)

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
    setTimeout(() => { alerta.remove() }, 4000)
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

    } else if (pais === ""|| !validarCiudad(pais)) {
        mostrarError("El campo Pais no es valido");
        return;
    }

    consultarAPIsec(ciudad, pais)
    
}

function muestraTiempo(tiempo){
    
    // desestructura la info API
    const { locations: locationsDict } = tiempo

    let location
    for (var key in locationsDict) { location = key; break; }

    const { address, currentConditions: { humidity, icon, temp, wdir, wgust, wspd},  tz, values: [{maxt,mint,}] }  = locationsDict[location]

    const actual = temp
    const maxima = maxt
    const minima = mint
    const icono = icon

    const compruebaLugar = locationsDict[location].currentConditions.cloudcover
    console.log(compruebaLugar)

    if (compruebaLugar === undefined){ const error = 'El lugar y/o pais no es válido'; mostrarError(error);}
    
    // estilo de la salida
    const iconoClima = document.createElement('div')
    iconoClima.innerHTML = `<img src="icons/${icono}.png">`
    iconoClima.classList.add()

    const climaActual = document.createElement('p')
    climaActual.innerHTML = `Estado: ${icon}`
    climaActual.classList.add('text-2xl')

    const viento = document.createElement('p')
    viento.innerHTML = `Velocidad Viento: ${wspd}`
    viento.classList.add('text-2xl')

    const nombreCiudad = document.createElement('p')
    nombreCiudad.innerHTML = `Tiempo en ${address}`
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
    divTemperatura.classList.add('text-left','text-white','grow', 'mx-4','w-2/3')
    const divClima = document.createElement('div')
    divClima.classList.add('text-left','text-white','grow', 'mx-4','w-1/3')

    // tabla
    const tablaClima = document.createElement('div')
    tablaClima.innerHTML = `
        <table class="border-collapse table-fixed w-full text-sm table-auto rounded p-4">
            <thead class="bg-white dark:bg-slate-800 ">
                <tr>
                <th class='border-b dark:border-slate-600 font-medium p-4  pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Zona horaria</th>
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
                    ${tz}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${maxima}ºC</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${minima}ºC</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${actual}ºC</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${humidity}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${wdir}º</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${wgust}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    ${wspd}</td>
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

// limpia
function limpiarHTML(){

    if (tablaResultado.firstChild){
        tablaResultado.firstChild.remove();
    }

    while(resultado.firstChild){
        resultado.firstChild.remove();
    }
}