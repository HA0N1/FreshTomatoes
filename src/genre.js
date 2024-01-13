const moviesApiUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const genresApiUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTZjYTlmMDI2YmE1NTE1NDNhMWRlZTQ3Y2RhYzVkMiIsInN1YiI6IjY1OTk5MDFjMGQxMWYyMDA5NWIzNDIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wKl8XO9bVhJrNV5y_NjjxgfLHgT0B2DJxudykvs9EUY"
  }
};

//async/await로 비동기 함수의 동기화
async function fetchApi() {
  try {
    // 영화정보 fetch
    const response1 = await fetch(moviesApiUrl, options);
    const data1 = await response1.json();
    const results = data1.results;
    console.log(results);

    // 메인에서 눌러서 넘어올 수 있는 건 아직 못했어요..

    // top rated 0번째 인덱스 영화 불러오기
    let orgnlTitle = results[0].original_title;
    console.log(String(results[0].title));
    console.log(String(orgnlTitle));

    // 원제와 제목이 같다면 원제는 공백 처리
    if (String(results[0].title) === String(orgnlTitle)) {
      orgnlTitle = "";
    }

    // 장르정보 fetch
    const response2 = await fetch(genresApiUrl, options);
    const data2 = await response2.json();
    const genres = data2.genres;
    console.log(genres);

    //장르 배열 정리된 배열로 만들기
    let newgenres = genres.map((obj) => ({ [obj.id]: obj.name }));

    // id숫자로 이루어진 배열을 넣으면 id에 해당하는 장르이름들을 배열로 출력하는 함수
    function genreIdToName(inputNumbers) {
      const mappingObject = Object.assign({}, ...newgenres);

      const resultArray = inputNumbers.map((number) => {
        return mappingObject[number];
      });

      return resultArray;
    }

    const inputNumbers = results[0].genre_ids; //장르 id배열 삽입

    const result = genreIdToName(inputNumbers);
    console.log(result);

    //select-movie 클래스 안에 삽입
    let movieHtml = `
          <img src="https://image.tmdb.org/t/p/original${results[0].poster_path}" alt="${results[0].title}" />
          <div class = "movie-info">
            <p class="movie-title">${results[0].title}&nbsp;<span>${orgnlTitle}</span></p>
            <hr>
            <p><span>Release_date</span> : ${results[0].release_date}</p>
            <p class="movie-genre"><span>Genre</span> : ${genreIdToName(results[0].genre_ids)}</p>
            <p><span>Rating</span> : ★ ${results[0].vote_average}</p>
            <p class = "overview">${results[0].overview}</p>
          </div>
        `;

    document.getElementById("select-movie").innerHTML += movieHtml;
  } catch (error) {
    console.error("Error:", error);
    return []; // 실패시 에러출력
  }
}

fetchApi();