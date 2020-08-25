function cambiarColor() {
    let img = document.querySelector('.logo');
    let cuerpoweb = document.body;   
    let comparacion = img.getAttribute('src');

    cuerpoweb.classList.toggle("oscuro");
    
    color.innerHTML=color.innerHTML=="Modo Nocturno"?"Modo Diurno":"Modo Nocturno";

    if ( comparacion == "Sources\\assets\\logo-mobile.svg" ){
        img.removeAttribute('src');
        img.setAttribute('src','Sources\\assets\\logo-mobile-modo-noct.svg');
    }
    else {
       img.removeAttribute('src');
       img.setAttribute('src', 'Sources\\assets\\logo-mobile.svg');
    }   
}

function cambiarColor2() {
    let img = document.querySelector('.logo');
    let cuerpoweb = document.body;   
    let comparacion = img.getAttribute('src');

    cuerpoweb.classList.toggle("oscuro");
    
    color2.innerHTML=color2.innerHTML=="MODO NOCTURNO"?"MODO DIURNO":"MODO NOCTURNO";

    if ( comparacion == "Sources\\assets\\logo-mobile.svg" ){
        img.removeAttribute('src');
        img.setAttribute('src','Sources\\assets\\logo-mobile-modo-noct.svg');
    }
    else {
       img.removeAttribute('src');
       img.setAttribute('src', 'Sources\\assets\\logo-mobile.svg');
    }   
}

function cambioIco(){
    
}

function zoom(){
    let cuerpo = document.createElement("div");
    cuerpo.setAttribute("class","zoom")
    document.querySelector("main").insertBefore(cuerpo, document.querySelector(".primera_seccion"));
    
}