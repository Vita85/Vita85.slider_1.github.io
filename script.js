const slider = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-img");
const prevSlide = document.querySelector(".btn-prev");
const nextSlide = document.querySelector(".btn-next");
const indicators = document.querySelectorAll(".indicator");
const pauseButton = document.querySelector(".pause-slide");
const playButton = document.querySelector(".play-slide");

let counter = 0;
const step = images[0].clientWidth;

let slideInterval = null;
let isPause = true;
const intervalTime = 3000;

function updateSlider() {
  if (counter < 0) {
    counter = images.length - 1;
  } else if (counter >= images.length) {
    counter = 0;
  }
  slider.style.transform = `translateX(${-step * counter}px)`;
}

function showNextSlide() {
  counter++;
  updateSlider();
  updateIndicators();
  // console.log(slider);
}
function showPrevSlide() {
  counter--;
  updateSlider();
  updateIndicators();
  // console.log(slider);
}

prevSlide.addEventListener("click", showPrevSlide);
nextSlide.addEventListener("click", showNextSlide);

//привязка індикаторів
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === counter) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
    indicator.addEventListener("click", () => {
      counter = index;
      updateSlider();
      updateIndicators();
    });
  });
}

//старт
function startSlide() {
  if (isPause) {
    slideInterval = setInterval(showNextSlide, intervalTime);
    isPause = false;
  }
}
playButton.addEventListener("click", startSlide);

//пауза
function pauseSlide() {
  if (!isPause) {
    clearInterval(slideInterval);
    isPause = true;
  }
}
pauseButton.addEventListener("click", pauseSlide);

//стрілки
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    showPrevSlide();
  } else if (event.key === "ArrowRight") {
    showNextSlide();
  }
});

//тач
let touchStart = 0;
let touchEnd = 0;

slider.addEventListener("touchstart", (event) => {
  touchStart = event.touches[0].clientX;
  // console.log(event);
});

slider.addEventListener("touchend", () => {
  if (touchEnd < touchStart) {
    showNextSlide();
  } else if (touchEnd > touchStart) {
    showPrevSlide();
  }
});

//миша
let mouseStart = 0;
let mouseEnd = 0;

slider.addEventListener("mousedown", (event) => {
  mouseStart = event.clientX;
  // console.log(event);
});

slider.addEventListener("mouseup", () => {
  if (mouseEnd < mouseStart) {
    showNextSlide();
  } else if (mouseEnd > mouseStart) {
    showPrevSlide();
  }
});
