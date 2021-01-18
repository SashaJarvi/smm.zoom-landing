$(function() {
  // examples block slider
  const examplesSlider = $(".examples__slider");

  examplesSlider.slick({
    infinite: false,
    speed: 500,
    fade: true,
    prevArrow:
      `<button class="slider-arrow slider-arrow__prev">
        <svg enable-background="new 0 0 32 32" height="36px" viewBox="0 0 32 32" width="36px">
          <g>
            <path
              d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30   C8.28,30,2,23.72,2,16C2,8.28,8.28,1.969,16,1.969c7.72,0,14,6.311,14,14.031C30,23.72,23.72,30,16,30z"
              fill="#f2fafa"/>
            <path
              d="M13.808,8.271c-0.391-0.394-1.024-0.394-1.414,0c-0.391,0.395-0.391,1.034,0,1.429l6.195,6.285   l-6.196,6.285c-0.391,0.394-0.391,1.034,0,1.429c0.391,0.394,1.024,0.394,1.414,0l6.9-6.999c0.38-0.385,0.381-1.044,0-1.429   L13.808,8.271z"
              fill="#f2fafa"/>
          </g>
        </svg>
       </button>`,
    nextArrow:
      `<button class="slider-arrow slider-arrow__next">
         <svg enable-background="new 0 0 32 32" height="36px" viewBox="0 0 32 32" width="36px">
          <g>
            <path
              d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30   C8.28,30,2,23.72,2,16C2,8.28,8.28,1.969,16,1.969c7.72,0,14,6.311,14,14.031C30,23.72,23.72,30,16,30z"
              fill="#f2fafa"/>
            <path
              d="M13.808,8.271c-0.391-0.394-1.024-0.394-1.414,0c-0.391,0.395-0.391,1.034,0,1.429l6.195,6.285   l-6.196,6.285c-0.391,0.394-0.391,1.034,0,1.429c0.391,0.394,1.024,0.394,1.414,0l6.9-6.999c0.38-0.385,0.381-1.044,0-1.429   L13.808,8.271z"
              fill="#f2fafa"/>
          </g>
         </svg>
       </button>`
  });

  // visual block slider
  const visualSlider = $('.visual__slider');

  visualSlider.slick({
    speed: 500,
    fade: true,
    prevArrow:
      `<button class="slider-arrow slider-arrow__prev">
        <svg enable-background="new 0 0 32 32" height="36px" viewBox="0 0 32 32" width="36px">
          <g>
            <path
              d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30   C8.28,30,2,23.72,2,16C2,8.28,8.28,1.969,16,1.969c7.72,0,14,6.311,14,14.031C30,23.72,23.72,30,16,30z"
              fill="#f2fafa"/>
            <path
              d="M13.808,8.271c-0.391-0.394-1.024-0.394-1.414,0c-0.391,0.395-0.391,1.034,0,1.429l6.195,6.285   l-6.196,6.285c-0.391,0.394-0.391,1.034,0,1.429c0.391,0.394,1.024,0.394,1.414,0l6.9-6.999c0.38-0.385,0.381-1.044,0-1.429   L13.808,8.271z"
              fill="#f2fafa"/>
          </g>
        </svg>
       </button>`,
    nextArrow:
      `<button class="slider-arrow slider-arrow__next">
         <svg enable-background="new 0 0 32 32" height="36px" viewBox="0 0 32 32" width="36px">
          <g>
            <path
              d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30   C8.28,30,2,23.72,2,16C2,8.28,8.28,1.969,16,1.969c7.72,0,14,6.311,14,14.031C30,23.72,23.72,30,16,30z"
              fill="#f2fafa"/>
            <path
              d="M13.808,8.271c-0.391-0.394-1.024-0.394-1.414,0c-0.391,0.395-0.391,1.034,0,1.429l6.195,6.285   l-6.196,6.285c-0.391,0.394-0.391,1.034,0,1.429c0.391,0.394,1.024,0.394,1.414,0l6.9-6.999c0.38-0.385,0.381-1.044,0-1.429   L13.808,8.271z"
              fill="#f2fafa"/>
          </g>
         </svg>
       </button>`
  })
});

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
