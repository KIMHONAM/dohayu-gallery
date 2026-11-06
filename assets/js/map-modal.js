/* =========================
     MODAL
  ========================= */

const mapOpenButton = document.getElementById("mapOpenButton");
const mapCloseButton = document.getElementById("mapCloseButton");

const mapBackdrop = document.getElementById("mapBackdrop");
const mapModal = document.getElementById("mapModal");
const mapContainer = document.getElementById("mapContainer");
const mapFrame = document.getElementById("mapFrame");

let mapLoaded = false;

// 모달 열기

mapOpenButton.addEventListener("click", () => {
  mapModal.classList.add("open");
  mapBackdrop.classList.add("open");

  // 최초 실행 시 iframe 로딩
  if (!mapLoaded) {
    mapFrame.src = "/map/map.html";

    mapLoaded = true;
  }
});

// 모달 닫기
function closeMapModal() {
  mapModal.classList.remove("open");
  mapBackdrop.classList.remove("open");
}

mapCloseButton.addEventListener("click", closeMapModal);
mapBackdrop.addEventListener("click", closeMapModal);

function openMap() {
  mapModal.classList.add("open");

  mapBackdrop.classList.add("open");

  setTimeout(() => {
    map.resize();
  }, 350);
}

function closeMap() {
  mapModal.classList.remove("open");

  mapBackdrop.classList.remove("open");
}


//document.getElementById("mapOpenButton").onclick = openMap;

//document.getElementById("mapCloseButton").onclick = closeMap;


