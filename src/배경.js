const 사진 = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"]
const 사진선택 = 사진[Math.floor(Math.random() * 사진.length)];
document.body.style.backgroundImage = `url("images/${사진선택}")`