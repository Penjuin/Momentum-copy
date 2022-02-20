const API키 = "f2c11b8b4d7e6068b7d1add3a51e75d3";
const 위치키 = "위치";
let 저장위치 = JSON.parse(localStorage.getItem(위치키));
let 위도;
let 경도;
function 성공(위치) {
    위도 = 위치.coords.latitude;
    경도 = 위치.coords.longitude;
    const 저장할위치 = {
        저장위도: 위도,
        저장경도: 경도,
    }
    localStorage.setItem(위치키, JSON.stringify(저장할위치))
    날씨확인();
}

function 날씨확인() {
    const 지역링크 = `https://api.openweathermap.org/geo/1.0/reverse?lat=${위도}&lon=${경도}&appid=${API키}`
    const 날씨링크 = `https://api.openweathermap.org/data/2.5/weather?lat=${위도}&lon=${경도}&units=metric&appid=${API키}&lang=kr`
    
    fetch(지역링크).then(응답 => 응답.json())
    .then(데이터 => {
        const 지역 = document.querySelector("#날씨틀 #지역");
        지역.innerText = 데이터[0].local_names.ko;
    })
    fetch(날씨링크).then(응답 => 응답.json())
    .then(데이터 => {
        const 날씨 = document.querySelector("#날씨틀 #날씨");
        날씨.innerText = `${데이터.main.temp}℃ / ${데이터.weather[0].description}`;
    });
    setInterval(날씨확인,1800000);
}

function 실패() {
    alert("당신의 위치를 알 수 없어 날씨 정보가 제공되지 않습니다.");
    지역.innerText = "";
    console.log(날씨)
    날씨.innerText = "";
}

function 정보() {
    if(저장위치 === null) {
        navigator.geolocation.getCurrentPosition(성공, 실패);
    } else {
        위도 = 저장위치.저장위도;
        경도 = 저장위치.저장경도;
        날씨확인();
    }
}

정보()

const 초기화버튼 = document.querySelector("#날씨틀 #초기화")

function 초기화() {
    localStorage.removeItem(위치키);
    저장위치 = null;
    정보();
}

초기화버튼.addEventListener("click", 초기화)