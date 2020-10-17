const api_key = "ROPHynejg9EN2A3Ck1EJ1zYD0rOs6cCg";

//Se declara las variables a usar.
let cambio = document.querySelector('.cambio');
cambio.addEventListener('click', cambiarColor, false);
let cambio2 = document.querySelector('.cambio2');
cambio2.addEventListener('click', cambiarColor, false);
let color = document.querySelector('#color');
let color2 = document.querySelector('#color2'); 
let contenedor = document.querySelector('.contenedor');
const busqueda = document.querySelector('.busqueda')
const buttonPrev = document.querySelector('.left');
const buttonNext = document.querySelector('.right');
let imagenes_resultado = document.querySelector('.imagenes_resultado');
const search = document.querySelector('#search');
let tituloBusqueda = document.querySelector('.busqueda > h2');
let tituloFail = document.querySelector ('.failsearch > h2')
const ver = document.querySelector('.ver_mas');
const ver_fav = document.getElementById('mas_fav');



let indexHtml = window.location.pathname;
indexHtml2 = indexHtml + '/index.html';
let listaGifs = [];
let partialGifs = [];

//variables para favoritos
let link_favorito = document.querySelector('nav-items > link_fav_2');
let busq_fav = document.querySelector('.favoritos > .busqueda_fav');
let no_found = document.querySelector('.favoritos > .no_found_fav');
let list_fav = document.querySelector('.busqueda_fav > .lista_favoritos');
let favoritos =[];
let dire_fav = window.location.pathname;


let no_found_mi = document.querySelector('.mis_gifos > .no_found');
let busqueda_mis = document.querySelector('.busqueda_mis');
let vermas_mis = document.getElementById('vermas_mis');
let lista_misgifos = document.querySelector('.busqueda_mis > .lista_misgifos');

let mis_gi = window.location.pathname;

let contador_busq = 0;

// mirando si aqui hay o no favoritos en el local storage
// para tener control de si agregar uno que ya esta o eliminarlo. 
if (localStorage.getItem('Favoritos')  != null ) {
    favoritos = JSON.parse(localStorage.getItem('Favoritos'));
    
} else {
    console.log('llename de gifs UwU');
}

// para saber si estoy en Fav o mis Gifos, y activar los script destinados a ellos. 
comprobacion_fav(dire_fav);
comprobacion_mis(mis_gi);
//comprobacion_index(indexHtml);

//Variables para la Sugerencias en las busquedas
let inputText = document.querySelector('#search');
let menuInput = document.querySelector('.menu-input');
let box_search = document.querySelector('.primera_seccion > .box');
let primer = document.querySelector('#seccionPrime');
let lupa = document.querySelector("#lupas");

//Comprobacion de que se esta en index para activar la lupa.
if (indexHtml == '/index.html' || indexHtml2 == 'GifOs/index.html' || indexHtml == '/GifOs/') {
    lupa.addEventListener('click', busquedaGifs);
    lupa.addEventListener('touchstart', busquedaGifs);
    //Diseño al ingresar texto en el input
    inputText.addEventListener('input', showSearchMenu);
}
else{
    console.log('no, estamos en mis Gifos  o entra pagina, tal vez Fav?>:c');
}

// variable de la falla de la busqueda.
const failSearch = document.querySelector('.failsearch');


//funcion para cambiar el color Dark y Light mode.
function cambiarColor() {

    let img = document.querySelector('.logo');
    let comparacion = img.getAttribute('src');

    document.body.classList.toggle("oscuro");


    color.innerHTML=color.innerHTML=="Modo Nocturno"?"Modo Diurno":"Modo Nocturno";
    color2.innerHTML=color2.innerHTML=="MODO NOCTURNO"?"MODO DIURNO":"MODO NOCTURNO";

    if ( comparacion == "Sources\\assets\\logo-mobile.svg"){
        img.removeAttribute('src');
        img.setAttribute('src','Sources\\assets\\logo-mobile-modo-noct.svg');
    }
    else {
       img.removeAttribute('src');
       img.setAttribute('src', 'Sources\\assets\\logo-mobile.svg');
    }
    
    if (document.body.classList.contains("oscuro")) {
        localStorage.setItem('dark','true');
    }else{
        localStorage.setItem('dark', 'false');
    }   
}


