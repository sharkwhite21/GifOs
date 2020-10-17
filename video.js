let comenzarGrabar = document.querySelector('.parte_baja > .comenzar');
let grabar = document.querySelector('.parte_baja > .grabar');
let detener = document.querySelector('.parte_baja > .detener');
let subirGif = document.querySelector('.parte_baja > .subirGif');
let palabraBotton = document.querySelector('.comenzar > h2');
let titulo = document.querySelector('#titulo');
let consejos = document.querySelectorAll('#consejos');
let recorderVideo = document.getElementById('recorder');
let cajaVideo = document.querySelector('.video-container');
let cajaInformacion= document.querySelector('.informacion');
let uploading= document.querySelector('.uploading');
let links= document.querySelector('.uploading > .links');
let cajaSup = document.querySelector('.cajas_superiores');
let cajaInf = document.querySelector('.cajas_inferiores');
let number1 = document.querySelector('.numeros_creacion > .one');
let number2 = document.querySelector('.numeros_creacion > .two');
let number3 = document.querySelector('.numeros_creacion > .three');
let time = document.querySelector(".time");
let repetirCaptura = document.querySelector('.repetircaptura');
const preview = document.querySelector(".gif_preview");
const previewContainer = document.querySelector(".gif_preview_container");
let streaming = false;
let linksEnlaceDownload= document.querySelector('.uploading > .links >.download');
let linksEnlaceCompartir= document.querySelector('.uploading > .links > .compartir');
const api_key = "ROPHynejg9EN2A3Ck1EJ1zYD0rOs6cCg";


//variables a declara para el cambio nocturno y diurno.
let cambio = document.querySelector('.cambio');
cambio.addEventListener('click', cambiarColor, false);

let cambio2 = document.querySelector('.cambio2');
cambio2.addEventListener('click', cambiarColor, false);

let color = document.querySelector('#color');
let color2 = document.querySelector('#color2'); 

misGifos =[];

let stream;
let recorder;
let blob;
let form;
let urlBlobPrevie;
let dataPostId;
let gifLink;

if (localStorage.getItem('MisGifos')  != null ) {
  misGifos = JSON.parse(localStorage.getItem('MisGifos'));
  
} else {
  console.log('llename de gifs plox');
}

//Para empezar a grabar.
comenzarGrabar.addEventListener('click', () => {
    comenzarGrabar.style.display= "none";
    titulo.innerHTML = '¿Nos das acceso <br> a tu cámara?';
    consejos[0].innerHTML = 'El acceso a tu camara será válido sólo';
    consejos[1].innerHTML = 'por el tiempo en el que estés creando el GIFO.';
    number1.classList.remove('circle');
    number1.classList.add('circle_fun');
    cajaSup.style.marginTop = '10px';
    cajaInf.style.marginTop = '0px';
    cajaInf.style.marginBottom = '10px';
    cajaVideo.style.display = 'block';
    cajaInformacion.style.display = 'none';

    getStream();
});

//pide los permisos para empezar a grabar
function getStream() {

    
    const videoContain = {
              video: true,
              audio: false
          };
          navigator.mediaDevices.getUserMedia(videoContain)

          .then(stream => {
                number1.classList.add('circle');
                number1.classList.remove('circle_fun');
                number2.classList.remove('circle');
                number2.classList.add('circle_fun');
                grabar.style.display = 'flex';
                recorderVideo.srcObject = stream;
                //recorderVideo.play();
          })
        .catch(error => {
            console.error(error);
        });
  }

//boton grabar
grabar.addEventListener("click",(e)=>{
    startRecording();
    grabar.style.display = 'none';
    detener.style.display ='flex';
    repetirCaptura.style.display = 'none';
});

//inicio de la grabacion
function startRecording() {
    recording = true;
    recorder = RecordRTC(recorderVideo.srcObject, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      recorderType: GifRecorder,
      onGifRecordingStarted: function () {
        recorderVideo.play();
        console.log("started");
      }
    });
    recorder.startRecording();
    getDuration();
  }

//parar la grabacion
detener.addEventListener("click",()=>{
    detener.style.display ='none';
    subirGif.style.display = 'flex';
    number2.classList.add('circle');
    number2.classList.remove('circle_fun');
    number3.classList.remove('circle');
    number3.classList.add('circle_fun');

    stopAndPost()
  });

//se agrega el repetir la captura
repetirCaptura.addEventListener('click',()=>{
    grabar.style.display = "flex";
    subirGif.style.display = "none";
    previewContainer.style.display = 'none';
    repetirCaptura.style.display = 'none';
    time.style.display = 'flex';
    time.innerHTML = '';
    cajaVideo.style.display = 'flex';
    number1.classList.remove('circle');
    number2.classList.add('circle_fun');
    number3.classList.add('circle');
    number3.classList.remove('circle_fun');
    getStream();
})

//detener la grabacion
async function stopAndPost(){
    await recorder.stopRecording();
    //detengo la grabación
    blob = recorder.getBlob();
    //configuramos lo que irá en el body del método post
    form = new FormData();
    form.append('file', blob, 'myGif.gif');
    // Cambio el estado de streaming
    recording = false;
    //apago la cámara
    recorderVideo.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
    //reinicio la cámara y así desaparece el video
    cajaVideo.style.display = "none";
    previewContainer.style.display = "flex";
    recorderVideo.load();
    //envíamos el gif creado a la siguiente sección para que sea posible verlo
    urlBlobPrevie = URL.createObjectURL(blob);
    preview.setAttribute('src',urlBlobPrevie);
    repetirCaptura.style.display = "flex";
    time.style.display = "none";
};

