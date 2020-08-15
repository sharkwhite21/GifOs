function cambiarColor() {
    var cuerpoweb = document.body;     
    cuerpoweb.classList.toggle("oscuro");
    color.innerHTML=color.innerHTML=="Modo Nocturno"?"Modo Diurno":"Modo Nocturno";
}