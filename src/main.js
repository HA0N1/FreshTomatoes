// $(document).ready(function test() {
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYzNTM0Njc4ZTI1MjNlNzIxMDNlMzYyYWQxZWViNiIsInN1YiI6IjY1OGZjNTc2NGY5YTk5NzQ0Nzc2ZjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F0FoX3lUzAIfTywlttR-OhjlBAMIbI71ZQxoja0E8S8"
  }
};
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?af63534678e2523e72103e362ad1eeb6?language=en-US&page=1', options",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let results = response["results"];
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

      // api에 연동된 영화들 추가
      let movieApi = $(document.getElementById("movies"));
      movieApi.append(cardTemp);
      // $("#movies").append(cardTemp);

      // 이미지 클릭시 아이디 나오게 하기
      $(`#${id} img`).click(() => {
        window.alert(`영화 ID: ${id}`);
      });
      // $(`#${id} img`).click(function () {
      //   alert(`영화 ID: ${id}`);
      // });
    }
    // 클릭과 입력을 위해 변수에 할당해주기
    let inputElement = $(document.querySelector("input"));
    let mouseDown = document.querySelector("button");
    // 검색하는 함수
    function search() {
      let inputText = inputElement.val().toLowerCase(); //input에 입력 받은 값을 담아주고 소문자 처리.
      $(".movie-card").hide(); // 일단 다 숨기기
      // 입력값이랑 title이랑 비교하여 아이디
      // includes(): 배열의 항목에 특정 값이 포함되어 있는지를 판단 T/F 값으로 반환.
      //movie["id"]와 동일한 요소
      results
        .filter((movie) => movie["title"].toLowerCase().includes(inputText))
        .forEach((movie) => {
          $(`#${movie["id"]}`).show();
        });
    }

    mouseDown.addEventListener("click", search);

    inputElement.keyup(function press(enter) {
      if (enter.keyCode == 13) {
        search();
      }
    });
  });
// for (let i = 0; i < results.length; i++) {
//   let movie = results[i];
//   let title = movie["title"].toLowerCase();
//   //includes: 배열의 항목에 특정 값이 포함되어 있는지를 판단 T/F 값으로 반환.
//   if (title.includes(inputText)) {
//     $(`#${movie["id"]}`).show(); // 입력한 값이 title에 포함되어 있으면 show해주기.
//   }
// }
