// Toggle menu

var headerNavigation = document.querySelector('.header__navigation');
var headerToggle = document.querySelector('.header__toggle');

headerNavigation.classList.remove('header__navigation--nojs');

headerToggle.addEventListener('click', function () {
  if (headerNavigation.classList.contains('header__navigation--closed')) {
    headerNavigation.classList.remove('header__navigation--closed');
    headerNavigation.classList.add('header__navigation--opened');
  } else {
    headerNavigation.classList.add('header__navigation--closed');
    headerNavigation.classList.remove('header__navigation--opened');
  }
});

// Слайдер

var tabletWidth = 768;
var desktopWidth = 1300;

var pageIndex = document.querySelector('#page-index');
var sliderImgBefore = document.querySelector('.example__img-wrapper--before');
var sliderImgAfter = document.querySelector('.example__img-wrapper--after');
var sliderBar = document.querySelector('.example__bar');
var sliderToggle = document.querySelector('.example__toggle');
var btnBefore = document.querySelector('.example__slider-button--before');
var btnAfter = document.querySelector('.example__slider-button--after');

if (pageIndex) {
  function getElemWidth(elem) {
    return parseInt(getComputedStyle(elem).width, 10);
  }

  var toggleWidth = getElemWidth(sliderToggle);

  btnBefore.addEventListener('click', function (e) {
    e.preventDefault();
    sliderImgBefore.style.width = '100%';
    sliderImgAfter.style.width = '0';
    sliderToggle.style.left = '0';
    sliderBar.style.marginLeft = '0';
    sliderBar.style.transition = 'margin-left 2.5s ease-in-out';
    sliderImgBefore.style.transition = 'width 2s ease-in-out';

    if (viewport >= tabletWidth) {
      sliderToggle.style.transition = 'left 3s ease-in-out';
      sliderImgBefore.style.transition = 'width 3s ease-in-out';
    }
  });

  btnAfter.addEventListener('click', function (e) {
    e.preventDefault();
    sliderImgBefore.style.width = '0';
    sliderImgAfter.style.width = '100%';
    sliderToggle.style.left = 'calc(100% - ' + toggleWidth + 'px)';
    sliderBar.style.marginLeft = '50%';
    sliderBar.style.transition = 'margin-left 2.5s ease-in-out';
    sliderImgAfter.style.transition = 'width 2s ease-in-out';

    if (viewport >= tabletWidth) {
      sliderToggle.style.transition = 'left 3s ease-in-out';
      sliderImgAfter.style.transition = 'width 3s ease-in-out';
    }
  });

  sliderToggle.ondblclick = function () {
    sliderImgBefore.style.width = '50%';
    sliderImgAfter.style.width = '50%';
    sliderToggle.style.left = 'calc(50% - 15' + 'px)';
  };
}

// Валидация формы

var pageForm = document.querySelector('#page-form');
var programCatName = document.querySelector('#cat-name-field');
var programWeight = document.querySelector('#weight-field');
var programAge = document.querySelector('#age-field');
var programOwnerEmail = document.querySelector('#owner-email-field');
var programOwnerTel = document.querySelector('#owner-tel-field');
var programForm = document.querySelector('.program__form');
var programSubmit = document.querySelector('.program__submit');

var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = 'false';
}

window.onload = function () {
  if (pageForm) {
    if (storage) {
      programCatName.value = storage;
      programWeight.value = localStorage.getItem('weight');
      programOwnerEmail.value = localStorage.getItem('email');
      programOwnerTel.value = localStorage.getItem('tel');
      programAge.focus();
    } else {
      programCatName.focus();
    }
  }
};

if (pageForm) {
  programForm.addEventListener('submit', function (event) {
    if (!programCatName.value || !programWeight.value || !programOwnerEmail.value || !programOwnerTel.value) {
      event.preventDefault();
    } else {
      localStorage.setItem('name', programCatName.value);
      localStorage.setItem('weight', programWeight.value);
      localStorage.setItem('email', programOwnerEmail.value);
      localStorage.setItem('tel', programOwnerTel.value);
    }
  });
}

// Map

var myMap;
var myPlacemark;

/*функция для того, чтобы при изменении размера вьюпорта карта менялась не множество раз, а один раз при окончательном изменении ширины окна*/
function debounce(f, ms) {
  var timer = null;

  return function (cb) {
    var onComplete = function () {
      f.apply(this, cb);
      timer = null;
    };
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(onComplete, ms);
  };
}

function setProps() {
  viewport = document.documentElement.clientWidth || window.innerWidth;

  if (viewport >= tabletWidth) {
    myPlacemark.options.set('iconImageHref', 'img/map-lg-pin.svg');
    myPlacemark.options.set('iconImageSize', [113, 106]);
    myPlacemark.options.set('iconImageOffset', [-56.5, -106]);
  } else {
    myPlacemark.options.set('iconImageHref', 'img/map-small-pin.svg');
    myPlacemark.options.set('iconImageSize', [57, 53]);
    myPlacemark.options.set('iconImageOffset', [-28.5, -53]);
  }

  if (viewport >= desktopWidth) {
    myMap.setCenter([59.939163, 30.318069]);
  } else {
    myMap.setCenter([59.938635, 30.323118]);
  }
}

ymaps.ready(init);

function init() {
  myMap = new ymaps.Map('map', {
    center: [59.938635, 30.323118],
    zoom: 16
  });

  myPlacemark = new ymaps.Placemark(
    [59.938635, 30.323118],
    {
      hintContent: 'Мы здесь!',
      balloonContentHeader: '<img src="img/logo-footer.svg" width="101" height="20" alt= "Cat Energy"'
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-small-pin.svg',
      iconImageSize: [57, 53],
      iconImageOffset: [-28.5, -53]
    }
  );

  setProps();

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
}

window.addEventListener('resize', debounce(setProps, 1000));
