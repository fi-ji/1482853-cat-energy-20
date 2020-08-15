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

// Map

const viewport = document.documentElement.clientWidth || window.innerWidth;
var tabletWidth = 768;

// как сделать так чтоб условие обновлялось при изменении ширины вьюпорта

ymaps.ready(init);

var myMap;
var myPlacemark;

function init() {
  var mapCenter = viewport < tabletWidth ? [59.938635, 30.323118] : [59.939163, 30.318069];
  var imageHref = viewport < tabletWidth ? 'img/map-small-pin.svg' : 'img/map-lg-pin.svg';
  var imageSize = viewport < tabletWidth ? [57, 53] : [113, 106];
  var imageOffset = viewport < tabletWidth ? [-28.5, -53] : [-56.5, -106];

  myMap = new ymaps.Map('map', {
    center: mapCenter,
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
      iconImageHref: imageHref,
      iconImageSize: imageSize,
      iconImageOffset: imageOffset
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
}

