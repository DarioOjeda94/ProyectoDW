
let producto = {};
let imagenes = [];

   // Funcion que muestra la informacion de los productos ----->

function verProductos(producto){
    let htmlContentToAppend = "";

        htmlContentToAppend += `
         <h1 class="text-center"> ${producto.name} </h1> <hr> <br>
         <h4> Precio:</h4>
         <p>${producto.currency} ${producto.cost} </p>
         <h4> Descripción:</h4>
         <p>  ${producto.description}</p>
         <h4> Categoría:</h4>
         <p>${producto.category} </p>
         <h4> Cantidad de vendidos:</h4>
         <p> ${producto.soldCount} </p>
         <h3 class="text-center"> Imagenes ilustrativas </h3> <br><br>
         <div class="row">`+ cargarFotos(producto.images)+`
        </div> 
        `
        document.getElementById("contenedor").innerHTML = htmlContentToAppend;
    }
       // Funcion que recorre el array de imagenes y me las muestra en la pagina ----->

    function cargarFotos(imagenes){
        let fotos = "";
        for(let img of imagenes){
            fotos+=`<div class="col-3 " style="width: 250px">
            <img src="${img}" class="img-thumbnail">
            </div>`;
        }
        return fotos;
    }

    
          // Funcion que muestra los comentarios ------>

    function comentarios(){
        let htmlContentToAppend=""
        for(let i = 0; i < array.length; i++){
            let comentario= array[i];

            htmlContentToAppend+= `
            <div class="row">
                <div class="col">
                <h5> ${comentario.user}  </h5>
                <p>${mostrarEstrellas(comentario.score)} | ${comentario.dateTime}</p>
                <p>${comentario.description}</p>
                </div>
            </div>
            `
            document.getElementById("comentarios").innerHTML = htmlContentToAppend;
        }

    }

    // Función que cambia la calificacion del producto por estrellas coloreadas ----->
    
    function mostrarEstrellas(score){ 
    let estrellas="";
    for(let i=1; i<=5; i++){
        if (i<= score){
            estrellas+= `<i class="fas fa-star checked"></i>`;
        }
        else{
             estrellas+= `<i class="far fa-star checked"></i>`; 
        }
    }
    return estrellas;
}

    //-----Variable que toma los datos de los productos -----
    let productID = localStorage.getItem("productosID")

     

    document.addEventListener("DOMContentLoaded", function(  ){
       
        getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function(resultObj)
        {
            if (resultObj.status === "ok") {
                imagenes = resultObj.data
               verProductos(imagenes);
               console.log(imagenes)
            }
            
        });
        
        getJSONData( PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function(resultObj)
        {
            if (resultObj.status === "ok") {
                array = resultObj.data
                comentarios(array)
            }
            
        });
        
        
    });