//Persistencia y cambios en el localStorage
if (localStorage.getItem('dark')=== 'true') {
    document.body.classList.add("oscuro");

    if (color.innerHTML=="Modo Nocturno") {
        color.innerHTML="Modo Diurno";
    }
    
    if (color2.innerHTML=="MODO NOCTURNO") {
        color2.innerHTML="MODO DIURNO";
    }

    let img = document.querySelector('.logo');
    let comparacion = img.getAttribute('src');
    
    if ( comparacion == "Sources\\assets\\logo-mobile.svg" ){
        img.removeAttribute('src');
        img.setAttribute('src','Sources\\assets\\logo-mobile-modo-noct.svg');
    }


}else{
    document.body.classList.remove("oscuro");

    if (color.innerHTML=="Modo Diurno") {
        color.innerHTML="Modo Nocturno";
    }
    
    if (color2.innerHTML=="MODO DIURNO") {
        color2.innerHTML="MODO NOCTURNO";
    }

    let img = document.querySelector('.logo');
    let comparacion = img.getAttribute('src');
    
    if ( comparacion == "Sources\\assets\\logo-mobile-modo-noct.svg" ){
        img.removeAttribute('src');
        img.setAttribute('src','Sources\\assets\\logo-mobile.svg');
    }
}

 //traida de las imagenes del trending
document.addEventListener('DOMContentLoaded', getTendring);

