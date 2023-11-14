document.addEventListener('DOMContentLoaded',() =>{
    // abro la BBDD
    const request = indexedDB.open('CRM', 1);

    // en caso de error
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    // en caso de exito llamo a getcontact
    request.onsuccess = (event) => {
        const db = event.target.result;

        myId = localStorage.getItem('myId')
        
        console.log(myId)
        modificarContacto(myId)
    };

    // TODO: función que actualiza los contactos
    function modificarContacto(id){
        console.log(id)
    }

    

})
