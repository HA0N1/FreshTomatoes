let submitBtn = document.querySelector(`input[type="submit"]`);
let inputName = document.querySelector(`input[type="text"]`);
let inputCommend = document.getElementById("comment");
let reList = document.getElementById("reList");
function push() {
  localStorage.setItem(inputName.value, inputCommend.value);
  alert("작성이 완료되었습니다.");
}
function loadDataAndDisplay() {
  // 반복하면서 찾기
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);

    // 리뷰카드
    let listItem = document.createElement("div");
    listItem.textContent = `이름 : ${key} 평가 ${value}`;

    //리뷰추가
    reList.appendChild(listItem);
  }
}

submitBtn.addEventListener("click", push);

// 페이지 로드 시 데이터 로드
window.addEventListener("load", loadDataAndDisplay);
