import { movieId } from "./detail.js";
let name = document.getElementById("name");
let rating = document.getElementById("rating");
let reviewContent = document.getElementById("reviewContent");
let password = document.getElementById("password");
let form = document.getElementById("save");
// let cardHeader = document.querySelector(".cardHeader");
// let spanName = document.querySelector(".spanName");
let cardContainer = document.querySelector(".cardContainer");

class Board {
  constructor(name, rating, reviewContent, password) {
    this._name = name;
    this._rating = rating;
    this._reviewContent = reviewContent;
    this._password = password;
  }

  set name(value) {
    if (value.length === 0) throw new Error("작성자를 입력해주세요");
    this._name = vlaue;
  }

  set reviewContent(value) {
    if (value.length === 0) throw new Error("작성자를 입력해주세요");
    this._reviewContent = vlaue;
  }

  set password(value) {
    if (value.length === 0) throw new Error("작성자를 입력해주세요");
    this._password = password;
  }
}

let boardStr = localStorage.getItem("boards");

if (boardStr === null) {
  const listStr = JSON.stringify([]);
  localStorage.setItem("boards", listStr);
  boardStr = listStr;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValue = name.value;
  let ratingValue = rating.value;
  let reviewContentValue = reviewContent.value;
  let passwordValue = password.value;

  try {
    let boardsObj = JSON.parse(localStorage.getItem("boards_" + movieId));

    if (boardsObj === null) {
      boardsObj = [];
    }

    const instance = new Board(nameValue, ratingValue, reviewContentValue, passwordValue);
    boardsObj.push(instance);

    const boardStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards_" + movieId, boardStr);
    window.location.reload();
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
});

let boardsObj = JSON.parse(localStorage.getItem("boards_" + movieId));

// 저장된 데이터들을 순회하며 각 변수에 저장 후, 추가하기
let boardsValue = function () {
  for (let i = 0; i < boardsObj.length; i++) {
    let boardsName = boardsObj[i]._name;
    let boardsRating = boardsObj[i]._rating;
    let boardsReviewContent = boardsObj[i]._reviewContent;
    let boardsPassword = boardsObj[i]._password; // 언젠간 쓰겠지 뭐
    let starRating = "⭐".repeat(boardsRating);
    //카드 추가
    let review = `<div class="card">
  <div class="cardHeader">
    <span class="spanName">${boardsName}</span>
    <span class="rating">${starRating}</span>
    <hr />
    <p>${boardsReviewContent}</p>
    <button class="likeButton">좋아요👍</button>
    <span class="likeCount">0</span>
  </div>
</div>`;
    cardContainer.innerHTML += review;

    // console.log(boardsName, boardsRating, boardsReviewContent, boardsPassword);
  }
};
boardsValue();

// 좋아요 기능 만들기
// 1. 누를 수 있게 하기
// 2. 누를 때 마다 카운팅 되게 하기
// 3. 된 값을 저장하여 두기
// 4. 가져오기

//  1 : 누를 수 있게 하기
let likeButtons = document.querySelectorAll(".likeButton");
let likeCounts = document.querySelectorAll(".likeCount");
// 값이 없으면 빈배열로 초기화
boardsObj = JSON.parse(localStorage.getItem("boards")) || [];
// 2 : 누를 때마다 카운팅
let likeCounting = function (index) {
  let count = parseInt(likeCounts[index].innerText);
  likeCounts[index].innerText = count + 1;

  // 3: local storage에 저장
  let cardLikeCountKey = "likeCounting_" + movieId + "_" + index;
  localStorage.setItem(cardLikeCountKey, likeCounts[index].innerText);
};

function getLikeCountKey(index) {
  return "likeCounting_" + movieId + "_" + index;
}
// 2: 버튼 누를 때 마다 카운팅
likeButtons.forEach((button, index) => {
  button.addEventListener("click", () => likeCounting(index));
});

// 4: 좋아요 수와 인덱스 가지고오기
let updateLikeCounts = function () {
  likeCounts.forEach((count, index) => {
    let cardLikeCountKey = getLikeCountKey(index);
    let storedLikeCount = localStorage.getItem(cardLikeCountKey);

    // ui 갈아끼워주기
    if (storedLikeCount !== null) {
      count.innerText = storedLikeCount;
    }
  });
};

window.onload = updateLikeCounts;
