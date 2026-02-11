/* JavaScript Document

Dohayu Gallery

*/

// Mobile Menu Toggle
const topBtn = document.getElementById("topBtn");
const navLinks = document.getElementById("navLinks");
const navBox = document.getElementById("nav-container");
const currentYear = new Date().getFullYear();
const params = new URLSearchParams(window.location.search);
const who = params.get("who");
const isDoha = who === "doha" ? true : false;
const comment = isDoha ? "사랑이 자라던 시간" : "너로 인해 따뜻해진 날들";
const titleContent = isDoha ? "도하의 기억" : "도유의 기억";

const jsonFilePath = "/assets/json/photo_arg.json";

function isDohaMethod() {
  return who === "doha" ? true : false;
}
// set photo data from json file
fetch(jsonFilePath)
  .then((res) => res.json())
  .then((data) => {
    // top 배너 부분 처리
    const topBanner = document.getElementById("topBannerId");
    const spanSection = topBanner.getElementsByTagName("span")[0];
    spanSection.textContent = titleContent;

    const pSection = topBanner.getElementsByTagName("p")[0];
    pSection.textContent = comment;

    // top 배너 백그라운드 이미지 처리
    const home = document.getElementById("home");
    const topDiv = document.createElement("div");
    topDiv.className = isDohaMethod() ? "hero-dh-bg" : "hero-dy-bg";
    home.prepend(topDiv);
    home.prepend(topDiv.cloneNode(true));
    home.prepend(topDiv.cloneNode(true));

    // 오디오 처리
    const audioTag = document.getElementById("mainAudio");
    audioTag.src = isDohaMethod()
      ? "./assets/audio/Is it still beautiful.mp3"
      : "./assets/audio/the_wind_is_blowing.mp3";

    let dohaBirth = data.dohaBirth;
    let doyuBirth = data.doyuBirth;
    let photoPath = data.photoPath;

    let isDoha = who === "doha" ? true : false;

    let sonBirthDiff = isDoha
      ? currentYear - dohaBirth
      : currentYear - doyuBirth;
    let sonBirth = isDoha ? Number(dohaBirth) : Number(doyuBirth);

    let targetBtn = document.getElementById("yearBtn");
    let imgDivTagArray = [];
    let targetContentDiv = document.getElementById("galleryGrid");
    let contentArr = [];

    for (let i = 0; i <= sonBirthDiff; i++) {
      // create year button section
      let yearBtn = document.createElement("button");
      let nowYear = sonBirth + i;
      yearBtn.dataset.filter = nowYear;
      yearBtn.className = "filter-btn";
      yearBtn.id = nowYear + "Btn";
      yearBtn.textContent = nowYear;
      targetBtn.after(yearBtn);
      targetBtn = yearBtn;
    }

    // json에 담긴 사진 년/파일명 만큼  div 태그 구역 생성
    for (const item of isDoha ? data.dohaPhotoArg : data.doyuPhotoArg) {
      for (const fileName of item.photos) {
        let contentDiv = document.createElement("div");
        contentDiv.className = "gallery-item";
        contentDiv.dataset.category = item.year + "";

        let imgTag = document.createElement("img");
        imgTag.src = photoPath + item.year + "/" + fileName;
        imgTag.loading = "lazy";

        let overLayDiv = document.createElement("div");
        overLayDiv.className = "gallery-overlay";

        let overlayH3Tag = document.createElement("h3");
        overlayH3Tag.className = "gallery-title";

        let overlayPTag = document.createElement("p");
        overlayPTag.className = "gallery-category";

        // 사진 속성 일기
        readExifFromImg(imgTag.src, overlayH3Tag, overlayPTag, imgTag);

        overLayDiv.appendChild(overlayH3Tag);
        overLayDiv.appendChild(overlayPTag);

        contentDiv.appendChild(imgTag);
        contentDiv.appendChild(overLayDiv);

        contentArr.push(contentDiv);
      }
    }

    let shuffled = shuffleArray(contentArr);
    let cur = 0;
    let lazyCnt = 0;
    
    for (const shuffledItem of shuffled) {
      // 6번째까지만 초기 로딩 이후 lazy loading
      const lazyCntLimit = 6;
      const imgTagInShuffled = shuffledItem.getElementsByTagName("img")[0];
      
      if(lazyCnt++ < lazyCntLimit){
         imgTagInShuffled.removeAttribute("loading");
      }

      if (cur % 6 === 0) { // 6번째마다 긴 사진
        shuffledItem.className = shuffledItem.className + " tall";
      }
      targetContentDiv.appendChild(shuffledItem);
      cur++;
    } // end suffle

    let galleryItems = document.querySelectorAll(".gallery-item");
    let filterBtns = document.querySelectorAll(".filter-btn");  

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            // Re-trigger animation
            item.style.animation = "none";
            setTimeout(() => {
              item.style.animation = "fadeInUp 0.6s ease forwards";
            }, 10);
          } else {
            item.style.display = "none";
          }
        });
      });
    }); // end of filterBtn forEach

    // Lightbox Functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxCategory = document.getElementById("lightboxCategory");
    const closeLightbox = document.getElementById("closeLightbox");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");

    let currentImageIndex = 0;
    let visibleImages = [];

    function updateVisibleImages() {
      visibleImages = Array.from(galleryItems).filter(
        (item) => item.style.display !== "none",
      );
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        updateVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        openLightbox(item);
      });
    });

    function openLightbox(item) {
      
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-title");
      const category = item.querySelector(".gallery-category");

      const galleryItems = document.querySelectorAll(".gallery-item");

      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxTitle.textContent = title.textContent;
      lightboxCategory.textContent = category.textContent;

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    closeLightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    prevImage.addEventListener("click", () => {
      
      currentImageIndex =
        (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
      
      openLightbox(visibleImages[currentImageIndex]);
    });

    nextImage.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % visibleImages.length;

      openLightbox(visibleImages[currentImageIndex]);
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;

      if (e.key === "Escape") {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
      } else if (e.key === "ArrowLeft") {
        prevImage.click();
      } else if (e.key === "ArrowRight") {
        nextImage.click();
      }
    });

    // Initialize visible images
    updateVisibleImages();
  }); // 끝 이미지