function getTendring() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=20`;
    
    fetch(url)
        .then((success) => {
            if (success.ok) {
                return success.json();
            } else {
                throw new Error(('success') + 'no se puede comunicar con la API');
            }
        })

        .then((data) => {
            data.data.forEach((el) => {

                //aqui va  la creacion de cada imagen
                let div = document.createElement('div');
                div.classList.add('imagen');
                contenedor.appendChild(div);

                const image = document.createElement('img');
                image.src = el.images.downsized.url;
                image.id = el.id;

                div.appendChild(image);


                //creacion del div hover para cada imagen.
                let section = document.createElement('section');
                section.classList.add('sombra');
                section.classList.add('desktop');
                image.after(section);
                                
                let links = document.createElement('div');
                links.classList.add('links');
                section.appendChild(links);

                
                let box_1 = document.createElement('div');
                box_1.classList.add('box');
                box_1.classList.add('fav');
                links.appendChild(box_1);

                let imagen_2 = document.createElement('img');
                imagen_2.setAttribute('src', 'Sources\\assets\\icon-fav-hover.svg');
                imagen_2.addEventListener( 'click', corazon, false);
                box_1.appendChild(imagen_2);
                                
                let div_4 = document.createElement('div');
                div_4.classList.add('box');
                box_1.after(div_4);

                let imagen_3 = document.createElement('img');
                imagen_3.setAttribute('src', 'Sources\\assets\\icon-download.svg');
                imagen_3.addEventListener('click',descargar,false);
                div_4.appendChild(imagen_3);
                
                let div_5 = document.createElement('div');
                div_5.classList.add('box');
                div_5.classList.add('ultimo');
                div_4.after(div_5);

                let imagen_4 = document.createElement('img');
                imagen_4.setAttribute('src', 'Sources\\assets\\icon-max.svg');
                div_5.appendChild(imagen_4);
                
                
                let div_6 = document.createElement('div');
                div_6.classList.add('contenido');
                links.after(div_6);
                
                let p = document.createElement('p');
                let h2 = document.createElement('h2');
                
                if (el.username == '') {
                    p.innerHTML = 'Sin Usuario'
                }
                else{
                    p.innerText = el.username;
                }
                div_6.appendChild(p)

                if (el.title == '') {
                    h2.innerText = 'Sin Titulo'
                }
                else{
                    h2.innerText = el.title;
                }

                div_6.appendChild(h2);

                if (favoritos.includes(el.id) == true ) {
                    imagen_2.removeAttribute('src');
                    imagen_2.setAttribute('src', 'Sources\\assets\\icon-fav-active.svg');
                    box_1.style.opacity = "0.99";
                    section.classList.add('activa');
                }
            });

            window.slick = document.querySelectorAll('.imagen');
            window.slickWidth = slick[0].offsetWidth;

            let lista = document.querySelectorAll(".imagen > img");

            for (i = 0; i < lista.length; i++) {
                lista[i].addEventListener('touchstart', zoom, false);
            };

            let ampliar = document.querySelectorAll(".links > .ultimo ");

            for (let i = 0; i < lista.length; i++) {
                 ampliar[i].addEventListener( 'click', zoom_2, false);
            };

        })
        .catch((err) => {
            console.log(`${err}`);
        })
}

// interacion del carrusel para poder pasar las imagenes. 
const slickList = document.querySelector('.imagenes');
const track = document.querySelector('.contenedor');

buttonPrev.onclick = () => {
    Move(1);
};

buttonNext.onclick = () => {
    Move(2);
};
    
function Move(number) {
 
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    if(leftPosition < (trackWidth - listWidth) && number == 2) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    } else if(leftPosition > 0 && number == 1) {
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}
    
//codigo para el zoom, de las imagenes, y la implemenatcion de sus acciones en el zoom.
let cierre =document.querySelector(".zoom > .close");
cierre.addEventListener('touchstart', close, false);
let cierre2 =document.querySelector(".zoom > .close");
cierre2.addEventListener('click', close, false);

function zoom(e){
        
    let imagen = e.target.getAttribute('src');
    let id = e.target.getAttribute('id');
    let flecha = document.querySelector('.flechas');
    const image = document.createElement('img');
    image.src = imagen;
    image.id = id;
    flecha.after(image);
    
    let vista = document.querySelector('.zoom');
    vista.style.display= "flex";

    let titulo = document.querySelector('.seccion_baja > .contenido > h2');
    titulo.innerHTML =  e.target.parentElement.childNodes[1].childNodes[1].childNodes[1].innerHTML;

    let user = document.querySelector('.seccion_baja > .contenido > p');
    user.innerHTML = e.target.parentElement.childNodes[1].childNodes[1].childNodes[0].innerHTML;

    
    let menu = document.querySelector('.menu');
    menu.style.display="none";

    let busqueda = document.querySelector('.busqueda');
    busqueda.style.display = "none"
    
    
    primer.style.display = "none";

    window.scroll(0, 0);
    
}



function close(){
    let vista = document.querySelector('.zoom');
    vista.style.display= "none";

    let menu = document.querySelector('.menu');
    menu.style.display="block";

    let imagen = document.querySelector('.pasarela > img');
    imagen.remove();
    

    let box = document.querySelector('#fav').childNodes[1];
    box.removeAttribute('src');
    box.setAttribute('src','Sources\\assets\\icon-fav-hover.svg');

    if (inputText.value != "") {
        busqueda.style.display ='flex';   
    }
    else{
        busqueda.style.display ='none';
    }


    if (  window.location.pathname == "/index.html") {
        primer.style.display = "flex";
    }
}

function zoom_2(e){

    let imagen = e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('src');
    let id = e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('id');
    
    let flecha = document.querySelector('.flechas');
    const image = document.createElement('img');
    image.src = imagen;
    image.id = id;
    flecha.after(image);

    let vista = document.querySelector('.zoom');
    vista.style.display= "flex";

    let titulo = document.querySelector('.seccion_baja > .contenido > h2');
    titulo.innerHTML =  e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;

    let user = document.querySelector('.seccion_baja > .contenido > p');
    user.innerHTML = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0].innerHTML;
      
    window.scroll(0, 0);
        
};

// acciones de corazon y descargar en el zoom
let favZoom = document.querySelector('.seccion_baja > .links > .box');
favZoom.addEventListener('click',corazon_2);

let desFav =document.querySelector('.seccion_baja > .links > .descarga');
desFav.addEventListener('click',descargar_2);

//Codigo para la seccion de busqueda en el main.
function obtenerBusquedaGifs(searching) {

    const url = `https://api.giphy.com/v1/gifs/search?q=${searching}&api_key=${api_key}`;
    
    fetch(url)
    .then((success) => {
        if (success.ok) {
            return success.json();
        } else {
            failsearch.style.display = 'flex';
            throw new Error(('success') + 'no se puede comunicar con la API');
        }
    })
    .then((data) => {

        if (data.data.length == '0') {
            tituloFail.innerHTML= searching;
            busqueda.style.display = 'none';
            failSearch.style.display ='flex';         
        }

        else{
            tituloBusqueda.innerHTML= searching;
            failSearch.style.display ='none'; 
            busqueda.style.display = 'flex';
            ver.style.display = 'flex';
            listaGifs= data.data;
            let contador_lis = listaGifs / 12;
            
            let inicialPos = 0;
            let finalPos = 12;
            partialGifs = listaGifs.slice(inicialPos,finalPos);

            impresionGifos(partialGifs);

            function impresionGifos(partialGifs){
            partialGifs.forEach((el) => {
                
                let div = document.createElement('div');
                div.classList.add('imagens');
                imagenes_resultado.appendChild(div);

                const image = document.createElement('img');
                image.src = el.images.downsized.url;
                image.id = el.id;
                div.appendChild(image);

                //creacion del div hover para cada imagen.

                let section = document.createElement('section');
                section.classList.add('sombra_2');
                section.classList.add('desktop');
                div.appendChild(section);
                            
                let links = document.createElement('div');
                links.classList.add('links_2');
                section.appendChild(links);     

            
                let box_1 = document.createElement('div');
                box_1.classList.add('box_2');
                box_1.classList.add('fav_2');
                links.appendChild(box_1);

                let imagen_2 = document.createElement('img');
                imagen_2.setAttribute('src', 'Sources\\assets\\icon-fav-hover.svg');
                box_1.appendChild(imagen_2);
                        
                let div_4 = document.createElement('div');
                div_4.classList.add('box_2');
                box_1.after(div_4);

                let imagen_3 = document.createElement('img');
                imagen_3.setAttribute('src', 'Sources\\assets\\icon-download.svg');
                div_4.appendChild(imagen_3);
            
                let div_5 = document.createElement('div');
                div_5.classList.add('box_2');
                div_5.classList.add('ultimo_2');
                div_4.after(div_5);

                let imagen_4 = document.createElement('img');
                imagen_4.setAttribute('src', 'Sources\\assets\\icon-max.svg');
                div_5.appendChild(imagen_4);
                        
                let div_6 = document.createElement('div');
                div_6.classList.add('contenido_2');
                links.after(div_6);
            
                let p = document.createElement('p');
                let h2 = document.createElement('h2');
                
                if (el.username == '') {
                    p.innerHTML = 'Sin Usuario'
                }
                else{
                    p.innerText = el.username;
                }
                div_6.appendChild(p)

                if (el.title == '') {
                    h2.innerText = 'Sin Titulo'
                }
                else{
                    h2.innerText = el.title;
                }

                div_6.appendChild(h2);                
        });

            let lista = document.querySelectorAll(".imagens > img");
            let ampliar = document.querySelectorAll(".links_2 > .ultimo_2 ");
            let fav = document.querySelectorAll(".links_2 > .fav_2");

            for (i = 0; i < lista.length; i++) {
                lista[i].addEventListener('touchstart', zoom, false);
            };

            for (let i = 0; i < lista.length; i++) {
                ampliar[i].addEventListener( 'click', zoom_2, false);
            };
            
            for (let i = 0; i < lista.length; i++) {
                fav[i].addEventListener( 'click', corazon, false);
            };

            }

            ver.addEventListener('click', (ev) =>{
                if (inicialPos + 13 <= listaGifs.length && finalPos + 13 <= listaGifs.length && contador_busq < contador_lis) {
                    partialGifs = listaGifs.slice(inicialPos + 13,finalPos + 13);
                    inicialPos += 13;
                    finalPos += 13;
                    contador_busq +=1;
                    impresionGifos(partialGifs);
                }

                else{
                    partialGifs = listaGifs.slice(inicialPos + 13,finalPos + 13);
                    inicialPos += 13;
                    finalPos += 13;
                    contador_busq =0;
                    impresionGifos(partialGifs);
                    ver.style.display = 'none';
                }
            })
            

            //en la version mobile se quita el titulo  y la imagen en la busqueda.
            if ( screen.width <= 1000) {
                let titulo_busqueda = document.querySelector('.primera_seccion > h1');
                titulo_busqueda.style.display = 'none';
            
                let imagen_busqueda = document.querySelector('.primera_seccion > img');
                imagen_busqueda.style.display = 'none';
            }
            else{
                console.log('nada del otro mundo.');
            }
        }
    })

    .catch((err) => {
        console.log(`${err}`);
    })
}

