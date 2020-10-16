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
let cajaSup = document.querySelector('.cajas_superiores');
let cajaInf = document.querySelector('.cajas_inferiores');
let number1 = document.querySelector('.numeros_creacion > .one');
let number2 = document.querySelector('.numeros_creacion > .two');
let number3 = document.querySelector('.numeros_creacion > .three');

let streaming = false;

let stream;
let recorder;
let blob;
let form;
let urlBlobPreview;
let dataPostId;
let gifLink;


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
    number1.classList.add('circle');
    number1.classList.remove('circle_fun');
    number2.classList.remove('circle');
    number2.classList.add('circle_fun');
    
    const videoContain = {
              video: true,
              audio: false
          };
          navigator.mediaDevices.getUserMedia(videoContain)

          .then(stream => {
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
    stopRecording();
  });



const preview = document.querySelector(".gif_preview");
const previewContainer = document.querySelector(".gif_preview_container");

function stopRecording() {
    recorderVideo.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    recorder.stopRecording(function () {
      recording = false;
      // Se oculta video y muestra el preview del gif
      cajaVideo.style.display = "none";
      previewContainer.style.display = "flex";
      preview.src = URL.createObjectURL(recorder.getBlob());
      console.log(URL.createObjectURL(recorder.getBlob()));
    });

}

const time = document.querySelector(".time");
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
          //time.style.display = "block";
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

// async function getStreamAndRecord(constraints){
//     stream = null;
//     try{
//         streaming = true;
//         stream = await navigator.mediaDevices.getUserMedia(constraints);
//         cajaVideo.style.display = 'block';
//         cajaInformacion.style.display = 'none';
//         recorderVideo.srcObject = stream;

//         recorder = RecordRTC(stream, {
//             type: 'gif',
//             recorderType: GifRecorder,
//             frameRate: 1,
//             quality: 10,
//             width: 360,
//             hidden: 240,
//         //     onGifRecordingStarted: ()=>{ 
//         //         recorderVideo.play();
//         //         captureButton.innerHTML = "Stop";
//         //     }
//         });
//         // recorder.startRecording()
//     }catch(err){
//         streaming = false;
//         throw new Error(err);
//     };
// };
