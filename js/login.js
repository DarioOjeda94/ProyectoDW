function login(){ 

    let usuario = document.getElementById("username").value
    let contraseña = document.getElementById("contraseña").value 
    
    // funcion que gurda los datos del usuario en el localStorage!
    
    if (usuario === "" || contraseña === ""){
        Swal.fire("Debe ingresar usuario y contraseña");
    } else {
        localStorage.setItem("usuario", usuario)
        location.href = "index.html";
        
    }
    
    }

    
    
    document.addEventListener("DOMContentLoaded", function() {
    
        document.getElementById("inicio").addEventListener("click", function(){
            login();
        })
        
    })