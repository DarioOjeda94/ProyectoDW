const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

let cart_products = "";

function mostrarCarrito(array) {
    let htmlContentToAppend = ""
    for (let i = 0; i < array.length; i++) {
        let articles = array[i]

        htmlContentToAppend +=
            ` 
            <tr>
            <td><img width = "100px" src=${articles.image}></td>
            
            <td>${articles.name}</td>
            
            <td>${articles.currency} ${articles.unitCost}</td>
            
            <td><div class="sm">
            <input id="form1" min="1" name="quantity" value="1" type="number" class="form-control" />
            </div>
            </td>
            
            <td><button type="button" class="btn btn-danger btn-sm  mb-2" data-mdb-toggle="tooltip" title="Remove item">
                <i class="fas fa-trash"></i>
                </button>
            </td>
                
            </tr>
            
            `
    }
    document.getElementById("productoImagen").innerHTML = htmlContentToAppend
}


document.addEventListener("DOMContentLoaded", function () {

    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart_products = resultObj.data.articles
            mostrarCarrito(cart_products)
            console.log(cart_products)
        }

    });
})

{/* <div class="row">
<tr class="col-lg-3 col-md-12 mb-4 mb-lg-0">

><span></span>
<a href="#!">
  <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
</a>
<p class="text-start text-md-center">
<strong></strong>
</p> 

</div>
</div>


</div> */}