let name = document.getElementById("name");
let rating = document.getElementById("rating");
let reviewContent = document.getElementById("reviewContent");
let password = document.getElementById("password");
let form = document.getElementById("save");

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
