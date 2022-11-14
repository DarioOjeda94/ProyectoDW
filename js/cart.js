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
    subtotales()

}
 


        /* Funcion que elimina un producto y actualiza el carrito */

function eliminarProducto(i){
    cart_products.splice(i,1)
    localStorage.setItem("carrito", JSON.stringify(cart_products))
    mostrarCarrito(JSON.parse(localStorage.getItem("carrito")));
}

        /* Funcion que imprime los subtotales de los productos */

function subtotales() {
    
    let cantidad = document.getElementsByName("cantidad");
    let costo = document.getElementsByName("costo");
    let subTotales = document.getElementsByName("subTotal");
    let envio = document.getElementsByName("envio");
    let subtotal = 0;
    let costoEnvio = 0

    for (let i=0; i<cantidad.length; i++){
        subTotales[i].innerHTML = parseFloat(costo[i].innerHTML) * parseFloat(cantidad[i].value);
        subtotal +=parseFloat(costo[i].innerHTML) * parseFloat(cantidad[i].value);
        
    }
    
    for (let tipo of envio){
        if (tipo.checked){
            costoEnvio = subtotal * tipo.value;       
        }
       let total = subtotal + costoEnvio;
       document.getElementById("sub").innerHTML = "$" + subtotal
    document.getElementById("precioTotal").innerHTML= "$" + total
    document.getElementById('costosDEnvio').innerText= "$" + costoEnvio;
    }

}
     

    function setCarritoID(id) {
        localStorage.setItem("productosID", id);
        window.location = "cart.html"
    } 
    

    /* Funcion que habilita y deshabilita las formas de pago */

    function habilitar(){
        let TB = document.getElementById("TB")
        let TDC = document.getElementById("TDC")

        if(TB.checked){
        document.getElementById("transferencia").disabled=false;
        document.getElementById("1").disabled=true;
        document.getElementById("2").disabled=true;
        document.getElementById("3").disabled=true;
        document.getElementById("aceptar").disabled=false;
        }
        else{
            if(TDC.checked){
                document.getElementById("1").disabled=false;
                document.getElementById("2").disabled=false;
                document.getElementById("3").disabled=false;
                document.getElementById("transferencia").disabled=true;
                document.getElementById("aceptar").disabled=false;


            }
        }
    }
       
        /* Validacion de campos de texto */

    function validacion(){
        let TDC = document.getElementById("TDC");
        let TB = document.getElementById("TB")
        let res = true

      
        if(!TDC.checked || !TB.checked){
            res=false
            document.getElementById("click-aqui").classList.add("invalid-color");
            document.getElementById("error").style.display = "inline";
        }
        else {
            document.getElementById("click-aqui").classList.remove("invalid-color");
            document.getElementById("error").style.display = "none";
    
        }
       
        console.log("validacion realizada!!")
        return res;
    }
      
       


    document.addEventListener("DOMContentLoaded", function () {


        getJSONData(CART_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                cart_products = resultObj.data.articles
                mostrarCarrito(cart_products)
                console.log(cart_products)
            }

             // Boton de finalizar compra, realiza la validacion y si esta todo correcto avisa que la compra fue realizada! //

            document.getElementById("finalizarCompra").addEventListener("click", evento=> { 

                if (!validacion() || !this.checkValidity()){
                    evento.preventDefault();
                    evento.stopPropagation();
                }

                document.body.classList.add('was-validated');

                let eventos=['change', 'input'];
    
                eventos.forEach( evento=> {document.body.addEventListener(evento, validacion)})  

                if((validacion() === true || this.checkValidity() === true)){
                    

                        Swal.fire(
                            'Su compra ha sido realizada con exito!',
                            '',
                             'success'
                              )
                    
                }
            })


                // Boton de eliminar, elimina un producto del carrito //
            document.getElementById("eliminar").addEventListener("click", ()=>{
                eliminarProducto()
            })

            // Radio button de modal de forma de pago //
            document.getElementById("TB").addEventListener("click", ()=>{
                habilitar()
                
            })
            document.getElementById("TDC").addEventListener("click", ()=>{
                habilitar()
                
            })
        
        
        })

        
    });

    
