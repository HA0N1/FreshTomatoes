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
    let orgnlTitle = results[6].original_title;
    console.log(String(results[6].title));
    console.log(String(orgnlTitle));
    if (String(results[6].title) === String(orgnlTitle)) {
      orgnlTitle = "";
    }
    let movieHtml = `
        <img src="https://image.tmdb.org/t/p/original${results[6].poster_path}" alt="${results[6].title}" />
        <div class = "movie-info">
          <p class="movie-title">${results[6].title}&nbsp;<span>${orgnlTitle}</span></p>
          <hr>
          <p><span>Release_date</span> : ${results[6].release_date}</p>
          <p class="movie-genre"><span>Genre</span> : ${results[6].genre_ids}</p>
          <p><span>Rating</span> : ★ ${results[6].vote_average}</p>
          <p class = "overview">${results[6].overview}</p>
          
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
