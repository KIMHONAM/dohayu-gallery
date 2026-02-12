1. 연도별 눌렀을 때 sorting
2. 레이지 로딩 각 버튼 눌렀을 때 보류



const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      obs.unobserve(img);
    }
  });
}, {
  rootMargin: "200px" // 화면 200px 전에 미리 로드
});

images.forEach(img => observer.observe(img));
