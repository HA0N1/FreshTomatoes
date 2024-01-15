let name = document.getElementById("name");
let rating = document.getElementById("rating");
let reviewContent = document.getElementById("reviewContent");
let password = document.getElementById("password");
let form = document.getElementById("save");
let cardHeader = document.querySelector(".cardHeader");
let spanName = document.querySelector(".spanName");
let cardContainer = document.querySelector(".cardContainer");

class Board {
  constructor(name, rating, reviewContent, password) {
    this._name = name;
    this._rating = rating;
    this._reviewContent = reviewContent;
    this._password = password;
  }

  set name(vlaue) {
    if (vlaue.length === 0) throw new Error("작성자를 입력해주세요");
    this._name = vlaue;
  }

  set reviewContent(vlaue) {
    if (vlaue.length === 0) throw new Error("작성자를 입력해주세요");
    this._reviewContent = vlaue;
  }

  set password(vlaue) {
    if (vlaue.length === 0) throw new Error("작성자를 입력해주세요");
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
  name = name.value;
  rating = rating.value;
  reviewContent = reviewContent.value;
  password = password.value;

  try {
    const boardsObj = JSON.parse(localStorage.getItem("boards"));

    const instance = new Board(name, rating, reviewContent, password);
    boardsObj.push(instance);

    const boardStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardStr);
    window.location.reload();
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
});

let boardsObj = JSON.parse(localStorage.getItem("boards"));
// 저장된 데이터들을 순회하며 각 변수에 저장 후, 추가하기
let boardsValue = function () {
  for (i = 0; i < boardsObj.length; i++) {
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
//  좋아요 기능 만들기
// 1. 누를 수 있게 하기
// 2. 누를 때 마다 카운팅 되게 하기
// 3. 된 값을 저장하여 두기
// 4. 가져오기
// step 1
let likeButton = document.querySelector(".likeButton");
let likeCount = document.querySelector(".likeCount");
// step 2 텍스트를 숫자로 받아 담고 텍스트에 +1씩하며 값 저장
let likeCounting = function () {
  for (i = 0; i < boardsObj.length; i++) {
    let count = parseInt(likeCount.innerText);
    likeCount.innerText = count + 1;
    boardsObj[i];
  }
};
// step 3 localstorage에 저장해야함
localStorage.setItem("likeCounting", likeCount.innerText);
likeButton.addEventListener("click", likeCounting);
