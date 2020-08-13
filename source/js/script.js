// Map

const width = window.innerWidth;

// как сделать так чтоб условие обновлялось при изменении ширины вьюпорта

ymaps.ready(init);

var myMap;
var mapCenter;

var myPlacemark;
var imageHref;
var imageSize;
var imageOffset;

if (width < 768) {
  mapCenter = [59.938635, 30.323118];
  imageHref = 'img/map-small-pin.svg';
  imageSize = [57, 53];
  imageOffset = [-28.5, -53];
} else {
  mapCenter = [59.939163, 30.318069];
  imageHref = 'img/map-lg-pin.svg';
  imageSize = [113, 106];
  imageOffset = [-56.5, -106];
}

function init() {
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
