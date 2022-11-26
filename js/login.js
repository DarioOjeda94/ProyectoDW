function validacionCorreo(){
    let email = document.getElementById("username").value
    let pat = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let res = true
    if (pat.test(email)){
        email.setCustomValidity("");
    }
    else {
        email.setCustomValidity(false);
        res = false;
    }

}

function login(){ 
    let usuario = document.getElementById("username").value;
    let contraseña = document.getElementById("contraseña").value;
    let pat = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // funcion que gurda los datos del usuario en el localStorage!
    
    if (usuario === "" || !pat.test(usuario) ||contraseña === ""){
        Swal.fire("Email y/o contraseña incorrecta");
        document.getElementById("username").classList.add("invalid-color");
        document.getElementById("error").style.display = "inline";
        document.getElementById("contraseña").classList.add("invalid-color");
        document.getElementById("error2").style.display = "inline";
    }
    
    else {
        localStorage.setItem("usuario",usuario)
        location.href = "index.html";
    }
    
}



    
    
    document.addEventListener("DOMContentLoaded", function() {
    
        document.getElementById("inicio").addEventListener("click", ()=>{
            login();
            
          
        })
    })


  