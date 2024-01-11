const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGRjZmM4NTUwZjMwMDMxYjZiOTdmNzc0MWEyNjViZCIsInN1YiI6IjY1OTdkZWQyZDdhNzBhMTIyZTZhOGJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGwAyptpeUm5dSc3ZrVvJCe2pNirHAsbWZlJYCiOvPw"
  }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((response) => {
    const results = response["results"];
    let movieHtml = `
        <img src="https://image.tmdb.org/t/p/original${results[0].poster_path}" alt="${results[0].title}" />
        <div class = "movie-info">
          <p class="movie-title">${results[0].title}&nbsp;<span>${results[0].original_title}</span></p>
          <p>Release_date : ${results[0].release_date} | Genre : ${results[0].genre_ids}</p>
          <p>Rating: ${results[0].vote_average}</p>
          <p>${results[0].overview}</p>
          
        </div>
      `;
    document.getElementById("select-movie").innerHTML += movieHtml;

    // results.forEach((a) => {
    //   let movieHtml = `
    //   <div class="movie-info" id="${a.id}">
    //     <img src="https://image.tmdb.org/t/p/original${a.poster_path}" alt="${a.title}">
    //     <h2 class="card-title">${a.title}</h2>
    //     <p>${a.overview}</p>
    //     <p>Rating: ${a.vote_average}</p>
    //   </div>
    //   `;

    // });
  })
  .catch((err) => console.error(err));