function busquedaGifs(){
    obtenerBusquedaGifs(search.value);
    ver.style.display = 'flex';
}

//Menu de sugerencias
async function showSearchMenu(event){
    //Condición para mostrar cuando el menú de sugerencias aparecerá
    //cuando está vacío el input
    if(!event.target.value){
        searchButtonActive = false;
        menuInput.style.display = "none";
        box_search.style.height= '50px';
        busqueda.style.display='none';
        let borrado = document.querySelectorAll('.imagenes_resultado > .imagens');
        let padre =document.querySelector('.imagenes_resultado');
        
        if (borrado.length > 0) {
            for (let i = 0; i < borrado.length; i++) {
                padre.removeChild(borrado[i]);
            }
        }
        else{
            console.log('nada que decir');
        }

        let titulo_busqueda = document.querySelector('.primera_seccion > h1');
        titulo_busqueda.style.display = 'block';
    
        let imagen_busqueda = document.querySelector('.primera_seccion > img');
        imagen_busqueda.style.display = 'block';

    }else{ //cuando está lleno el input
        searchButtonActive = true;
        menuInput.style.display = "inline-block";
        box_search.style.height= '150px';

        //Llamado de la API para obtener terminos relacionados (sugerencias).
        let url = `https://api.giphy.com/v1/tags/related/${inputText.value}?api_key=${api_key}&limit=3`;
        let resp = await fetch(url);
        let suggestedSearchData = await resp.json();
        //Llena los 3 cuadros de sugerencias
        for(let i = 0; i<3; i++){
            let suggestTerm = document.getElementById(`suggest-term-${i+1}`);
            suggestTerm.innerHTML = `${suggestedSearchData.data[i].name}`; 
        };
    };
};

