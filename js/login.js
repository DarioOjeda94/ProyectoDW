function login(){ 

    let usuario = document.getElementById("username").value
    let contraseña = document.getElementById("contraseña").value 
    
    // funcion localStorage para que gurde los datos en el servidor!
    
    if (usuario === "" || contraseña === ""){
        Swal.fire("Debe ingresar usuario y contraseña");
    } else {
        sessionStorage.setItem("user", usuario)
        location.href = "index.html";
    }
    
    }

    
    
    document.addEventListener("DOMContentLoaded", function() {
    
        document.getElementById("inicio").addEventListener("click", function(){
            login();
        })
        
    })