
// Funcion que muestra los autos en la pagina!
let arrayProductos = [];  

function mostrar (autos) {  
    let htmlContentToAppend = "";

    for(let auto of autos){ 

        htmlContentToAppend += `
        <div "class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${auto.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${auto.name} </h4>
                        <h5>${auto.cost} ${auto.currency}</h5>  
                        <p> ${auto.description}</p> 
                        </div>
                     <small class="text-muted">${auto.soldCount} vendidos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
        
        document.getElementById("cars").innerHTML = htmlContentToAppend;
    } 

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




    document.getElementById("sortDesc").addEventListener("click", function(){
        sortCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
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

// // -------------- FUNCION PARA ORDENAR ====>

// document.getElementById("sortAsc").addEventListener("click", function(){

//     function ordenar(){

//     }


// });

// let ordenar = arrayProductos

// ordenar.sort((a,b) )

 





  






  


















