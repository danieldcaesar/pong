const canvas = document.getElementById("main-box");
const context = canvas.getContext("2d");
const fps = 50;
const com = {
    // computer paddle
    x: canvas.width/2 - 50,
    y: 0,
    width: 100,
    height: 10,
    colour: "white",
    score: 0
}
const usr = {
    // user paddle
    x: canvas.width/2 - 50,
    y: canvas.height-10,
    width: 100,
    height: 10,
    colour: "white",
    score: 0
}
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 6,
    velX: 0,
    velY: -1,
    colour: "white"
}
const net = {
    x: 0,
    y: canvas.height/2,
    width: 10,
    height: 2,
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
    context.font = "45px monospace";
    context.fillText(text, x, y);
}
function drawNet(){
    for (let i = 0; i <= canvas.width; i+=15) {
        drawRect(net.x + i, net.y, net.width, net.height, net.colour);     
    }
}
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 7;
    ball.velX = 0;
    ball.velY = -ball.velY;
}
// // controlling user paddle with mouse
// canvas.addEventListener("mousemove", movePaddle);
// function movePaddle(event) {
//     let rect = canvas.getBoundingClientRect();
//     usr.x = event.clientX - (usr.width/2);
// }

function movePaddle(event) {
    let rect = canvas.getBoundingClientRect();
    usr.x = evt.clientX - rect.left - usr.width/2;
}

window.addEventListener("mousemove", movePaddle, false);

function collision(b, p){
    b.top = b.y-b.radius;
    b.bottom = b.y+b.radius;
    b.left = b.x-b.radius;
    b.right = b.x+b.radius;

    p.top = p.y;
    p.bottom = p.y+p.height;
    p.left = p.x;
    p.right = p.x+p.width;

    if(b.right>p.left && b.bottom>p.top && b.left<p.right && b.top<p.bottom)
        return true;
}
function render() {
    // initializes game
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawNet();
    drawText("COM", canvas.width/10, canvas.height/8, "white");
    drawText("YOU", canvas.width/10, canvas.height/2 + 50, "white");
    drawText(com.score, canvas.width/10, 2*canvas.height/8, "white");
    drawText(usr.score, canvas.width/10, canvas.height/2 + 100, "white");
    
    drawRect(com.x, com.y, com.width, com.height, com.colour);
    drawRect(usr.x, usr.y, usr.width, usr.height, usr.colour);
    
    drawCircle(ball.x, ball.y, ball.radius, ball.colour);
}
function update() {
    

    // updates the score
    if(ball.y-ball.radius < 0){
        usr.score++;
        resetBall();
    }else if(ball.y+ball.radius > canvas.height){
        com.score++;
        resetBall();
    }

    ball.x += ball.velX;
    ball.y += ball.velY;

      // control the com paddle
      let compLevel = 0.065;
      com.x += (ball.x - (com.x + com.width/2)) * compLevel;

      if(ball.x+ball.radius > canvas.width || ball.x-ball.radius < 0){
          ball.velX = -ball.velX;
      }
 
      // check if ball hit user or com paddle
      let player = (ball.y<canvas.height/2) ? com : usr;


      if(collision(ball, player)){
        //   specifics for returning ball after paddle hit
        let collidePoint = ball.x - (player.x + player.width/2);
        collidePoint /= (player.width/2);
        let angleRad = collidePoint * (Math.PI/4);
        let direction = (ball.y+ball.radius < canvas.height/2) ? 1 : -1;
        ball.velX = ball.speed * Math.sin(angleRad);
        ball.velY = direction * ball.speed * Math.cos(angleRad);
        
        ball.speed += 0.1;
      }
  
}
function game(){
    render();
    update();
}

setInterval(game, 1000/fps);

