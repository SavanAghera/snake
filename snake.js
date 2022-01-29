const score = document.getElementById('score');
const  canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const snakeSize = 10;
const boundary = 600;
const speed =  0.3
let x= 20;
let y=20;
let keyCode = 39;
let snake = [];
let food = {}
const makeFood =() => {
    food.x = Math.floor(Math.random()*(boundary- snakeSize*3)/snakeSize)*snakeSize;
    food.y = Math.floor(Math.random()*(boundary-snakeSize*3)/snakeSize)*snakeSize;
}
const updateLocation = () => {
    if(keyCode === 38) y-=snakeSize;
    else if(keyCode === 39) x+=snakeSize;
    else if(keyCode === 40) y+=snakeSize;
    else if(keyCode === 37) x-=snakeSize;
}
const clearLastLocation = (location) => {
    if(snake[0]) {
        location = snake.pop()
    }
    ctx.clearRect(location.x || x , location.y|| y , snakeSize, snakeSize);
}
const updateFood = ()=> {
    if(food.x === x && food.y === y) {
        makeFood();
        snake.push({x:food.x , y:food.y});
    }
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

}
const updateSnake = () => {
    snake.unshift({x,y});
    snake.forEach(v => {
     ctx.fillRect(v.x,v.y , snakeSize , snakeSize);
    });
}
const moveSnake = ()=> {
    let location ={}
    if(isInBoundry()) {
        clearInterval(interval);
        return;
    }
    clearLastLocation(location);
    updateLocation();
    updateFood();
    updateSnake()
    score.innerHTML = x+ ' ' + y + '  ' + food.x + " " + food.y + ' ' + snake.length;
     
}
const isInBoundry = () => x+ snakeSize*2> boundary || y+ snakeSize*2> boundary || y-snakeSize<0 || x-snakeSize<0
const interval = setInterval( moveSnake , 100);

const changeDirection = (event) => {
   if([37,38,39,40].includes(event.keyCode)) keyCode = event.keyCode;
}
makeFood();
document.addEventListener('keyup', changeDirection);

