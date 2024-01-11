# 내배캠 Node.js 4기 팀 과제
## 🚩 팀 소개



## 🚩 과제 개요
기간 : 24. 01.10 - 24.01.26

1. 개인과제에서 작성한 [내배캠 인기영화 콜렉션]을 발전시키는 팀 프로젝트
2. 팀원들의 프로젝트 N개 중 1개를 대표로 선택, 팀 프로젝트로 발전

## 🚩 요구 사항
### (1) 필수 요구 사항
 1. TMDB 또는 영화진흥위원회 오픈 API 이용
 2. 영화정보 상세 페이지
 2-1 기존 영화정보 카드 리스트에서 특정 item을 선택할 시, 상세 페이지로 이동
 3. 상세 페이지에서 메인 페이지(홈)로 이동하는 UI
 3-1 상세 페이지 영화 리뷰 작성
 3-2 상세페이지에서 특정 영화에 대해 의견을 작성할 수 있는 UI
 3-3 작성자, 리뷰, 확인비밀번호를 입력하도록 구현
 3-4 작성한 정보는 브라우저의 localStorage에 적재
 4. github PR(=Pull Request) 사용한 협업
 5. UX를 고려한 validation check
 5-1 영화 검색
 5-2 댓글 작성
 5-3 추가 기능 구현 시
 6. 하기 기재된 Javascript 문법 요소를 이용하여 구현
 - const와 let만을 이용한 변수 선언
 - 형 변환 : 타입별 2개 이상 사용
  - number → string
  - string → number
  - boolean → string2
 - 연산자 : 3개 이상 사용
 - 화살표 함수 : 2개 이상 사용
 - 조건문 : 하기 예시 전부 구현
    - if문(3개 중 1개 이상 필수)
        - if
        - if-else
        - if-else if-else
    - switch문
    - 삼항연산자
    - 조건문 중첩(2개 중 1개 이상 필수)
        - 2중 if
        - if 내부 switch
 - 반복문 : 하기 예시 전부 구현
    - for문(3개 중 2개 이상 구현)
        - 일반 for문
        - for … in문
        - for … of문
    - while문(2개 중 1개 이상 구현)
        - 일반 while문
        - do ~ while 문
    - 반복 제어 명령문(2개 중 1개 이상 구현)
        - break문
        - continue문
 - 객체
 - 배열 메서드 (push, pop, shift, unshift, splice, slice) 2개 이상
 - 배열 메서드 (forEach, map, filter, reduce, find) 3개 이상
 - 자료구조 (Map, Set) 중 1개 이
 - null과 undefined를 활용한 없는 값에 대한 처리
 - callback 함수(setTimeout, setInterval) 활용
 - DOM 제어
 - module (import, export)
   
### (2) 선택요구사항
 - CSS
  - flex, grid 사용하기
  - 반응형 UI 구성하기
 - 상세페이지 리뷰 수정 및 삭제 기능 구현
 - 메인페이지
  - 조건에 맞는 카드 리스트 정렬 기능(이름순, 별점순 등 자유롭게)
 위에서 설명하지 않은 기타 외부 API

🚩 역할 분담
***
|최하온 |문상웅 |조완희 |서린| 김유진|
|:--:|:--:|:--:|:--:|:--:|
|리뷰 작성 기능 및 적재 |리뷰 작성 기능 및 적재|메인페이지 및 창이동 구현 |영화정보 상세 페이지 구현|영화정보 상세 페이지 구현|
