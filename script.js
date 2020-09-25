const api_key = "ROPHynejg9EN2A3Ck1EJ1zYD0rOs6cCg";

//variables a declara para el cambio nocturno y diurno.
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

let listaGifs = [];
let partialGifs = [];
let favoritos =[];

//variables para favoritos
let no_found = document.querySelector('.favoritos > .no_found');
let busq_fav = document.querySelector('.favoritos > .busqueda_fav');
let list_fav = document.querySelector('.busqueda_fav > .lista_favoritos');

const failSearch = document.querySelector('.failsearch');


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
 //traida de las imagenes.
document.addEventListener('DOMContentLoaded', getTendring);

function getTendring() {
    const url = `http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=20`;
    
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
                box_1.appendChild(imagen_2);
                                
                let div_4 = document.createElement('div');
                div_4.classList.add('box');
                box_1.after(div_4);

                let imagen_3 = document.createElement('img');
                imagen_3.setAttribute('src', 'Sources\\assets\\icon-download.svg');
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

            let fav = document.querySelectorAll(".links > .fav");
            
            for (let i = 0; i < lista.length; i++) {
                fav[i].addEventListener( 'click', corazon, false);
            };

        })
        .catch((err) => {
            console.log(`${err}`);
        })
}

// interacion carrousel
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
    
//codigo para el zoom, de las imagenes.

let cierre =document.querySelector(".zoom > .close");
cierre.addEventListener('touchstart', close, false);

function zoom(e){
        
    let imagen = e.target.getAttribute('src');
    let flecha = document.querySelector('.flechas');
    const image = document.createElement('img');
    image.src = imagen;
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
    
    let primer = document.querySelector('.primera_seccion');
    primer.style.display = "none";

    window.scroll(0, 0);
    
}

let cierre2 =document.querySelector(".zoom > .close");
cierre2.addEventListener('click', close, false);

function close(){
    let vista = document.querySelector('.zoom');
    vista.style.display= "none";
    
    let menu = document.querySelector('.menu');
    menu.style.display="block";

    let primer = document.querySelector('.primera_seccion');
    primer.style.display = "flex";

    //busqueda.style.display ='flex';

    // let titulo_busqueda = document.querySelector('.primera_seccion > h2');
    // titulo_busqueda.style.display = 'block';

    // let imagen_busqueda = document.querySelector('.primera_seccion > img');
    // imagen_busqueda.style.display = 'block';

    let imagen = document.querySelector('.pasarela > img');
    imagen.remove();
}

function zoom_2(e){

    let imagen = e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('src');
    
    let flecha = document.querySelector('.flechas');
    const image = document.createElement('img');
    image.src = imagen;
    flecha.after(image);

    let vista = document.querySelector('.zoom');
    vista.style.display= "flex";

    let titulo = document.querySelector('.seccion_baja > .contenido > h2');
    titulo.innerHTML =  e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;

    let user = document.querySelector('.seccion_baja > .contenido > p');
    user.innerHTML = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0].innerHTML;
      
    window.scroll(0, 0);
        
};

let favZoom = document.querySelector('.seccion_baja > .links > .box');
favZoom.addEventListener('click',corazon);

//Barra de busqueda funcionamiento. 

const lupa = document.querySelector(".lupa");
lupa.addEventListener('click', busquedaGifs);

