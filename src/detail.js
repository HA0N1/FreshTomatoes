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

    // 메인에서 눌러서 넘어올 수 있는 건 아직 못했어요..

    // top rated 0번째 인덱스 영화 불러오기
    let orgnlTitle = results[0].original_title;
    console.log(String(results[0].title));
    console.log(String(orgnlTitle));
    
    // 원제와 제목이 같다면 원제는 공백 처리
    if (String(results[0].title) === String(orgnlTitle)) {
      orgnlTitle = "";
    }
    
    //select-movie 클래스 안에 삽입
    let movieHtml = `
          <img src="https://image.tmdb.org/t/p/original${results[0].poster_path}" alt="${results[0].title}" />
          <div class = "movie-info">
            <p class="movie-title">${results[0].title}&nbsp;<span>${orgnlTitle}</span></p>
            <hr>
            <p><span>Release_date</span> : ${results[0].release_date}</p>
            <p class="movie-genre"><span>Genre</span> : ${results[0].genre_ids}</p>
            <p><span>Rating</span> : ★ ${results[0].vote_average}</p>
            <p class = "overview">${results[0].overview}</p>
            
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