//función para hacer click en las sugerencias y buscarlas
//convierto el HTMLCollection en un array y uso map para iterarlo
Array.from(document.getElementsByClassName('suggest-term')).map((el)=>{
    el.addEventListener('click', function(){
        inputText.value = el.innerHTML;  
        obtenerBusquedaGifs(inputText.value);
    });
});


//Codigo para las inteacciones tanto des descargar y favoritear de las imagenes
//tanto del trending, como de las busquedas, como de favoritos.
// funcion <3 para trending y busquedas. 
function corazon(e) {
    let fav_empty = e.target.getAttribute('src');
    let box = e.target.parentElement;
    let id = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].getAttribute('id');
    console.log(id);
    let sombra = e.target.parentElement.parentElement.parentElement;

    // condicionales para saber si el gif a guardar en local storage existe.
    if (fav_empty == "Sources\\assets\\icon-fav-hover.svg"){
        e.target.removeAttribute('src');
        e.target.setAttribute('src','Sources\\assets\\icon-fav-active.svg');
        box.style.opacity='1';
        sombra.classList.add('activa');

        if (favoritos.includes(id) != true || favoritos.length == 0) {
            favoritos.push(id);            
        }

        localSaveFavorite(favoritos);
        
        if ( dire_fav == '/favoritos.html') {
                borradoFav();
                mostrarFavoritos();
            }
            
    }   

    else{
       e.target.removeAttribute('src');
       e.target.setAttribute('src', 'Sources\\assets\\icon-fav-hover.svg');
       box.style.opacity='0.5';
       sombra.classList.remove('activa');
       if (favoritos.includes(id) == true) {
            let index = favoritos.indexOf(id);
             //localRemoveFavorite(id);
            if (index > -1) {
                favoritos.splice(index, 1);
            }
            localSaveFavorite(favoritos); 
        }

        if ( dire_fav == '/favoritos.html') {
            borradoFav();
            mostrarFavoritos();
        }
    }

    // if (favoritos.length != 0) {
    //     no_found.style.display = 'none';
    //     busq_fav.style.display = 'flex';
    //     mostrarFavoritos()        
    // }
    // else{
    //     no_found.style.display = 'flex';
    //     busq_fav.style.display = 'none';
    // }
}

