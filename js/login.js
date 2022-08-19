function login(){ 

let usuario = document.getElementById("username").value
let contraseña = document.getElementById("contraseña").value 

if (usuario === "" || contraseña === ""){
    alert("Debe ingresar usuario y contraseña")
} else {
    location.href = "index.html";
}

}

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("inicio").addEventListener("click", function(){
        login();
    })
})

  