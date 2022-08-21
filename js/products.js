
// Funcion que muestra los autos en la pagina!

function listadoDeAutos (autos) {  
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
    //  mostrar datos 

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj)
    {
        if (resultObj.status === "ok") {
           listadoDeAutos(resultObj.data.products)
        }
    });
});


