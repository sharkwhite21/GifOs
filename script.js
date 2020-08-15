
function cambiarColor() {
    let img = document.querySelector('.logo'); 
    var cuerpoweb = document.body;   
    let comparacion = img.getAttribute('src');

    cuerpoweb.classList.toggle("oscuro");
    
    color.innerHTML=color.innerHTML=="Modo Nocturno"?"Modo Diurno":"Modo Nocturno";

    if ( comparacion == "Sources\\assets\\logo-mobile.svg" ){
        img.removeAttribute('src');
        img.setAttribute('src','Sources\\assets\\logo-desktop-modo-noc.svg');
    }
    else {
       img.removeAttribute('src');
       img.setAttribute('src', 'Sources\\assets\\logo-mobile.svg');
    }
}
