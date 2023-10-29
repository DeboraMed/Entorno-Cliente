//  *** Variables ***
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

//  *** Listeners ***
cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener("click", añadirCurso);
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Vaciamos el array
    limpiarHTML(); // Limpiamos el HTML
    // limpiar el localStorage
    localStorage.clear();
  });
}

//  *** Funciones ***

// Función para añadir cursos al carrito
function añadirCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

// Elimina cursos del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // se elimina del array si el ID es igual
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    
    //eliminar del LocalStorage
    localStorage.removeItem(cursoId)
    carritoHTML(articulosCarrito);
  }
}

// Lee la información del curso seleccionado.
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  // ITERA EL LOCALSTORAGE
  encontrado = false;

  for (var i = 0; i < localStorage.length; i++){

    let storegeId = JSON.parse(localStorage.getItem(localStorage.key(i))).id;

    if(storegeId === infoCurso.id){
      //convierto a objeto
      
      let cursoStorage = JSON.parse(localStorage.getItem(storegeId)) 
      cursoStorage.cantidad++
      localStorage.setItem(infoCurso.id,JSON.stringify(cursoStorage))// almaceno
      encontrado = true;
    }
  }

  if(!encontrado) {
    // meter curso en el localStore, pasado a string
    const cursoCadena =JSON.stringify(infoCurso)
    localStorage.setItem(infoCurso.id,cursoCadena);
  }

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  // si loclaStores.length !== 0 meter el contenido en un array y devolverlo
  carritoHTML(articulosCarrito);
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  limpiarHTML();

  for (var i = 0; i < localStorage.length; i++){
    let curso = localStorage.getItem(localStorage.key(i));
    //Carga el contenido del localStorage convertido en objeto
    //const cursoJSON = localStorage.getItem(curso.id)
    const objetoCurso= JSON.parse(curso)
    console.log(objetoCurso)

    const row = document.createElement("tr");
    row.innerHTML = `
            <td> 
                <img src="${objetoCurso.imagen}" width="100">
            </td>
            <td>${objetoCurso.titulo}</td>
            <td>${objetoCurso.precio}</td>
            <td>${objetoCurso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${objetoCurso.id}">X</a>
            </td>
            `;
    contenedorCarrito.appendChild(row);
  };
}

// Función para limpiar el HTML (elimina los cursos del tbody)
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.firstChild.remove();
  }
}

carritoHTML();