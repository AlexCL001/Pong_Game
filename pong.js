let body = document.querySelector("body");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height / 2;
let math = Math.round(Math.random()) * 2 - 1;
let vitesse = 5;
let speed = vitesse * math;
let velX = speed;
let velY = speed;
let color = "black";
let pOPosition = canvas.height / 2 - 50;
let pTPosition = canvas.height / 2 - 50;
let speedP = 5;
let point1 = 0;
let point2 = 0;

let cle = {
    up1: 0,
    down1: 0,
    up2: 0,
    down2: 0
};

body.onkeydown = function (e) {
    if (e.keyCode == "87") {
        cle.up1 = 1;
    }
    if (e.keyCode == "83") {
        cle.down1 = 1;
    }
    if (e.keyCode == "38") {
        cle.up2 = 1;
    }
    if (e.keyCode == "40") {
        cle.down2 = 1;
    }
};
body.onkeyup = function (e) {
    if (e.keyCode == "87") {
        cle.up1 = 0;
    }
    if (e.keyCode == "83") {
        cle.down1 = 0;
    }
    if (e.keyCode == "38") {
        cle.up2 = 0;
    }
    if (e.keyCode == "40") {
        cle.down2 = 0;
    }
};

function loop() {
    //update:
    speed = vitesse;
    x += velX;
    y += velY;
    if (x > (canvas.width - 10)) {
        velX = -speed;
        color = "blue";
        point1++;
    }
    if (y > (canvas.height - 10)) {
        velY = -speed;
    }
    if (x < 10) {
        velX = speed;
        color = "red";
        point2++;
    }
    if (y < 10) {
        velY = speed;
    }

    //mouvement joueur
    if (cle.up2 == 1) {
        pTPosition -= speedP;
    }
    if (cle.down2 == 1) {
        pTPosition += speedP;
    }
    if (cle.up1 == 1) {
        pOPosition -= speedP;
    }
    if (cle.down1 == 1) {
        pOPosition += speedP;
    }

    //collision barre
    if (pTPosition > canvas.height - 100) {
        pTPosition = canvas.height - 100;
    }
    if (pTPosition < 0) {
        pTPosition = 0;
    }
    if (pOPosition > canvas.height - 100) {
        pOPosition = canvas.height - 100;
    }
    if (pOPosition < 0) {
        pOPosition = 0;
    }

    //collision balle
    var ballRect = { x: x - 10, y: y - 10, w: 10 * 2, h: 10 * 2 };
    if (col(20, ballRect.x, pOPosition, ballRect.y, 10, ballRect.w, 100, ballRect.h)) {
        velX = speed;
    }
    if (col(canvas.width - 30, ballRect.x, pTPosition, ballRect.y, 10, ballRect.w, 100, ballRect.h)) {
        velX = -speed;
    }

    //dessin:
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    //ctx.fillStyle = "orange";
    //ctx.fillRect(x-10, y-10, 10*2, 10*2);
    ctx.closePath();
    ctx.fill();
    // ctx.fillRect(x, y, wi, he);

    ctx.textAlign = "center";
    ctx.font = "46px Courier";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.fillText(`${point1} | ${point2}`, canvas.width / 2, 20);

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(20, pOPosition, 10, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width - 30, pTPosition, 10, 100);


}

function col(x1, x2, y1, y2, w1, w2, h1, h2) {
    if (x1 + w1 >= x2 && y1 + h1 >= y2 && x1 <= x2 + w2 && y1 <= y2 + h2) {
        return true;
    } else {
        return false;
    }
}

setInterval(function () { loop(); }, 1000 / 60);


