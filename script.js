let cambio = document.querySelector('.cambio');
cambio.addEventListener('click', cambiarColor, false);

let cambio2 = document.querySelector('.cambio2');
cambio2.addEventListener('click', cambiarColor, false);

let color = document.querySelector('#color');
let color2 = document.querySelector('#color2'); 
//let img = document.querySelector('.logo');
//let comparacion = img.getAttribute('src');

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

/*
let lista = document.querySelectorAll(".contenedor > div");

for (i = 0; i < lista.length; i++) {
    lista[i].childNodes[1].addEventListener('touchstart', zoom(lista[i].childNodes[1].getAttribute('src')), false);
  };

function zoom(foto){
    
    window.scroll(0, 0);

    let vista = document.querySelector('.zoom');
    vista.style.display= "flex";
    
    let menu = document.querySelector('.menu');
    menu.style.display="none";

    let primer = document.querySelector('.primera_seccion');
    primer.style.display = "none";

    vista.childNodes[3].removeAttribute('src');
    vista.setAttribute('scr', foto)
}


let cierre =document.querySelector(".zoom > .close");
cierre.addEventListener('touchstart', close, false);


function close(){
    let vista = document.querySelector('.zoom');
    vista.style.display= "none";
    
    let menu = document.querySelector('.menu');
    menu.style.display="block";

    let primer = document.querySelector('.primera_seccion');
    primer.style.display = "flex";
}*/