//funcion <3 para las tarjetas que estan en el zoom.
function corazon_2(e) {
    let fav_empty = e.target.getAttribute('src');
    let id = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[2].getAttribute('id'); 

    // condicionales para saber si el gif a guardar en local storage existe.
    if (fav_empty == "Sources\\assets\\icon-fav-hover.svg"){
        e.target.removeAttribute('src');
        e.target.setAttribute('src','Sources\\assets\\icon-fav-active.svg');

        if (favoritos.includes(id) != true || favoritos.length == 0) {
            favoritos.push(id);            
        }

        localSaveFavorite(favoritos);
        
        if ( dire_fav == '/favoritos.html') {
                borradoFav();
                mostrarFavoritos();
            }
            
    }   

    else{
       e.target.removeAttribute('src');
       e.target.setAttribute('src', 'Sources\\assets\\icon-fav-hover.svg');

       if (favoritos.includes(id) == true) {
            let index = favoritos.indexOf(id);
             //localRemoveFavorite(id);
            if (index > -1) {
                favoritos.splice(index, 1);
            }
            localSaveFavorite(favoritos); 
        }

        if ( dire_fav == '/favoritos.html') {
            borradoFav();
            mostrarFavoritos();
        }
    }
}

function borradoFav() {
    let borrado = document.querySelectorAll('.lista_favoritos > .imagens');
    let padre =document.querySelector('.lista_favoritos');
    for (let i = 0; i < borrado.length; i++) {
        padre.removeChild(borrado[i]);
    }
}

//Funcion de descargar la imagen
function descargar(e) {
    let url = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].getAttribute('src');
    let tit = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;
    gifDescargar(url,tit);
}
function descargar_2(e) {
    let url = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[2].getAttribute('src'); 
    let tit = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[3].innerHTML;
    gifDescargar(url,tit);
}

const gifDescargar = function(data,tit){
    (async () => {
      let a = document.createElement('a');
      let d = data;
      let response = await fetch(d);
      let file = await response.blob();
      a.download = tit;
      a.href = window.URL.createObjectURL(file);
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
      a.click();
    })();
    }


//Guardado de los favoritos al localStorage
function localSaveFavorite(list) {
    localStorage.setItem('Favoritos', JSON.stringify(list));   
}

