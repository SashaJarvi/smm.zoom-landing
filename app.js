// smooth scroll to anchors
const anchors = document.querySelectorAll('.header__nav-link');

for (const anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const goTo = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';

    document.querySelector(goTo).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// remove .why-item--right class on 962px screen width
const tabletWidth = 962,
  whyItems = document.querySelectorAll('.why-item'),
  rightClass = 'why-item--right'

for (const item of whyItems) {
  if (item.classList.contains(rightClass) && screen.width <= tabletWidth) {
    item.classList.remove(rightClass);
  }
}

// sliders
const examplesSwiper = new Swiper('.examples__slider.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

const visualSwiper = new Swiper('.visual__slider.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
