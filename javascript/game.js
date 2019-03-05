var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var height = 40;
var width = 90;
var x = 70;
var y = canvas.height - 300;
var dx = 0;
var dy = 0;
let randy = Math.floor(Math.random() * 300) + 75
let score = 0;
let sec = 0;
let render;
let towerW = 80;
let towerX = 480;
let highScore = 0;
let num = 0;
let imgUp = document.createElement('img');
imgUp.src = 'game-images/up.png';
let imgDown = document.createElement('img');
imgDown.src = 'game-images/down.png';
let imgLeft = document.createElement('img');
imgLeft.src = 'game-images/left.png';
let imgRight = document.createElement('img');
imgRight.src = 'game-images/right.png';
let imgAudl = document.createElement('img');
imgAudl.src = 'game-images/audl.png';
let imgAudlFlip = document.createElement('img');
imgAudlFlip.src = 'game-images/audlflip.png';

$("#play-again").unbind().on('click', function(){
    setUp();
})

function drawDisc(img) {
    ctx.beginPath();
    ctx.drawImage(img, x, y, width, height);
    ctx.fill();
    ctx.closePath();
}

console.log(randy)

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 87:

        dy = -13;
        sec = 0;

        break;
    }
};


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(y < 600){
        y += dy + (.32 * (sec * sec))/2;
    }
    else if(y > canvas.height){
        y = canvas.height - 20;
        lose()
    }

    towerX -= 10;

    if (towerX === -50){
        randy = Math.floor(Math.random() *300) + 75
        towerX = 480;
    }

    if(x === towerX + 50){
        score++
        
        $("#score").text("Score: " + score)

        if(score > highScore){
            highScore = score;
            $("#highscore").text("High Score: " + highScore)
        }
    }

   
    if(y + 5  >= 0 && y + 5 <= randy && x + 80 >= towerX && x + 10 <= towerX + towerW){
        lose();
    }
    if(y + height - 5 >= randy + 200 && y + height - 5 <= 600 && x + 80 >= towerX && x + 10 <= towerX + towerW){
        lose();
    }

    

    if(num === 0){
        drawDisc(imgUp);
    }
    else if(num === 1){
        drawDisc(imgRight);
    }
    else if(num === 2){
        drawDisc(imgDown);
    }
    else if(num === 3){
        drawDisc(imgLeft);

        num = -1
    }
    
    upperTower();
    lowerTower();
    sec += .75
    num++;
}

let lowerTower = function(){

    ctx.beginPath();
    ctx.rect(towerX, randy + 200, towerW, 600);
    ctx.fillStyle = "rgb(255, 0, 0, 1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(towerX, randy + 200, towerW, 180);
    ctx.fillStyle = "rgb(0, 0, 255, 1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.drawImage(imgAudl, towerX, randy + 200, towerW, 90);
    ctx.fill();
    ctx.closePath();
}

let upperTower = function(){

    ctx.beginPath();
    ctx.rect(towerX, 0, towerW, randy);
    ctx.fillStyle = "rgb(255, 0, 0, 1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(towerX, randy - 180, towerW, 180);
    ctx.fillStyle = "rgb(0, 0, 255, 1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.drawImage(imgAudlFlip, towerX, randy -90 , towerW, 90);
    ctx.fill();
    ctx.closePath();
}

let lose = () => {
    clearInterval(render)
    $("#play-again").show();
    $("#howto").show();

    $("#play-again").unbind().on('click', function(){
        setUp();
    })
}

let setUp = () => {
    square = 20;
    x = 70;
    y = canvas.height - 300;
    dx = 0;
    dy = 0;
    randy = Math.floor(Math.random() * 300) + 75 
    score = 0;
    sec = 0;
    towerW = 80;
    towerX = 480;
    
    $("#score").text("Score: " + score)
    $("#play-again").hide();
    $("#howto").hide();

    render = setInterval(draw, 25);
}