//Mostrar los Gifs que tenemos en localStorage mostrar en Favoritos
function mostrarFavoritos(){    
    let recuperacion = [];
    recuperacion = JSON.parse(localStorage.getItem('Favoritos'));
    console.log(recuperacion);
    

    if (recuperacion == null) {
        recuperacion =[]
        muestra(recuperacion);
    } else {
        muestra(recuperacion);
    }


    if (recuperacion.length < 12  || recuperacion.length == 0) {
        ver_fav.style.display = 'none';
    }

    else{
        ver_fav.style.display = 'flex';
    }

    let inicialPos = 0;
    let finalPos = 12;
    partialGifs = recuperacion.slice(inicialPos,finalPos);



    impresionGifos(partialGifs);

    function impresionGifos(partialGifs){
    partialGifs.forEach(el => {
        const url = `https://api.giphy.com/v1/gifs/${el}?api_key=${api_key}`;
        fetch(url)
            .then((success) => {
                if (success.ok) {
                    return success.json();
                } else {
                    failsearch.style.display = 'flex';
                    throw new Error(('success') + 'no se puede comunicar con la API');
                }
             })

            .then((data) => {
                
                let div = document.createElement('div');
                div.classList.add('imagens');
                list_fav.appendChild(div);

                const image = document.createElement('img');
                image.src = data.data.images.downsized.url;
                image.id = data.data.id;
                div.appendChild(image);

                //creacion del div hover para cada imagen.

                let section = document.createElement('section');
                section.classList.add('sombra_2');
                section.classList.add('desktop');
                div.appendChild(section);
                            
                let links = document.createElement('div');
                links.classList.add('links_2');
                section.appendChild(links);

            
                let box_1 = document.createElement('div');
                box_1.classList.add('box_2');
                box_1.classList.add('fav_2');
                box_1.style.opacity='1';
                links.appendChild(box_1);

                let imagen_2 = document.createElement('img');
                imagen_2.setAttribute('src', 'Sources\\assets\\icon-fav-active.svg');
                imagen_2.addEventListener( 'click', corazon, false);
                box_1.appendChild(imagen_2);
                
                        
                let div_4 = document.createElement('div');
                div_4.classList.add('box_2');
                box_1.after(div_4);

                let imagen_3 = document.createElement('img');
                imagen_3.setAttribute('src', 'Sources\\assets\\icon-download.svg');
                imagen_3.addEventListener('click',descargar,false);
                div_4.appendChild(imagen_3);
            
                let div_5 = document.createElement('div');
                div_5.classList.add('box_2');
                div_5.classList.add('ultimo_2');
                div_5.addEventListener( 'click', zoom_2, false);
                div_4.after(div_5);

                let imagen_4 = document.createElement('img');
                imagen_4.setAttribute('src', 'Sources\\assets\\icon-max.svg');
                div_5.appendChild(imagen_4);
                        
                let div_6 = document.createElement('div');
                div_6.classList.add('contenido_2');
                links.after(div_6);
            
                let p = document.createElement('p');
                let h2 = document.createElement('h2');
                
                if (el.username == '') {
                    p.innerHTML = 'Sin Usuario'
                }
                else{
                    p.innerText = data.data.username;
                }
                div_6.appendChild(p)

                if (el.title == '') {
                    h2.innerText = 'Sin Titulo'
                }
                else{
                    h2.innerText = data.data.title;
                }

                div_6.appendChild(h2);                
                

             })

            .catch((err) => {
                console.log(`${err}`);
            })
        })
            
    }

    if (recuperacion.length > 12) {
        ver_fav.addEventListener('click', (ev)=>{
            if (inicialPos + 13 <= recuperacion.length || finalPos + 13 <= recuperacion.length) {
                partialGifs = recuperacion.slice(inicialPos + 13,finalPos + 13);
                inicialPos += 13;
                finalPos += 13;
                impresionGifos(partialGifs);
            }
            else{
                console.log('no esta funcionando revisa bien please');
            }
        })    
    }
}
    
//comprobar en que pagina se esta para activar los script.
function comprobacion_fav(direccion) {
    if (direccion == '/favoritos.html') {
        document.addEventListener('DOMContentLoaded', mostrarFavoritos);
    }
    else{
        console.log('no estamos en fav >:c');
    }
}

