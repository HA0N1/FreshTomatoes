const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// 가져온 movieId를 사용하여 다양한 동작 수행
console.log(movieId);

const moviesApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
// const moviesApiUrl = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";
const genresApiUrl = "https://api.themoviedb.org/3/genre/movie/list?language=ko";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYzNTM0Njc4ZTI1MjNlNzIxMDNlMzYyYWQxZWViNiIsInN1YiI6IjY1OGZjNTc2NGY5YTk5NzQ0Nzc2ZjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F0FoX3lUzAIfTywlttR-OhjlBAMIbI71ZQxoja0E8S8"
  }
};

//async/await로 비동기 함수의 동기화
async function fetchApi() {
  try {
    // 영화정보 fetch
    const response1 = await fetch(moviesApiUrl, options);
    const data1 = await response1.json();
    // const results = await data1.results;
    console.log(data1);

    // 메인에서 눌러서 넘어올 수 있는 건 아직 못했어요..

    // top rated 0번째 인덱스 영화 불러오기
    let orgnlTitle = data1.original_title;
    console.log(String(data1.title));
    console.log(String(orgnlTitle));

    // 원제와 제목이 같다면 원제는 공백 처리
    if (String(data1.title) === String(orgnlTitle)) {
      orgnlTitle = "";
    }

    // 장르정보 fetch
    const response2 = await fetch(genresApiUrl, options);
    const data2 = await response2.json();
    const genres = await data2.genres;
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

    const inputNumbers = data1.genres.map((genre) => genre.id); //장르 id배열 삽입

    const result = genreIdToName(inputNumbers);
    console.log(result);

    //select-movie 클래스 안에 삽입
    let movieHtml = `
          <img src="https://image.tmdb.org/t/p/original${data1.poster_path}" alt="${data1.title}" />
          <div class = "movie-info">
            <p class="movie-title">${data1.title}&nbsp;<span>${orgnlTitle}</span></p>
            <hr>
            <p><span>Release_date</span> : ${data1.release_date}</p>
            <p class="movie-genre"><span>Genre</span> : ${genreIdToName(data1.genres.map((genre) => genre.id))}</p>
            <p><span>Rating</span> : ★ ${data1.vote_average}</p>
            <p class = "overview">${data1.overview}</p>
            <button type="button" onclick="location.href='/FreshTomatoes.html'">이전으로</button>
          </div>
        `;

    document.getElementById("select-movie").innerHTML += movieHtml;
  } catch (error) {
    console.error("Error:", error);
    return []; // 실패시 에러출력
  }
}

fetchApi();
