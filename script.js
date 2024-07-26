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
const intervalTime = 3000;

// оновлюю слайдер і індикатори
function updateSlider() {
  if (counter < 0) {
    counter = images.length - 1;
  } else if (counter >= images.length) {
    counter = 0;
  }
  slider.style.transform = `translateX(${-step * counter}px)`;
  updateIndicators();
}
updateSlider();

//привязка індикаторів
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === counter);
    indicator.addEventListener("click", () => goToSlide(index));
  });
}

//  наступний слайд
function showNextSlide() {
  counter++;
  updateSlider();
  updateIndicators();
  // console.log(slider);
}
nextSlide.addEventListener("click", showNextSlide);

// попередній слайд
function showPrevSlide() {
  counter--;
  updateSlider();
  updateIndicators();
  // console.log(slider);
}
prevSlide.addEventListener("click", showPrevSlide);

// перехід до конкретного слайду через індикатор
function goToSlide(index) {
  counter = index;
  updateSlider();
}

//старт
function startSlide() {
  if (!slideInterval) {
    slideInterval = setInterval(showNextSlide, intervalTime);
  }
}
playButton.addEventListener("click", startSlide);
startSlide();

//пауза
function pauseSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
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
let startPosition = 0;
const positionTouch = (endPosition) => {
  if (endPosition < startPosition) {
    showNextSlide();
  } else if (endPosition > startPosition) {
    showPrevSlide();
  }
};

slider.addEventListener("touchstart", (event) => {
  startPosition = event.touches[0].clientX;
  // console.log(event);
});

slider.addEventListener("touchend", (event) => {
  positionTouch(event.changedTouches[0].clientX);
});

//миша
slider.addEventListener("mousedown", (event) => {
  startPosition = event.clientX;
  // console.log(event);
});

slider.addEventListener("mouseup", (event) => {
  positionTouch(event.clientX);
});




