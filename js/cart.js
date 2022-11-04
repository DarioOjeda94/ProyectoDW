const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

let envio = document.getElementsByName('envio');

let borrar = document.getElementById("eliminar");

let carrito = [];

let cart_products = [];

function mostrarCarrito(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        articles = array[i]

        htmlContentToAppend += `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><img style="width:100px" src=${articles.image}></td>
                    <td>${articles.name}</td>
                    <td name="costo"> ${articles.unitCost}</td>
                    <td><input min="1" name="cantidad"  value=${articles.count} type="number" class="form-control form-control-sm" style="width: 2cm"  onchange="subtotales()"></td>
                    <td name="subTotal" id="sub${i}">${articles.unitCost}</td>
                    <td><button type="button" id="eliminar" class="btn btn-danger btn-sm  mb-2" data-mdb-toggle="tooltip" title="Remove item">
                        <i class="fas fa-trash"></i>
                        </button>
                    </td>
                        
                    </tr>
                </tbody>
            </table>
            
            `;
    }
    document.getElementById("productoImagen").innerHTML = htmlContentToAppend;
    
    for(let i=0; i<borrar.length; i++){
        borrar[i].addEventListener("click", ()=>{
            eliminarProducto(i);
        })
    }
}

        /* Funcion que elimina un producto y actualiza el carrito */

function eliminarProducto(i){
    cart_products.splice(i,1)
    localStorage.setItem("carrito", JSON.stringify(cart_products))
    mostrarCarrito(JSON.parse(localStorage.getItem("carrito")));
}

        /* Funcion que imprime los subtotales de los productos */

function subtotales() {
    
    let cantidad = document.getElementsByName("cantidad")
    let costo = document.getElementsByName("costo")
    let subTotales = document.getElementsByName("subTotal")

    for (let i=0; i<cantidad.length; i++){
        let subtotal = parseFloat(cantidad[i].value) * parseFloat(costo[i].innerHTML);
        subTotales[i].innerHTML= subtotal 
    }
}

  /* funcion para mostrar el porcentaje 

  costoEnvio =0;
  for (let x=0; x< envio.length; x++){
      if (envio[x].checked){
          costoEnvio = subtotal * parseFloat(envio[x].value);
          }

      }

      document.getElementById('costosDEnvio').innerText=(costoEnvio).toFixed(2);
*/

function calcularPorcentaje (){

}



    function setCarritoID(id) {
        localStorage.setItem("productosID", id);
        window.location = "cart.html"
    }


    document.addEventListener("DOMContentLoaded", function () {

        getJSONData(CART_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                cart_products = resultObj.data.articles
                mostrarCarrito(cart_products)
                console.log(cart_products)
            }
            
            document.getElementById("finalizarCompra").addEventListener("click", ()=> {
                Swal.fire(
                    'Su compra ha sido realizada con exito!',
                    '',
                    'success'
                )
                
            })
            document.getElementById("eliminar").addEventListener("click", ()=>{
                eliminarProducto()
            })
            document.getElementById("costosDEnvio").addEventListener("click", ()=>{

            })
        })

        
    });

    
