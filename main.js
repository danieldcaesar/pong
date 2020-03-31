const canvas = document.getElementById("main-box");
const context = canvas.getContext("2d");
const fps = 50;
const com = {
    // computer paddle
    x: 0,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    colour: "white",
    score: 0
}
const usr = {
    // user paddle
    x: canvas.width-10,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    colour: "white",
    score: 0
}
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velX: 5,
    velY: 5,
    colour: "white"
}
const net = {
    x: canvas.width/2,
    y: 0,
    width: 2,
    height: 10,
    colour: "white"
}

function drawRect(x, y, w, h, colour){
    // draws rectangle from point x,y with dimensions h,w & colour
    context.fillStyle = colour;
    context.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, colour){
    // draws circle with centre(x,y) with radius(r) & colour
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}
function drawText(text, x, y, colour){
    // draws text at a position(x,y) with a colour
    context.fillStyle = colour;
    context.font = "45px blippo";
    context.fillText(text, x, y);
}
function drawNet(){
    for (let i = 0; i <= canvas.height; i+=15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.colour);     
    }
}
function render() {
    // initializes game
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawNet();
    drawText(com.score, canvas.width/4, canvas.height/5, "white");
    drawText(usr.score, 3*canvas.width/4, canvas.height/5, "white");
    
    drawRect(com.x, com.y, com.width, com.height, com.colour);
    drawRect(usr.x, usr.y, usr.width, usr.height, usr.colour);
    drawCircle(ball.x, ball.y, ball.radius, ball.colour);
}
function game(){
    render();
}


setInterval(game, 1000/fps);

