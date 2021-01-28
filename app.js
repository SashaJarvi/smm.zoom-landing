// hide header on scroll down and show on scroll up
(function () {
  const doc = document.documentElement,
    headerElement = document.querySelector('.header'),
    headerElementHeight = parseInt(getComputedStyle(headerElement).height);

  let currentScroll = null,
    prevScroll = window.scrollY || doc.scrollTop,
    direction = 0,
    prevDirection = 0;

  const checkRoll = () => {
    currentScroll = window.scrollY || doc.scrollTop;

    if (currentScroll > prevScroll) {
      direction = 2;
    } else if (currentScroll < prevScroll) {
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, currentScroll);
    }

    prevScroll = currentScroll;
  }

  const toggleHeader = (direction, currentScroll) => {
    if (direction === 2 && currentScroll > headerElementHeight) {
      headerElement.classList.add('hide');
      prevDirection = direction;
    } else if (direction === 1) {
      headerElement.classList.remove('hide');
      prevDirection = direction
    }
  };

  window.addEventListener('scroll', checkRoll)
}());


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

const statsSlider = new Swiper('.stats__slider.swiper-container', {
  loop: true,
  slidesPerView: 1,
  breakpoints: {
    1080: {
      slidesPerView: 3
    },
    849: {
      slidesPerView: 2
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})

// form validation and sending
const constraints = {
  name: {
    presence: {
      message: '^Пожалуйста, укажите имя'
    }
  },
  phone: {
    presence: {
      message: '^Пожалуйста, укажите телефон'
    },
    format: {
      pattern: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      flags: 'i',
      message: '^Пожалуйста, укажите телефон в корректном формате'
    }
  },
  email: {
    presence: {
      message: '^Пожалуйста, укажите email'
    },
    email: true
  },
  service: {
    presence: {
      message: '^Пожалуйста, выберите услугу'
    },
  },
  agree: {
    presence: {
      message: '^Пожалуйста, отметьте этот пункт'
    },
  }
};

const knowMoreForm = document.forms['know-more-form'];

knowMoreForm.addEventListener('submit', function(e) {
  e.preventDefault();
  submitHandler(this);
})

const submitHandler = (form) => {
  const values = validate.collectFormValues(form),
    errors = validate(values, constraints);

  showErrors(form, errors || {});

  if (!errors) {
    submitForm(form);
  }
}

const showErrors = (form, errors) => {
  const elements = [...form.elements];
  elements.pop();

  const errorElements = Object.keys(errors),
    errorValues = Object.values(errors).flat().reverse();

  elements.forEach(element => {
    if (errorElements.includes(element.name)) {
      element.classList.add('has-error');
    } else if (!errorElements.includes(element.name)) {
      element.classList.remove('has-error');
    }
  })

  errorValues.forEach(errorVal => {
    Toastify({
      text: errorVal,
      duration: 3500,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#bd0000'
    }).showToast()
  })
}

const submitForm = (form) => {
  const nameField = form.elements.name,
    phoneField = form.elements.phone,
    emailField = form.elements.email,
    serviceField = form.elements.service,
    agreeField = form.elements.agree,
    submitButton = form.elements.submit;

  submitButton.blur();
  submitButton.disabled = true;

  const formData = new FormData();
  formData.append('name', nameField.value);
  formData.append('phone', phoneField.value);
  formData.append('email', emailField.value);
  formData.append('service', serviceField.value);
  formData.append('agree', agreeField.checked);

  axios({
    method: 'post',
    url: '/mail.php',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      submitButton.disabled = false;
      form.reset();

      if (response.data.success) {
        Toastify({
          text: response.data.success,
          duration: 3500,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#86aca4'
        }).showToast()
      } else {
        const errors = Object.values(response.data.errors).reverse();

        for (const error of errors) {
          Toastify({
            text: error,
            duration: 3500,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: '#bd0000'
          }).showToast()
        }
      }
    })
    .catch(error => {
      console.error(error)
    });
}
