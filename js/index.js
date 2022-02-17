'use strict';

const API_KEY = '7640015428acfd7d564fe21448d3ab3e';
const SERVER_URL = 'https://api.themoviedb.org/3/search/movie';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

const POPULAR_URL = 'https://api.themoviedb.org/3/movie/popular';
const TOPRATED_URL = 'https://api.themoviedb.org/3/movie/top_rated';
const UPCOMING_URL = 'https://api.themoviedb.org/3/movie/upcoming';

const POPULAR_SHOWS_URL = 'https://api.themoviedb.org/3/tv/popular';
const TOPRATED_SHOWS_URL = 'https://api.themoviedb.org/3/tv/top_rated';
const SHOWS_ONAIR_URL = 'https://api.themoviedb.org/3/tv/on_the_air';

const TOPRATED_BUTTON = document.querySelector('.toprated-movies');
const UPCOMING_BUTTON = document.querySelector('.upcoming-movies');
const POPULAR_SHOWS_BUTTON = document.querySelector('.popular-shows');
const TOPRATED_SHOWS_BUTTON = document.querySelector('.toprated-shows');
const SHOWS_ONAIR_BUTTON = document.querySelector('.onair-shows');

const INPUT_SEARCH = document.querySelector('.header__search');
const INPUT_SEARCH_ICON = document.querySelector('.header__search-icon');
const MOVIE_APP = document.querySelector('.movie-app');



window.addEventListener('load', () => {
	INPUT_SEARCH.select();
	const popularUrl = `${POPULAR_URL}?api_key=${API_KEY}&language=en-US&page=1`;
	fetch(popularUrl)
		.then(response => response.json())
		.then(renderMovie)
})

const renderMovie = response => {
	for (let i = 0; i < response.results.length; i++) {
		MOVIE_APP.insertAdjacentHTML("beforeend",
			`<div class="movie-app__card">
		<div class="card-front">
			<div class="card-front__poster"><img class="card-front__image" src="https://image.tmdb.org/t/p/original/${response.results[i].poster_path}" alt="movie poster">
			</div>
			<div class="card-front__about">
				<div class="card-front__info">
					<h3 class="card-front__title">${response.results[i].original_title}</h3>
					<div class="card-front__rating">${response.results[i].vote_average}</div>
				</div>
				<div class="card-front__show-overview">Show overview</div>
			</div>
		</div>
		<div class="card-back">
			<div class="card-back__overview">
				<svg class="card-back__close-overview">
					<use xlink:href="img/sprite.svg#close-overview"></use>
				</svg>
				<h3 class="card-back__overview-title">Overview</h3>
				<p class="card-back__text">${response.results[i].overview}</p>
			</div>
		</div>
	</div>`);
	}
	const SHOW_OVERVIEW = document.querySelectorAll('.card-front__show-overview');
	const CLOSE_OVERVIEW = document.querySelectorAll('.card-back__close-overview');
	SHOW_OVERVIEW.forEach(item => item.addEventListener('click', (e) => {
		e.target.parentElement.parentElement.style.transform = "perspective(1000px) rotateY(-180deg)";
		e.target.parentElement.parentElement.nextElementSibling.style.transform = "perspective(1000px) rotateY(0deg)";
	}))
	CLOSE_OVERVIEW.forEach(item => item.addEventListener('click', (e) => {
		e.target.parentElement.parentElement.previousElementSibling.style.transform = "perspective(1000px) rotateY(0deg)";
		e.target.parentElement.parentElement.style.transform = "perspective(1000px) rotateY(180deg)";
	}))
	let rate = document.querySelectorAll('.card-front__rating');
	rate.forEach(item => {
		if (item.textContent < 4.9) {
			item.style.color = "#fc0019";
		} else if (item.textContent > 4.9 && item.textContent < 8) {
			item.style.color = "orange";
		} else if (item.textContent >= 8) {
			item.style.color = "#06a800";
		}
	})
}

const renderTV = response => {
	for (let i = 0; i < response.results.length; i++) {
		MOVIE_APP.insertAdjacentHTML("beforeend",
			`<div class="movie-app__card">
		<div class="card-front">
			<div class="card-front__poster"><img class="card-front__image" src="https://image.tmdb.org/t/p/original/${response.results[i].poster_path}" alt="movie poster">
			</div>
			<div class="card-front__about">
				<div class="card-front__info">
					<h3 class="card-front__title">${response.results[i].original_name}</h3>
					<div class="card-front__rating">${response.results[i].vote_average}</div>
				</div>
				<div class="card-front__show-overview">Show overview</div>
			</div>
		</div>
		<div class="card-back">
			<div class="card-back__overview">
				<svg class="card-back__close-overview">
					<use xlink:href="img/sprite.svg#close-overview"></use>
				</svg>
				<h3 class="card-back__overview-title">Overview</h3>
				<p class="card-back__text">${response.results[i].overview}</p>
			</div>
		</div>
	</div>`);
	}
	const SHOW_OVERVIEW = document.querySelectorAll('.card-front__show-overview');
	const CLOSE_OVERVIEW = document.querySelectorAll('.card-back__close-overview');
	SHOW_OVERVIEW.forEach(item => item.addEventListener('click', (e) => {
		e.target.parentElement.parentElement.style.transform = "perspective(1000px) rotateY(-180deg)";
		e.target.parentElement.parentElement.nextElementSibling.style.transform = "perspective(1000px) rotateY(0deg)";
	}))
	CLOSE_OVERVIEW.forEach(item => item.addEventListener('click', (e) => {
		e.target.parentElement.parentElement.previousElementSibling.style.transform = "perspective(1000px) rotateY(0deg)";
		e.target.parentElement.parentElement.style.transform = "perspective(1000px) rotateY(180deg)";
	}))
	let rate = document.querySelectorAll('.card-front__rating');
	rate.forEach(item => {
		if (item.textContent < 4.9) {
			item.style.color = "#fc0019";
		} else if (item.textContent > 4.9 && item.textContent < 8) {
			item.style.color = "orange";
		} else if (item.textContent >= 8) {
			item.style.color = "#06a800";
		}
	})
}

