/* JavaScript Document

Dohayu Gallery

*/

// Mobile Menu Toggle
const topBtn = document.getElementById('topBtn');
const navLinks = document.getElementById('navLinks');
const navBox = document.getElementById("nav-container");

window.addEventListener("scroll", () => {
   if (window.scrollY > 200) {   // 200px 이상 내려가면
      topBtn.style.display = "block";
   } else {
      topBtn.style.display = "none";
   }
});

function goTop() {
   // document.getElementById("home").scrollHeight({
   //    behavior: "smooth"
   // })
   window.scrollTo({
      top: navBox.offsetHeight,
      behavior: "smooth"
   });
}


// Scroll spy for active menu states
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
   let currentSection = '';

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
         currentSection = section.getAttribute('id');
      }
   });

}

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // Set initial active state

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
   btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
         if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            // Re-trigger animation
            item.style.animation = 'none';
            setTimeout(() => {
               item.style.animation = 'fadeInUp 0.6s ease forwards';
            }, 10);
         } else {
            item.style.display = 'none';
         }
      });
   });
});

// doha doyu audio play
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

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

let currentImageIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
   visibleImages = Array.from(galleryItems).filter(item =>
      item.style.display !== 'none'
   );
}

galleryItems.forEach((item, index) => {
   item.addEventListener('click', () => {
      updateVisibleImages();
      currentImageIndex = visibleImages.indexOf(item);
      openLightbox(item);
   });
});

function openLightbox(item) {
   const img = item.querySelector('img');
   const title = item.querySelector('.gallery-title');
   const category = item.querySelector('.gallery-category');

   lightboxImage.src = img.src;
   lightboxImage.alt = img.alt;
   lightboxTitle.textContent = title.textContent;
   lightboxCategory.textContent = category.textContent;

   lightbox.classList.add('active');
   document.body.style.overflow = 'hidden';
}

closeLightbox.addEventListener('click', () => {
   lightbox.classList.remove('active');
   document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
   if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
   }
});

prevImage.addEventListener('click', () => {
   currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
   openLightbox(visibleImages[currentImageIndex]);
});

nextImage.addEventListener('click', () => {
   currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
   openLightbox(visibleImages[currentImageIndex]);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
   if (!lightbox.classList.contains('active')) return;

   if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
   } else if (e.key === 'ArrowLeft') {
      prevImage.click();
   } else if (e.key === 'ArrowRight') {
      nextImage.click();
   }
});

// Initialize visible images
updateVisibleImages();
