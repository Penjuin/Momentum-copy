const 목표 = document.querySelector("#목표");
const 할일입력 = 목표.querySelector("#할일");
const 할일목록 = document.querySelector("#할일목록");
let 저장할목록 = [];
let 표시할목록 = [];
const 저장소키 = "할일";
let 저장된목록 = JSON.parse(localStorage.getItem(저장소키));
const date = new Date();
let 등록시간 = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

function 할일추가(이벤트) {
    이벤트.preventDefault();
    const 할일 = 할일입력.value;
    할일입력.value = "";
    let 오브젝트 = {
        내용 : 할일,
        아이디 : Date.now(),
        등록일 : 등록시간,
        완료 : false,
    }
    오브젝트 = 아이디체크(오브젝트);
    저장할목록.push(오브젝트);
    할일표시(오브젝트);
    할일저장();
}

function 아이디체크(오브젝트) {
    저장할목록.forEach(엘리먼트 => {
        if(엘리먼트.아이디 === 오브젝트.아이디) {
            오브젝트.아이디 += 1;
            아이디체크();
        }
    })
    return 오브젝트
}

function 할일표시(오브젝트) {
    const 틀 = document.createElement("div");
    틀.id = 오브젝트.아이디;
    const 목록 = document.createElement("li");
    틀.appendChild(목록);
    const 완료버튼 = document.createElement("input")
    완료버튼.type = "checkbox";
    if(오브젝트.완료 === true) {
        완료버튼.setAttribute("checked", "")
        목록.classList.add("완료");
    }
    완료버튼.addEventListener("click", 할일토글)
    목록.appendChild(완료버튼);
    const 내용 = document.createElement("span");
    내용.innerText = 오브젝트.내용;
    목록.appendChild(내용);
    const 삭제버튼 = document.createElement("span");
    삭제버튼.classList.add("삭제");
    삭제버튼.innerText = "❌";
    삭제버튼.addEventListener("click", 할일삭제)
    틀.appendChild(삭제버튼);
    할일목록.appendChild(틀);
}

function 할일토글(이벤트) {
    const 체크박스 = 이벤트.target.parentElement;
    const 완료한일 = 체크박스.parentElement;
    체크박스.classList.toggle("완료");
    let 완료;
    if(체크박스.classList.contains("완료")) {
        완료 = true;
    } else {
        완료 = false;
    }
    저장할목록.forEach(엘리먼트 => {
        if(엘리먼트.아이디 === parseInt(완료한일.id)) {
            엘리먼트.완료 = 완료;
        }
    });
    할일저장();
}

function 할일삭제(이벤트) {
    const 할일 = 이벤트.target.parentElement;
    저장할목록 = 저장할목록.filter(엘리먼트 => 엘리먼트.아이디 !== parseInt(할일.id));
    할일저장();
    할일.remove();
}

function 할일저장() {
    localStorage.setItem(저장소키, JSON.stringify(저장할목록));
    저장된목록 = 저장할목록;
}

목표.addEventListener("submit", 할일추가)

const 과거표시키 = "과거표시";
let 과거표시 = localStorage.getItem(과거표시키);
const 과거표시스위치 = document.querySelector("#과거표시스위치");
const 과거표시라벨 = 과거표시스위치.querySelector(".스위치라벨");
const 켜짐 = "켜짐";
const 꺼짐 = "꺼짐";

if(과거표시 === 켜짐) {
    과거표시스위치.classList.add("온");
}

function 과거표시전환() {
    과거표시스위치.classList.toggle("온");
    if(과거표시 === 켜짐) {
        과거표시 = 꺼짐;
    } else{
        과거표시 = 켜짐;
    }
    localStorage.setItem(과거표시키, 과거표시);
    저장목록로드();
}

과거표시스위치.addEventListener("click", 과거표시전환)

function 저장목록로드() {
    while(할일목록.firstChild) {
        할일목록.removeChild(할일목록.firstChild);
    }
    if(저장된목록 !== null) {
        if(과거표시 === 꺼짐) {
            저장할목록 = 저장된목록;
            표시할목록 = 저장할목록.filter(엘리먼트 => 엘리먼트.등록일 === 등록시간);
        } else {
            저장할목록 = 저장된목록;
            표시할목록 = 저장할목록;
            과거표시 = 켜짐;
            localStorage.setItem(과거표시키, 과거표시);
        }
        표시할목록.forEach(할일표시);
    }
}

저장목록로드();

function 일괄삭제후() {
    할일저장();
    저장목록로드();
}

const 지난날짜삭제버튼 = document.querySelector("#지난날짜삭제");

function 지난날짜삭제() {
    저장할목록 = 저장할목록.filter(엘리먼트 => 엘리먼트.등록일 === 등록시간);
    일괄삭제후();
}

지난날짜삭제버튼.addEventListener("click", 지난날짜삭제);

const 완료한일삭제버튼 = document.querySelector("#완료한일삭제");

function 완료한일삭제() {
    저장할목록 = 저장할목록.filter(엘리먼트 => 엘리먼트.완료 === false);
    일괄삭제후();
}

완료한일삭제버튼.addEventListener("click", 완료한일삭제);