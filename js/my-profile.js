let nombre = document.getElementById("nombre").value;
let apellido = document.getElementById("apellido").value;
let email = document.getElementById("email").value;
let mail =/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

let res = true

function validacion2 (){
    if (nombre = null){
        document.getElementById("nombre").classList.add("invalid-color");
    }
    else{    
        document.getElementById("nombre").classList.remove("invalid-color");   
    }
    if (apellido = null){
        document.getElementById("apellido").classList.add("invalid-color");    
    }
    else{
        
        document.getElementById("apellido").classList.remove("invalid-color");    
    }
    if (email = null){
        document.getElementById("email").classList.add("invalid-color");    
    }
    else{    
        document.getElementById("email").classList.remove("invalid-color");   
    }
    return res = false;
}




document.addEventListener("DOMContentLoaded", ()=>{

     // Cuando se carga la pagina se muestra el usuario de la persona logueada 
    
    let correo = localStorage.getItem("usuario")
    let name = localStorage.getItem("Nombre")
    let SecName = localStorage.getItem("SegundoNombre")
    let lastName = localStorage.getItem("Apellido")
    let lastName2 = localStorage.getItem("SegundoApellido")
    let cel = localStorage.getItem("Telefono")

    document.getElementById("email").value = correo
    document.getElementById("nombre").value = name
    document.getElementById("segNombre").value = SecName
    document.getElementById("apellido").value = lastName
    document.getElementById("segApellido").value = lastName2
    document.getElementById("tel").value = cel

    document.getElementById("guardar").addEventListener("click", evento=>{
       
          document.getElementById("formulario")  

        if (!validacion2() || !this.checkValidity()){
            evento.preventDefault();
            evento.stopPropagation();
        } 

        document.body.classList.add('was-validated');

       
        let eventos=['change', 'input'];
        eventos.forEach( evento=> {document.body.addEventListener(evento, validacion2)})  

        // guardar datos del form en el localStorage

        localStorage.setItem("Nombre", document.getElementById("nombre").value)
        localStorage.setItem("SegundoNombre", document.getElementById("segNombre").value)
        localStorage.setItem("Apellido", document.getElementById("apellido").value)
        localStorage.setItem("SegundoApellido", document.getElementById("segApellido").value)
        localStorage.setItem("Telefono", document.getElementById("tel").value)

      
    })
}) 







