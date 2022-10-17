const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

let cart_products = [];


function mostrarCarrito(array) {
    let htmlContentToAppend = ""
    for (let i = 0; i < array.length; i++) {
        let articles = array[i]

        htmlContentToAppend +=
            ` 
            <tr>
            
            <td class="col"><img style="width:100px" src=${articles.image}></td>
            <td class="col">${articles.name}</td>
            <td class="col">${articles.currency} ${articles.unitCost}</td>
            <td class="col"><input id="cantidad" min="0" name="quantity" value="1" type="number" class="size" style="width: 2cm"></td>
            <td class="col" id="precioProd">${articles.currency} ${articles.unitCost}</td>
            <td class="col"><button type="button" class="btn btn-danger btn-sm  mb-2" data-mdb-toggle="tooltip" title="Remove item">
                <i class="fas fa-trash"></i>
                </button>
            </td>
                
            </tr>
            
            `
    }
    document.getElementById("productoImagen").innerHTML = htmlContentToAppend
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

        let cantidad = document.getElementById("cantidad").value;  

        document.addEventListener("change", ()=> {
            
            if (cantidad.value > 0){

                costofinal = `${cantidad.value * articles.unitCost}`

                document.getElementById("precioProd").innerHTML= costofinal
            }
            
        })
    

    });
})
