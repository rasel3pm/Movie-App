const apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b64cbb54faafb95c79f4cdcfdbd74014&sort_by=popularity.desc&page=2"
const imgUrl = "https://image.tmdb.org/t/p/w500"
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=b64cbb54faafb95c79f4cdcfdbd74014&query="

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => renderFunction(data.results))
}
getMovies(apiUrl)

const main = document.querySelector('main');
const form = document.querySelector('form');
const inputValue = document.querySelector('#search');

function renderFunction(movies) {
    main.innerHTML = ""
    movies.forEach(movie => {
        const movieTitle = movie.title
        const movieRating = movie.vote_average
        const moviePoster = movie.poster_path
        const movieOverview = movie.overview

        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        movieDiv.innerHTML = `
        <img src="${imgUrl+moviePoster}" alt="">
        <div class="movie_info">
            <h3>${movieTitle}</h3>
            <span class="${getRatingPoint(movieRating)}">${movieRating}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${movieOverview}</p>
        </div>
        `
        main.appendChild(movieDiv)
    })
}
//movie rating color
function getRatingPoint(rating) {
    if (rating >= 8) {
        return "green"
    } else if (rating >= 5) {
        return 'orange'
    } else {
        return "red"
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const inputData = inputValue.value.trim()
    if (inputData && inputData !== "") {
        getMovies(searchUrl + inputData)
        inputData = ""
    } else {
        window.location.reload()
    }
})