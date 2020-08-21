// Toggle menu

var headerNavigation = document.querySelector('.header__navigation');
var headerToggle = document.querySelector('.header__toggle');

headerNavigation.classList.remove('header__navigation--nojs');

headerToggle.addEventListener('click', function() {
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

var sliderToggle = document.querySelector('.example__toggle');
var sliderImages = document.querySelector('.example__images');
var sliderImgBefore = document.querySelector('.example__img-wrapper--before');
var sliderImgAfter = document.querySelector('.example__img-wrapper--after');

var w = sliderImages.offsetWidth;

sliderImgBefore.style.width = w / 2 + 'px';
sliderImgAfter.style.width = w - sliderImgBefore.offsetWidth + 'px';

function initComparisons() {
	sliderToggle.addEventListener('mousedown', function(e) {
		let x = e.offsetX;
		console.log(x);
	});
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

window.onload = function() {
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
	programForm.addEventListener('submit', function(event) {
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

function init() {
	const viewport = document.documentElement.clientWidth || window.innerWidth;
	var mapCenter = viewport < tabletWidth ? [ 59.938635, 30.323118 ] : [ 59.939163, 30.318069 ];
	var imageHref = viewport < tabletWidth ? 'img/map-small-pin.svg' : 'img/map-lg-pin.svg';
	var imageSize = viewport < tabletWidth ? [ 57, 53 ] : [ 113, 106 ];
	var imageOffset = viewport < tabletWidth ? [ -28.5, -53 ] : [ -56.5, -106 ];

	var myMap = new ymaps.Map('map', {
		center: mapCenter,
		zoom: 16
	});

	var myPlacemark = new ymaps.Placemark(
		[ 59.938635, 30.323118 ],
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
