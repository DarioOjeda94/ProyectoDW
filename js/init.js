const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

 // PRODUCTS_URL+localStorage.getItem("CatID")+EXT_TYPE
//let productID = localStorage.getItem("productosID")

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
  let result = {};
  showSpinner();
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", ()=>{

    /* mostrar usuario logueado en la paginas y consola */

    function mostrarUsuario (){
      let usuario = localStorage.getItem("usuario")
      document.getElementById("username").innerHTML=usuario
      console.log(usuario)
  }
  mostrarUsuario()

  /* Cada vez que cierras sesion se eliminan los datos del localStorage */

  document.getElementById("logout").addEventListener("click", ()=>{
    localStorage.removeItem("usuario")
    
})

       /* Si hay un usuario logueado en el localStorage se elimina el boton de login y muestra mi perfil, de lo contrario se elimina el boton de logout y no se muestra mi perfil */

    function eliminarBoton(){
      let btnLogin = document.getElementById("ingresar")
      let btnLogout = document.getElementById("logout")

       if(localStorage.getItem("usuario")){
          btnLogin.classList.add("hidden"); 
          document.getElementById("perfil").classList.remove("hidden");
       }
       else {
          btnLogout.classList.add("hidden");
          document.getElementById("perfil").classList.add("hidden");
       }
  } 
  eliminarBoton()
})

  