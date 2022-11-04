const ASCENDENTE = [];
const DESCENDENTE = [];
const PROD_VENDIDOS = "Cant.";
let productArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// esta funcion ordena

function sortProduct(criteria, array){
    let result = [];
    if (criteria === PROD_VENDIDOS){
        result = array.sort((a, b) => b.soldCount - a.soldCount);
    }else if (criteria === ASCENDENTE){
        result = array.sort((a, b)=> b.cost - a.cost);
    }else if (criteria === DESCENDENTE){
        result = array.sort((a, b)=> a.cost - b.cost);
    }
    return result;
}
 
//FUNCION PARA GUARDAR EL ID

function setProductosID(id) {
    localStorage.setItem("productosID", id);
    window.location = "products-info.html"
}

// Funcion que muestra los autos en la pagina!
let arrayProductos = [];  

function mostrar (productos) {  
    let htmlContentToAppend = "";
     
    for(let i = 0; i < arrayProductos.length; i++){ 
        let producto = productos[i];

          
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))){
        htmlContentToAppend += `
        <div onclick="setProductosID(${producto.id})"class="list-group-item list-group-item-action cursor-active">
        <a href="product-info.html?producto= ` + producto.name + `"class="list-group-item list-group-item-action>
        <div onclick="setProductosID(${producto.id})"class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${producto.name} </h4>
                        <h5>${producto.cost} ${producto.currency}</h5>  
                        <p> ${producto.description}</p> 
                        </div>
                     <small class="text-muted">${producto.soldCount} vendidos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
        document.getElementById("productos").innerHTML = htmlContentToAppend;
    } 

}

function ordenarMostrarProductos(criterio, productsArray){
    currentSortCriteria = criterio;

    if(productsArray != undefined){
        productArray = productsArray;
    }

    productArray = sortProduct(currentSortCriteria, productArray);

    //Muestro las categorías ordenadas
    mostrar(productsArray);
}

        //  MOSTRAR DATOS ===>

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE).then(function(resultObj)
    {
        if (resultObj.status === "ok") {
            arrayProductos = resultObj.data.products
        mostrar(arrayProductos);
        }
        
    });


    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenarMostrarProductos(ASCENDENTE)
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarMostrarProductos(DESCENDENTE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarMostrarProductos(PROD_VENDIDOS);
    });


    
});


        //   ELIMINAR CONTENIDO DE CAJAS DE FILTRADO

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

 mostrar(arrayProductos);

});



//  ----------- FUNCION QUE FILTRA POR PRECIOS ====>

document.getElementById("rangeFilterCount").addEventListener("click",()=>{

 function filtrar (){
    let minimo = document.getElementById("rangeFilterCountMin").value;
    let maximo = document.getElementById("rangeFilterCountMax").value;

    let productosFiltrados = arrayProductos.filter(products => products.cost >= minimo && products.cost <= maximo)

  
  mostrar(productosFiltrados)
 }

 filtrar()
})



  






  


















