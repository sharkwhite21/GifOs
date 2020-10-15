let comenzarGrabar = document.querySelector('.parte_baja > .comenzar');
let grabar = document.querySelector('.parte_baja > .grabar');
let detener = document.querySelector('.parte_baja > .detener');
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



function getStream() {
    const videoContain = {
              video: {height: {max : 480}},
              audio: false
          };
    navigator.mediaDevices.getUserMedia(videoContain)
      .then(stream => {
            number1.classList.add('circle');
            number1.classList.remove('circle_fun');
            number2.classList.remove('circle');
            number2.classList.add('circle_fun');

            recorderVideo.srcObject = stream;
            grabar.style.display = 'flex';
            //grabar.addEventListener('click', startRecording ,false);
            recorderVideo.play()
          })
      .catch(error => {
          console.error(error);
      });
  }




  //startRecording();
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