// 이미지
async function readExifFromImg(img_src, overlayH3Tag, overlayPTag, imgTag) {
  const res = await fetch(img_src);
  const blob = await res.blob();

  const exif = await exifr.parse(blob);

  const textResult = decodeURIComponent(JSON.stringify(exif, null, 2));
  let alt = "";
  let categoryComment = "";

  if (isJsonStr(textResult)) {
    const jsonObj = JSON.parse(textResult);
    alt = jsonObj.Artist;
    categoryComment = jsonObj.ImageDescription;
  }
  overlayH3Tag.textContent = alt;
  overlayPTag.textContent = categoryComment;
  imgTag.alt = alt;
}

function shuffleArray(arr) {
  const array = [...arr]; // 원본 보호
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isJsonStr(encoded) {
  try {
    JSON.parse(decodeURIComponent(encoded));
    return true;
  } catch (e) {
    return false;
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    // 200px 이상 내려가면
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

function goTop() {
  window.scrollTo({
    top: navBox.offsetHeight,
    behavior: "smooth",
  });
}

// Scroll spy for active menu states
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink(); // Set initial active state

// Filter Functionality

// doha doyu audio play
const audioPlayBtn = document.getElementById("audioPlaBtn");
const mainAudio = document.getElementById("mainAudio");

audioPlayBtn.addEventListener("click", () => {
  if (mainAudio.paused) {
    mainAudio.currentTime = 0;
    mainAudio.play();
  } else {
    mainAudio.pause();
  }
});