function comprobacion_mis(direccion) {
    if (direccion == '/misgifos.html') {
        document.addEventListener('DOMContentLoaded', mostrarMisGifos);
    }
    else{
        console.log('no estamos en mis Gifos >:c');
    }
}

// muestra si esta o no vacio la seccion. 
function muestra(list) {
    if (list.length == 0 || list.length == null ) {
        no_found.style.display = "flex";
        busq_fav.style.display = "none";
        ver.style.display = 'none';
    }
    else{
        no_found.style.display = "none";
        busq_fav.style.display = "flex";
        ver.style.display = 'flex';
    }
}

//Mostrar los Gifs que tenemos en localStorage mostrar en MisGifos
function mostrarMisGifos(){
    
    let recuperacion2 = [];
    recuperacion2 = JSON.parse(localStorage.getItem('MisGifos'));
    muestra2(recuperacion2);

    if (recuperacion2.length < 12 ) {
        vermas_mis.style.display = 'none';
    }

    else{
        vermas_mis.style.display = 'flex';
    }

    recuperacion2.forEach(el => {
        const url = `https://api.giphy.com/v1/gifs/${el}?api_key=${api_key}`;

        fetch(url)
            .then((success) => {
                if (success.ok) {
                    return success.json();
                } else {
                    failsearch.style.display = 'flex';
                    throw new Error(('success') + 'no se puede comunicar con la API');
                }
             })

            .then((data) => {
                
                let div = document.createElement('div');
                div.classList.add('imagens');
                lista_misgifos.appendChild(div);

                const image = document.createElement('img');
                image.src = data.data.images.downsized.url;
                image.id = data.data.id;
                div.appendChild(image);

                //creacion del div hover para cada imagen.

                let section = document.createElement('section');
                section.classList.add('sombra_2');
                section.classList.add('desktop');
                div.appendChild(section);
                            
                let links = document.createElement('div');
                links.classList.add('links_2');
                section.appendChild(links);

            
                let box_1 = document.createElement('div');
                box_1.classList.add('box_2');
                box_1.classList.add('fav_2');
                box_1.style.opacity='1';
                links.appendChild(box_1);

                let imagen_2 = document.createElement('img');
                imagen_2.setAttribute('src', 'Sources\\assets\\icon_trash.svg');
                //imagen_2.addEventListener( 'click', corazon, false);
                box_1.appendChild(imagen_2);
                
                        
                let div_4 = document.createElement('div');
                div_4.classList.add('box_2');
                box_1.after(div_4);

                let imagen_3 = document.createElement('img');
                imagen_3.setAttribute('src', 'Sources\\assets\\icon-download.svg');
                imagen_3.addEventListener('click',descargar, false);
                div_4.appendChild(imagen_3);
            
                let div_5 = document.createElement('div');
                div_5.classList.add('box_2');
                div_5.classList.add('ultimo_2');
                div_5.addEventListener( 'click', zoom_2, false);
                div_4.after(div_5);

                let imagen_4 = document.createElement('img');
                imagen_4.setAttribute('src', 'Sources\\assets\\icon-max.svg');
                div_5.appendChild(imagen_4);
                        
                let div_6 = document.createElement('div');
                div_6.classList.add('contenido_2');
                links.after(div_6);
            
                let p = document.createElement('p');
                let h2 = document.createElement('h2');
                
                if (el.username == '') {
                    p.innerHTML = 'Sin Usuario'
                }
                else{
                    p.innerText = data.data.username;
                }
                div_6.appendChild(p)

                if (el.title == '') {
                    h2.innerText = 'Sin Titulo'
                }
                else{
                    h2.innerText = data.data.title;
                }

                div_6.appendChild(h2);                
             })
            
            .catch((err) => {
                console.log(`${err}`);
            })
        })
            
    }

function muestra2(list) {
    if (list.length == 0) {
        no_found_mi.style.display = "flex";
        busqueda_mis.style.display = "none";
    }
    else{
        no_found_mi.style.display = "none";
        busqueda_mis.style.display = "flex";
    }
}