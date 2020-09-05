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


ver.onclick = () => {
    obtenerBusquedaGifs(search.value);
};


const failSearch = document.querySelector('.failsearch');


function cambiarColor() {

    let img = document.querySelector('.logo');
    let comparacion = img.getAttribute('src');

    document.body.classList.toggle("oscuro");

    color.innerHTML=color.innerHTML=="Modo Nocturno"?"Modo Diurno":"Modo Nocturno";
    color2.innerHTML=color2.innerHTML=="MODO NOCTURNO"?"MODO DIURNO":"MODO NOCTURNO";

    if ( comparacion == "Sources\\assets\\logo-mobile.svg" ){
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
                div.appendChild(image);               
            });

            window.slick = document.querySelectorAll('.imagen');
            window.slickWidth = slick[0].offsetWidth;
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

let lista = document.querySelectorAll(".contenedor > div");
let cierre =document.querySelector(".zoom > .close");
cierre.addEventListener('touchstart', close, false);

for (i = 0; i < lista.length; i++) {
    lista[i].childNodes[1].addEventListener('touchstart', zoom, false);
};

function zoom(e){
    
    
    let imagen = e.target.getAttribute('src');
    
    let vista = document.querySelector('.zoom');
    vista.style.display= "flex";
    
    
    let menu = document.querySelector('.menu');
    menu.style.display="none";
    
    let primer = document.querySelector('.primera_seccion');
    primer.style.display = "none";
    
    vista.childNodes[3].childNodes[3].removeAttribute('src');
    vista.childNodes[3].childNodes[3].setAttribute('scr', imagen);
    
    window.scroll(0, 0);
}

function close(){
    let vista = document.querySelector('.zoom');
    vista.style.display= "none";
    
    let menu = document.querySelector('.menu');
    menu.style.display="block";

    let primer = document.querySelector('.primera_seccion');
    primer.style.display = "flex";
}

let ampliar = document.querySelectorAll(".links > .ultimo ");

for (i = 0; i < lista.length; i++) {
    ampliar[i].addEventListener( 'click', zoom_2, false);
};

let cierre2 =document.querySelector(".zoom > .close");
cierre2.addEventListener('click', close, false);

function zoom_2(e){

    let imagen = e.target.parentElement.parentElement.parentElement.childNodes[1].getAttribute('src');
    
    let vista = document.querySelector('.zoom');
    vista.style.display= "flex";
    
    //let menu = document.querySelector('.menu');
   //menu.style.display="none";
        
    vista.childNodes[3].childNodes[3].removeAttribute('src');
    vista.childNodes[3].childNodes[3].setAttribute('scr', imagen);
    
    window.scroll(0, 0);
};

//Barra de busqueda funcionamiento. 

const lupa = document.querySelector(".lupa");
lupa.addEventListener('click', busquedaGifs);

function obtenerBusquedaGifs(searching) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${searching}&api_key=${api_key}&limit=12`;
    
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
            data.data.forEach((el) => {
            
            //aqui va  la creacion de cada imagen
            /**
             * se tiene que crear un h2= donde va el nombre de la busqueda.
             * un section llamado busqueda_img
             *      otro section llamado imagenes_resultado
             *          en este section es que van las imagenes. 
             *      otro section llamado ver_mas
             *          aqui va un h2
             */



            /*
            busqueda.appendChild(tituloBusqueda);
            let busqueda_img = document.createElement('section');
            busqueda_img.classList.add('busqueda_img');
            busqueda.appendChild(busqueda_img);
            div.classList.add('imagen');
            contenedor.appendChild(div);
            const image = document.createElement('img');
            image.src = el.images.downsized.url;
            div.appendChild(image); */
            
            const image = document.createElement('img');
            image.src = el.images.downsized.url;
            imagenes_resultado.appendChild(image); 
        });
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

//function nuevaBusqueda()


