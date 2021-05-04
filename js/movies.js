
const MOVIES_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0ca95ecb421de299a8e0377085b633e8&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=0ca95ecb421de299a8e0377085b633e8&query="'
const HIGHEST_RATED_API = 'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=0ca95ecb421de299a8e0377085b633e8'
const TOM_CRUISE_API = 'https://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=0ca95ecb421de299a8e0377085b633e8'
const BRAD_PITT_API = 'https://api.themoviedb.org/3/discover/movie?with_people=287,819&sort_by=vote_average.desc&api_key=0ca95ecb421de299a8e0377085b633e8'
const LIAM_NEESON_API = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=0ca95ecb421de299a8e0377085b633e8'

const searchMovie = $("#movie-search");
// const searchMovie = document.getElementById('movie-search');
const search = $("#search");
const main = $("#main");

//Get initial Movies
getMovies(MOVIES_API);

//function to get movies from main API
async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  // console.log(data.results);
  showMovies(data.results)
}

//Render movies to the page
function showMovies(movies) {
  main.empty();
  // main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie
    // console.log("i am in the function");
    // console.log(movie);

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img src="${IMG_PATH + poster_path }" alt="${title}">
       <div class="movie-info">
         <h3>${title}</h3>
         <span class="${assignClassByRating(vote_average)}">${vote_average}</span>
       </div>
       <div class="overview">
         <h3>overview</h3>
         ${overview}
       </div>
    `
    main.append(movieElement);
  })
}

function assignClassByRating(rating) {
  if(rating >= 8) {
    return "green";
  } else if(rating >=5) {
    return "orange";
  } else {
    return "red";
  }
}

//Get movies by seacrh
searchMovie.submit(function (event) {
  event.preventDefault();

  const searchTerm = search.val();
  // console.log(searchTerm);

  if(searchTerm && searchTerm != "") {
    getMovies(SEARCH_API + searchTerm);

    search.val("");
  } else {
    window.location.reload();
  }
})

//render movies based on filters
$( "#movie-filters" ).change(function(event) {
  event.preventDefault();
  showMoviesByFilter();
});

function showMoviesByFilter() {
  const filterSelected = document.getElementById("movie-filters").value;
  // console.log(filterSelected);

  if(filterSelected === "most-popular") {
    getMovies(MOVIES_API);
  } else if(filterSelected === "highest-rated") {
    getMovies(HIGHEST_RATED_API)
  } else if(filterSelected === "tom-cruise") {
    getMovies(TOM_CRUISE_API);
  } else if(filterSelected === "brad-pitt") {
    getMovies(BRAD_PITT_API);
  } else {
    getMovies(LIAM_NEESON_API);
  }
}

// searchMovie.submit(function (event) {
//   event.preventDefault();
//
//   const searchTerm = search.val();
//   console.log(searchTerm);
//
//   if(searchTerm && searchTerm != '') {
//     getMovies(SEARCH_API + searchTerm);
//
//     search.val('');
//   } else {
//     window.location.reload();
//   }
// });
