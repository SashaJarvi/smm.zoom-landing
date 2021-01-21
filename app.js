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
const width = 962,
  whyItems = document.querySelectorAll('.why-item'),
  rightClass = 'why-item--right'

for (const item of whyItems) {
  if (item.classList.contains(rightClass) && screen.width <= width) {
    item.classList.remove(rightClass);
  }
}

// sliders

// const examplesSwiper = new Swiper('.swiper-container', {
//
// })
