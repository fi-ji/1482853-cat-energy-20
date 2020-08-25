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
var example = document.querySelector('.example');
var sliderImgBefore = document.querySelector('.example__img-wrapper--before');
var sliderImgAfter = document.querySelector('.example__img-wrapper--after');
var sliderScale = document.querySelector('.example__scale');
var sliderBar = document.querySelector('.example__bar');
var sliderToggle = document.querySelector('.example__toggle');
var btnBefore = document.querySelector('.example__slider-button--before');
var btnAfter = document.querySelector('.example__slider-button--after');
var toggleWidth, scaleWidth, sliderWidth;

if (pageIndex) {

  function getElemWidth(elem) {
    return parseInt(getComputedStyle(elem).width, 10);
  }

  var getElemCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return box.left + pageXOffset;
  };

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

  function toggleDownHandler(evtDown) {
    var toggleCoords = getElemCoords(sliderToggle);
    var scaleCoords = getElemCoords(sliderScale);
    sliderToggle.style.transition = 'none';

    var shiftX = evtDown.pageX - toggleCoords;

    document.onmousemove = function (evtMove) {
      var newLeft = evtMove.pageX - shiftX - scaleCoords;

      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = scaleWidth - toggleWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      var toggleValue = newLeft / rightEdge * 100;
      sliderToggle.style.left = newLeft + 'px';

      sliderImgBefore.style.width = 100 - toggleValue + '%';
      sliderImgAfter.style.width = toggleValue + '%';
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
      sliderToggle.style.transition = 'left 0.2s ease-out';
    };

    return false;
  }

  function addToggleHandlers() {
    sliderToggle.addEventListener('mousedown', toggleDownHandler);
  }

  function removeGripHandlers() {
    sliderToggle.removeEventListener('mousedown', toggleDownHandler);
  }

  var initialize = function () {
    viewport = document.documentElement.clientWidth || window.innerWidth;

    if (viewport >= tabletWidth) {
      addToggleHandlers();
    } else {
      removeToggleHandlers();
    }

    sliderWidth = getElemWidth(example);
    scaleWidth = getElemWidth(sliderScale);
    toggleWidth = getElemWidth(sliderToggle);

    sliderImgBefore.style.width = '';
    sliderImgAfter.style.width = '';
    sliderToggle.style.left = '';
  };

  window.addEventListener('load', initialize);
  window.addEventListener('resize', initialize);
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

ymaps.ready(init);

var viewport = document.documentElement.clientWidth || window.innerWidth;
var mapCenter;
var imageHref;
var imageSize;
var imageOffset;

function init() {
  mapCenter = viewport < desktopWidth ? [59.938635, 30.323118] : [59.939163, 30.318069];
  imageHref = viewport < tabletWidth ? 'img/map-small-pin.svg' : 'img/map-lg-pin.svg';
  imageSize = viewport < tabletWidth ? [57, 53] : [113, 106];
  imageOffset = viewport < tabletWidth ? [-28.5, -53] : [-56.5, -106];

  var myMap = new ymaps.Map('map', {
    center: mapCenter,
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark(
    [59.938635, 30.323118],
    {
      hintContent: 'Мы здесь!',
      balloonContentHeader: '<img src="img/logo-footer.svg" width="101" height="20" alt= "Cat Energy"'
    },
    {
      iconLayout: 'default#image',
      iconImageHref: imageHref,
      iconImageSize: imageSize,
      iconImageOffset: imageOffset
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
}
