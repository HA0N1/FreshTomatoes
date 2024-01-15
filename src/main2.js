function redirectToMoviePage(movieId) {
  window.location.href = `detail.html?id=${movieId}`;
}

// api키 가져오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYzNTM0Njc4ZTI1MjNlNzIxMDNlMzYyYWQxZWViNiIsInN1YiI6IjY1OGZjNTc2NGY5YTk5NzQ0Nzc2ZjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F0FoX3lUzAIfTywlttR-OhjlBAMIbI71ZQxoja0E8S8"
  }
};

// search api를 가져와서 검색시 카드로 출력
function searchApiName() {
  const movie_name_input = document.getElementById("in").value;
  const encodedSearchName = encodeURIComponent(movie_name_input);
  const searchApi = `https://api.themoviedb.org/3/search/movie?query=${encodedSearchName}&include_adult=false&language=ko-KR&page=1`;
  fetch(searchApi, options)
    .then((response) => response.json())
    .then((fetch3Data) => {
      const cardsBoxSearch = document.getElementById("cards-box-search");

      cardsBoxSearch.innerHTML = fetch3Data.results
        .map(
          (movie, index) => `
          <div class="movie-card ${index >= 5 ? "hidden" : ""}" onclick="redirectToMoviePage(${movie.id})">
          <div class="overlay-bg"></div>
          <img class="cardImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
          <div class ="overlay">
          <ul>
          <li>${movie.release_date.slice(0, 7)}</li>
          <li>${movie.title}</li>
          </ul>
          </div>
      </div>`
        )
        .join("");
    })
    .catch((error) => {
      console.error("Error fetching popular data:", error);
    });
}

// popular , toprated api를 가져와 카드로 출력
const popularApi = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
const topratedApi = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";

// popular 카드출력
fetch(popularApi, options)
  .then((response) => response.json())
  .then((fetch1Data) => {
    const cardsBoxPopular = document.getElementById("cards-box-popular");
    cardsBoxPopular.innerHTML = fetch1Data.results
      .map(
        (movie, index) => `
        <div class="movie-card ${index >= 5 ? "hidden" : ""}" onclick="redirectToMoviePage(${movie.id})">
        <div class="overlay-bg"></div>
                     <img class="cardImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                     <div class ="overlay">
                     <ul>
                     <li>${movie.release_date.slice(0, 7)}</li>
                     <li>${movie.title}</li>
                     </ul>
                     </div>
                 </div>
                 `
      )
      .join("");
  })
  .catch((error) => {
    console.error("Error fetching popular data:", error);
  });

// toprated 카드출력
fetch(topratedApi, options)
  .then((response) => response.json())
  .then((fetch2Data) => {
    const cardsBoxToprated = document.getElementById("cards-box-toprated");

    cardsBoxToprated.innerHTML = fetch2Data.results
      .map(
        (movie, index) => `
   <div class="movie-card ${index >= 5 ? "hidden" : ""}" onclick="redirectToMoviePage(${movie.id})">
                     <img class="cardImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                     <div class="overlay-bg"></div>
                     <div class ="overlay">
                     <ul>
                      <li>${movie.release_date.slice(0, 7)}</li>
                      <li>${movie.title}</li>
                     </ul>
                     </div>
                 </div>`
      )
      .join("");
  })
  .catch((error) => {
    console.error("Error fetching toprated data:", error);
  });

let isExpanded = false;

function toggleMore(cardsBoxId) {
  const cardsBox = document.getElementById(cardsBoxId);
  const cards = cardsBox.getElementsByClassName("movie-card");

  // If expanded, show all cards; if collapsed, show only the first 5 cards
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.toggle("hidden", isExpanded && i >= 5);
  }

  // Toggle the state
  isExpanded = !isExpanded;
}

function searchBtn() {
  searchApiName();
}
