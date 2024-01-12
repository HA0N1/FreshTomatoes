// api키 가져오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTg5YjJmZTBiOWQ3NWExNGQzMWMwM2EwMWViZmMxYyIsInN1YiI6IjY1OTRmM2M0YTY5OGNmNmNmMDQzYTExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zr1q2WXcxaJmGs0cx8LLGmNxmiVmKFC0PLbJbrQvG94"
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
          (movie) => `
          <div class="movie-card" onclick="alert('영화 id : ${movie.id}')">
          <div class="overlay-bg"></div>
          <img class="cardImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
          <div class ="overlay">
          <ul>
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
        (movie) => `
        <div class="movie-card" onclick="alert('영화 id : ${movie.id}')">
        <div class="overlay-bg"></div>
                     <img class="cardImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                     <div class ="overlay">
                     <ul>
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
        (movie) => `
   <div class="movie-card" onclick="alert('영화 id : ${movie.id}')">
                     <img class="cardImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                     <div class="overlay-bg"></div>
                     <div class ="overlay">
                     <ul>
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

function searchBtn() {
  searchApiName();
}