INPUT_SEARCH.addEventListener('keydown', function (e) {
	if (e.keyCode === 13) getMovie();
})


function getMovie() {
	while (MOVIE_APP.firstElementChild) {
		MOVIE_APP.removeChild(MOVIE_APP.firstElementChild);
	}
	const movieName = INPUT_SEARCH.value;
	const movieUrl = `${SERVER_URL}?api_key=${API_KEY}&query=${movieName}`;
	fetch(movieUrl)
		.then(response => response.json())
		.then(renderMovie)
}


function getUpcomingMovies() {
	while (MOVIE_APP.firstElementChild) {
		MOVIE_APP.removeChild(MOVIE_APP.firstElementChild);
	}
	const upcomingUrl = `${UPCOMING_URL}?api_key=${API_KEY}&language=en-US&page=1`;
	fetch(upcomingUrl)
		.then(response => response.json())
		.then(renderMovie)
	iconMenu.classList.remove('_active');
	headerMenu.classList.remove('_active');
}


function getTopratedMovies() {
	while (MOVIE_APP.firstElementChild) {
		MOVIE_APP.removeChild(MOVIE_APP.firstElementChild);
	}
	const topRatedUrl = `${TOPRATED_URL}?api_key=${API_KEY}&language=en-US&page=1`;
	fetch(topRatedUrl)
		.then(response => response.json())
		.then(renderMovie)
	iconMenu.classList.remove('_active');
	headerMenu.classList.remove('_active');
}


function getPopularTVShows() {
	while (MOVIE_APP.firstElementChild) {
		MOVIE_APP.removeChild(MOVIE_APP.firstElementChild);
	}
	const popularShowsUrl = `${POPULAR_SHOWS_URL}?api_key=${API_KEY}&language=en-US&page=1`;
	fetch(popularShowsUrl)
		.then(response => response.json())
		.then(renderTV)
	iconMenu.classList.remove('_active');
	headerMenu.classList.remove('_active');
}


function getTopratedTVShows() {
	while (MOVIE_APP.firstElementChild) {
		MOVIE_APP.removeChild(MOVIE_APP.firstElementChild);
	}
	const topRatedUrl = `${TOPRATED_SHOWS_URL}?api_key=${API_KEY}&language=en-US&page=1`;
	fetch(topRatedUrl)
		.then(response => response.json())
		.then(renderTV)
	iconMenu.classList.remove('_active');
	headerMenu.classList.remove('_active');
}


function getTVShowsOnAir() {
	while (MOVIE_APP.firstElementChild) {
		MOVIE_APP.removeChild(MOVIE_APP.firstElementChild);
	}
	const showsOnAirUrl = `${SHOWS_ONAIR_URL}?api_key=${API_KEY}&language=en-US&page=1`;
	fetch(showsOnAirUrl)
		.then(response => response.json())
		.then(renderTV)
	iconMenu.classList.remove('_active');
	headerMenu.classList.remove('_active');
}


TOPRATED_BUTTON.addEventListener('click', getTopratedMovies);
UPCOMING_BUTTON.addEventListener('click', getUpcomingMovies);
POPULAR_SHOWS_BUTTON.addEventListener('click', getPopularTVShows);
TOPRATED_SHOWS_BUTTON.addEventListener('click', getTopratedTVShows);
SHOWS_ONAIR_BUTTON.addEventListener('click', getTVShowsOnAir);
INPUT_SEARCH_ICON.addEventListener('click', getMovie);




const iconMenu = document.querySelector('.icon-menu');
const headerMenu = document.querySelector('.header__menu');
const headerList = document.querySelector('.header__list');

iconMenu.addEventListener('click', () => {
	iconMenu.classList.toggle('_active');
	headerMenu.classList.toggle('_active');
});


headerList.addEventListener('click', (e) => {
	if (e.target.classList.contains('header__link')) {
		iconMenu.classList.remove('_active');
		headerMenu.classList.remove('_active');
	}
})


const headerLinks = document.querySelectorAll('.header__link');

function changeClassActive(e) {
	headerLinks.forEach(link => {
		link.classList.remove('active');
		e.target.parentElement.classList.add('active');
	});
}

headerLinks.forEach(item => item.addEventListener('click', changeClassActive));