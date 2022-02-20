const 저장닉네임 = localStorage.getItem("닉네임");
const 로그인 = document.querySelector("#로그인");
const 환영 = document.querySelector("#환영");
let 닉네임

function 환영인사() {
    const 시간 = new Date().getHours();
    if(시간 < 6) {
        환영.innerText = `분위기 있는 새벽이네요, ${닉네임}님`;
    } else if(시간 < 12) {
        환영.innerText = `좋은 아침입니다, ${닉네임}님`;
    } else if(시간 < 12) {
        환영.innerText = `즐거운 하루 되세요, ${닉네임}님`;
    } else if(시간 < 18) {
        환영.innerText = `좋은 오후입니다, ${닉네임}님`;
    } else {
        환영.innerText = `즐거운 하루 되셨나요, ${닉네임}님`;
    }
    환영.classList.remove("가림");
}

if(저장닉네임 !== null) {
    닉네임 = 저장닉네임;
    document.body.querySelector("#중간위").removeChild(로그인);
    환영인사();
    setInterval(환영인사, 60000);
} else {
    로그인.classList.remove("가림");
    로그인.addEventListener("submit", 가입);
}

function 가입(이벤트) {
    이벤트.preventDefault();
    닉네임 = 로그인.querySelector("#닉네임").value;
    localStorage.setItem("닉네임", 닉네임);
    로그인.classList.remove("가림");
    document.body.removeChild(로그인);
    환영인사();
    setInterval(환영인사, 60000);
}
