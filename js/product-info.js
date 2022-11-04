
let producto = [];
let imagenes = {};
let carrito = [];
// Funcion que muestra el array de los productos ----->

function verProductos(producto) {
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <h1 class="text-center card-header py-3"> ${producto.name} </h1><br>
        <div style="margin-left: 1cm;">
        <h4> Precio:</h4>
        <p>${producto.currency} ${producto.cost} </p>
        <h4> Descripción:</h4>
        <p>  ${producto.description}</p>
        <h4> Categoría:</h4>
        <p>${producto.category} </p>
        <h4> Cantidad de vendidos:</h4>
        <p> ${producto.soldCount} </p>
        <h3 class="text-center"> Imagenes ilustrativas </h3> <br><br>
        </div>
        <div class="row">`+ cargarFotos(producto.images) + `
        </div> <br>
        <button onclick="agregarCarrito(imagenes)" class="btn btn-success" id ="agregar" style="width: 50%; margin-left: 5cm; margin-bottom: 1cm;"> Agregar al carrito
        `
    document.getElementById("contenedor").innerHTML = htmlContentToAppend;

}


//--------Funcion que agrega los productos al carrito ------>

function agregarCarrito (id){
    let item = document.getElementById("contenedor");
    carrito.push(item.value)
    localStorage.setItem("productosID", JSON.stringify(producto));
    console.log(id)
 
}





// Funcion que recorre el array de imagenes y me las muestra en la pagina ----->

function cargarFotos(imagenes) {
    let fotos = "";
    for (let img of imagenes) {
        fotos += `<div class="col-3 " style="width: 250px">
            <img src="${img}" class="img-thumbnail">
            </div>`;
    }
    return fotos;
}


// Funcion que muestra los comentarios ------>

function comentarios() {
    let htmlContentToAppend = ""
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];

        htmlContentToAppend += `
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

function mostrarEstrellas(score) {
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            estrellas += `<i class="fas fa-star checked"></i>`;
        }
        else {
            estrellas += `<i class="far fa-star checked"></i>`;
        }
    }
    return estrellas;
}

//      Funcion que agrega un nuevo comentario //

function agregarComentario (){
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth();
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds();

    if (month < 10){
        month = 0 + month;
    }
    if ( day < 10){
        day = 0 + day;
    }
    if (hour < 10){
        hour = 0 + hour;
    }
    if (minutes < 10){
        minutes = 0 + minutes;
    }
    if (seconds < 10){
        seconds = 0 + seconds;
    }

    let nuevosComentarios = {};

    nuevosComentarios.user = document.getElementById("nombre").value;
    nuevosComentarios.description = document.getElementById("comentario").value;
    nuevosComentarios.dateTime = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;
    nuevosComentarios.score = document.getElementById("puntaje").value

    array.push(nuevosComentarios);



}


//Funcion que guarda los a ID de los articulos para luego mostrarlos en productos relacionados ------->
function setArticulosID(id) {
    localStorage.setItem("productosID", id);
    window.location = "products-info.html"
}

//-----Variable que toma los datos de los productos -----
let productID = localStorage.getItem("productosID")


// Variable que te da el array de la informacion de los productos -------->

let productosInfo = PRODUCT_INFO_URL + productID + EXT_TYPE


document.addEventListener("DOMContentLoaded", function () {

    getJSONData(productosInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            imagenes = resultObj.data
            verProductos(imagenes);
            console.log(imagenes)
            mostrarRelacionados(imagenes)

        }

        document.getElementById("agregar").addEventListener("click", ()=>{
            location.href=("cart.html")
            carrito = JSON.parse(localStorage.getItem("productosID"));
            agregarCarrito(producto)
            
        })
    
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            array = resultObj.data
            comentarios(array)
            console.log(array)
        }

        document.getElementById("enviarComentario").addEventListener("click", ()=>{
            agregarComentario()
        })
        comentarios()
        

    

    });
    

});


function mostrarRelacionados(productosInfo) {
    let htmlContentToAppend = ""
    for (let i = 0; i < productosInfo.relatedProducts.length; i++) {
        let relacionados = productosInfo.relatedProducts[i]

        htmlContentToAppend +=
            `<div class="row" style="width:250px">
                <div onclick="setArticulosID(${relacionados.id})"class=" list-group-item-action cursor-active">
                <a href="product-info.html?producto= ` + relacionados.image + `"class="cursor-active list-group-item-action">
                <h5 class="text-center">${relacionados.name}</h5>
                <img src=${relacionados.image} class="img-thumbnail text-center">
                </div>
                </div>
                `
    }
    document.getElementById("relacionados").innerHTML = htmlContentToAppend
}