//cronometro
function getDuration() {
    let seconds = 0;
    let minutes = 0;
    let timer = setInterval(() => {
      if (recording) {
        if (seconds < 60) {
          if (seconds <= 9) {
            seconds = "0" + seconds;
          }
          time.style.display = "block";
          time.innerHTML = `00:00:0${minutes}:${seconds}`;
          seconds++;
        } else {
          minutes++;
          seconds = 0;
        }
      } else {
        clearInterval(timer);
      }
    }, 1000);
}


//cambio de preview con subir guifo a uploading guifo
subirGif.addEventListener('click', async ()=>{
  //preview.style.display = "none";
  uploading.style.display = "flex";
  try{
      let urlPost = `https://upload.giphy.com/v1/gifs?api_key=${api_key}&username=Marbal21`;
      //en el método post, en el body, agrego el form
      let responsePost = await fetch(urlPost, {
          method: 'POST',
          body: form
      });
      let dataPost = await responsePost.json();
      //asigno la id del gif enviado a una variable
      dataPostId = dataPost.data.id;
      console.log(dataPostId);

      //envío el id a la función que llena la galería
      guardarMiGifo(dataPostId);
      //asigno el gif al mini preview
      //previewMiniGif.setAttribute('src',urlBlobPreview);

      //desaparezco uploading y aparezco success
      uploading.childNodes[3].removeAttribute('innerHTML');
      uploading.childNodes[3].setAttribute('innerHTML', 'GIFO subido con éxito');
      uploading.childNodes[1].removeAttribute('src');
      uploading.childNodes[1].setAttribute('src', 'Sources\\assets\\check.svg');
      links.style.display='flex';

  }catch(fail){
      streaming = false;
      throw new Error(fail);
  };
});


function guardarMiGifo(id) {
  if (misGifos.length != 0 || misGifos.length == 0) {
   misGifos.push(id);            
  }

  localSaveFavorite(misGifos);
}

//Guardado de los favoritos al localStorage
function localSaveFavorite(list) {
  localStorage.setItem('MisGifos', JSON.stringify(list));   
}

//Descargar guifo
linksEnlaceDownload.addEventListener('click', ()=>{
  invokeSaveAsDialog(blob);
});

//copiar enlace del guifo
linksEnlaceCompartir.addEventListener('click', async ()=>{
  let urlGet = `https://api.giphy.com/v1/gifs/${dataPostId}?api_key=${api_key}`;
  let responseGet = await fetch(urlGet);
  let dataGet = await responseGet.json();

  gifLink = dataGet.data.bitly_url;

  await navigator.clipboard.writeText(gifLink);

  alert(`Este es el link que copiaste :) : ${gifLink}`);
});


// codigo para el cambio de  color diurno nocturno
function cambiarColor() {

  let img = document.querySelector('.logo');
  let comparacion = img.getAttribute('src');
  let videoCam = document.querySelector('.videoCam');
  let rollo =document.querySelector('.rollo');
  document.body.classList.toggle("oscuro");


  color.innerHTML=color.innerHTML=="Modo Nocturno"?"Modo Diurno":"Modo Nocturno";
  color2.innerHTML=color2.innerHTML=="MODO NOCTURNO"?"MODO DIURNO":"MODO NOCTURNO";

  if ( comparacion == "Sources\\assets\\logo-mobile.svg"){
      img.removeAttribute('src');
      img.setAttribute('src','Sources\\assets\\logo-mobile-modo-noct.svg');
      videoCam.removeAttribute('src');
      videoCam.setAttribute('src','Sources\\assets\\camara-modo-noc.svg');
      rollo.removeAttribute('src');
      rollo.setAttribute('src','Sources\\assets\\pelicula-modo-noc.svg');

  }
  else {
     img.removeAttribute('src');
     img.setAttribute('src', 'Sources\\assets\\logo-mobile.svg');
     videoCam.removeAttribute('src');
     videoCam.setAttribute('src','Sources\\assets\\camara.svg');
     rollo.removeAttribute('src');
     rollo.setAttribute('src','Sources\\assets\\pelicula.svg');
    
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
  let videoCam = document.querySelector('.videoCam');
  let rollo =document.querySelector('.rollo');
  
  if ( comparacion == "Sources\\assets\\logo-mobile.svg" ){
      img.removeAttribute('src');
      img.setAttribute('src','Sources\\assets\\logo-mobile-modo-noct.svg');
      videoCam.removeAttribute('src');
      videoCam.setAttribute('src','Sources\\assets\\camara-modo-noc.svg');
      rollo.removeAttribute('src');
      rollo.setAttribute('src','Sources\\assets\\pelicula-modo-noc.svg');

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
      videoCam.removeAttribute('src');
      videoCam.setAttribute('src','Sources\\assets\\camara.svg');
      rollo.removeAttribute('src');
      rollo.setAttribute('src','Sources\\assets\\pelicula.svg');
 
  }
}
