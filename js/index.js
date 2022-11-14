document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    }); 

       /* mostrar usuario logueado en la paginas y consola */

    function mostrarUsuario (){
        let usuario = localStorage.getItem("usuario")
        document.getElementById("username").innerHTML=usuario

        console.log(usuario)
    }
    mostrarUsuario()

    /* Si hay un usuario logueado en el localStorage se elimina el boton de login, de lo contrario se elimina el boton de logout */

    function eliminarBoton(){
        let btnLogin = document.getElementById("ingresar")
        let btnLogout = document.getElementById("logout")

         if(localStorage.getItem("usuario")){
            btnLogin.classList.add("hidden"); 
         }
         else {
            btnLogout.classList.add("hidden");
            
         }
    } 
    eliminarBoton()
    

            /* cada vez que cierras sesion se eliminan los datos del localStorage */

    document.getElementById("logout").addEventListener("click", ()=>{
        localStorage.removeItem("usuario")
    })
})



    
