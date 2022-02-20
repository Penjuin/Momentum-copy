const 시계 = document.querySelector("#시계 h1");
const 전후표시 = document.querySelector("#정오 span");
const 표시법 = "시간표시법"
let 시간표시법 = localStorage.getItem(표시법);

function 시간() {
    const date = new Date()
    let 시 = date.getHours();
    if(시간표시법 === "24시간") {
        전후표시.innerText = "";
    } else {
        let 정오;
        if(시 < 12) {
            정오 = "오전";
        } else {
            정오 = "오후";
            시 -= 12; 
        }
        전후표시.innerText = 정오;
    }
    const 현재시 = String(시).padStart(2,"0");
    const 현재분 = String(date.getMinutes()).padStart(2, "0");
    if(시계.innerText.at("2") === " ") {
        시계.innerText = `${현재시}:${현재분}`;
    } else {
        시계.innerText = `${현재시} ${현재분}`;
    }
}

시간();
setInterval(시간, 1000);

const 표시스위치 = document.querySelector("#표시스위치");
const 표시스위치라벨 = 표시스위치.querySelector(".스위치라벨");

if(시간표시법 === "24시간") {
    표시스위치.classList.add("온");
}

function 표시법변경() {
    표시스위치.classList.toggle("온");
    if(시간표시법 === "12시간") {
        시간표시법 = "24시간";
    } else{
        시간표시법 = "12시간";
    }
    localStorage.setItem(표시법, 시간표시법);
    시간();
}

표시스위치.addEventListener("click", 표시법변경)