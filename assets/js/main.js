const audioPlayBtn = document.getElementById("audioPlaBtn");
const mainAudio = document.getElementById("mainAudio");

 audioPlayBtn.addEventListener('click', () => {
    
    if (mainAudio.paused) {      
      mainAudio.currentTime =0;
      mainAudio.play();
    } else {
      mainAudio.pause();
    }
  });

window.onload = function () { document.body.classList.remove('is-preload'); }
window.ontouchmove = function () { return false; }
window.onorientationchange = function () { document.body.scrollTop = 0; }