function obtenerBusquedaGifs(searching) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${searching}&api_key=${api_key}&limit=25`;
    
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
        console.log(data.data.length);

        if (data.data.length == '0') {
            tituloFail.innerHTML= searching;
            busqueda.style.display = 'none';
            failSearch.style.display ='flex';         
        }

        else{
            tituloBusqueda.innerHTML= searching;
            failSearch.style.display ='none'; 
            busqueda.style.display = 'flex';

            listaGifs= data.data;
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

            for (i = 0; i < lista.length; i++) {
                lista[i].addEventListener('touchstart', zoom, false);
            };

            for (let i = 0; i < lista.length; i++) {
                ampliar[i].addEventListener( 'click', zoom_2, false);
            };
            }

            ver.addEventListener('click', (ev) =>{
                if (inicialPos + 13 <= listaGifs.length && finalPos + 13 <= listaGifs.length) {
                    partialGifs = listaGifs.slice(inicialPos + 13,finalPos + 13);
                    inicialPos += 13;
                    finalPos += 13;

                    impresionGifos(partialGifs);
                }
            })
            

            //en la version mobile se quita el titulo  y la imagen en la busqueda.
            console.log(screen.width);
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

//ver.addEventListener('click', obtenerBusquedaGifs(search.value));

function busquedaGifs(){
    obtenerBusquedaGifs(search.value);
}


// funcion <3 
function corazon(e) {
    let fav_empty = e.target.getAttribute('src');
    let box = e.target.parentElement;
    let id = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].getAttribute('id');
    let src = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].getAttribute('src');
    let title = e.target.parentNode.parentNode.parentNode.children[1].lastChild.innerHTML;
    let user =e.target.parentNode.parentNode.parentNode.children[1].firstChild.innerHTML;

    if (fav_empty == "Sources\\assets\\icon-fav-hover.svg"){
        e.target.removeAttribute('src');
        e.target.setAttribute('src','Sources\\assets\\icon-fav-active.svg');
        box.style.opacity='1';
        console.log(title);
        console.log(user);
        favoritos.push([id,src,title,user]);
        console.log(favoritos);
        localSaveFavorite(favoritos);    
    }

    // else{
    //    e.target.removeAttribute('src');
    //    e.target.setAttribute('src', 'Sources\\assets\\icon-fav-hover.svg');
    //    box.style.opacity='0.5';
    //    //e.target.parentElement.parentElement.parentElement.parentElement;
    //    localSaveFavorite(e.target.parentElement.parentElement.parentElement.parentElement);
    // }

    // if (favoritos.length != 0) {
    //     no_found.style.display = 'none';
    //     busq_fav.style.display = 'flex';
    //     mostrarFavoritos()        
    // }
    // else{
    //     no_found.style.display = 'flex';
    //     busq_fav.style.display = 'none';
    // }

    // function agregarGifs(id,src,title,user) {
    //     favoritos = { id: [
    //         `${src}`,
    //         `${title}`,
    //         `${user}`]
    //     };
    // }

}

//Guardado de los favoritos al localStorage

function localSaveFavorite(list) {
    localStorage.setItem('Favoritos', JSON.stringify(list));   
}

function mostrarFavoritos() {

    console.log(JSON.parse(localStorage.getItem('Favoritos')));
    // for (let i = 0; i < el.length; i++) {
    //     list_fav.appendChild(el[i]);    
    // }
}

//Sugerencias en las busquedas

let inputText = document.querySelector('#search');
let menuInput = document.querySelector('.menu-input');
let box_search = document.querySelector('.primera_seccion > .box');

//Diseño al ingresar texto en el input
inputText.addEventListener('input', showSearchMenu);

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
        // function Quitar() {
        //     var ultimo = document.getElementById('div_' + i);
        //     document.body.removeChild(ultimo);
        
        //     i = i - 1;
        // }
        //Condición de estilo cuando hay cambio de tema
        // if(nightTheme){
        //     imgLupa.setAttribute('src','./assets/Combined_Shape.svg');
        //     imgLupa.style.opacity = 1;
        //     searchButton.classList.replace('night-search-button-active','night-search-button-inactive');
        // }else{
        //     imgLupa.setAttribute('src','./assets/lupa.svg');
        //     imgLupa.style.opacity = 0.2;
        //     searchButton.classList.replace('day-search-button-active','day-search-button-inactive');
        // };   
    }else{ //cuando está lleno el input
        searchButtonActive = true;
        menuInput.style.display = "inline-block";
        box_search.style.height= '150px';
        //Condición de estilo cuando hay cambio de tema
        // if(nightTheme){
        //     imgLupa.setAttribute('src','./assets/lupa_light.svg');
        //     imgLupa.style.opacity = 1;
        //     searchButton.classList.replace('night-search-button-inactive','night-search-button-active');
        // }else{
        //     imgLupa.setAttribute('src','./assets/lupa.svg');
        //     imgLupa.style.opacity = 1;
        //     searchButton.classList.replace('day-search-button-inactive','day-search-button-active');
        // };

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
        window.scroll(0, 710);
        obtenerBusquedaGifs(inputText.value);
    });
});
//permite presionar la tecla escape y ocultar el menú de sugerencias
inputText.addEventListener('keydown', ()=>{
    menuInput.style.display = "none";
});