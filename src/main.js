document.addEventListener("DOMContentLoaded", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYzNTM0Njc4ZTI1MjNlNzIxMDNlMzYyYWQxZWViNiIsInN1YiI6IjY1OGZjNTc2NGY5YTk5NzQ0Nzc2ZjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F0FoX3lUzAIfTywlttR-OhjlBAMIbI71ZQxoja0E8S8"
    }
  };

  fetch("https://api.themoviedb.org/3/movie/top_rated?af63534678e2523e72103e362ad1eeb6?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      let results = response["results"];
      let moviesContainer = document.getElementById("movies");

      for (let i = 0; i < results.length; i++) {
        let movie = results[i];
        let title = movie["title"];
        let overview = movie["overview"];
        let vote_average = movie["vote_average"];
        let imagesrc = `https://image.tmdb.org/t/p/w300/${movie["poster_path"]}`;
        let id = movie["id"];

        let cardTemp = `
          <div class="movie-card" id="${id}">
            <img src="${imagesrc}" alt="${title}">
            <ul>
              <li>제목: ${title}</li>
              <li>내용 요약: ${overview}</li>
              <li>평점: ${vote_average}</li>
            </ul>
          </div>
        `;

        moviesContainer.insertAdjacentHTML("beforeend", cardTemp);

        let movieElement = document.getElementById(id);

        movieElement.querySelector("img").addEventListener("click", function () {
          window.alert(`영화 ID: ${id}`);
          location.href = `./detail.html?id=${id}`;
        });
      }

      let inputElement = document.querySelector("input");
      let mouseDown = document.querySelector("button");

      function search() {
        let inputText = inputElement.value.toLowerCase();
        let movieCards = document.querySelectorAll(".movie-card");

        movieCards.forEach((movieCard) => {
          movieCard.style.display = "none";
        });

        results
          .filter((movie) => movie["title"].toLowerCase().includes(inputText))
          .forEach((movie) => {
            document.getElementById(movie["id"]).style.display = "block";
          });
      }

      mouseDown.addEventListener("click", search);

      inputElement.addEventListener("keyup", function (enter) {
        if (enter.keyCode == 13) {
          search();
        }
      });
    });
});
