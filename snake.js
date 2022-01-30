const score = document.getElementById('score');
const  canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const snakeSize = size.value*1 || 10; 
const boundary = 600; // canvas size
const snakeSpeed =  speed.value*1 || 10
let x= snakeSize;
let y= snakeSize; 
let keyCode = 39; //last pressed key
let snake = []; //snake length array
let food = {} //food position
let interval;
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
const updateLocationAutomatic = () => {
    
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
const startGame = () => {
    interval = setInterval( moveSnake , 1000/snakeSpeed);
    document.addEventListener('keyup', changeDirection);
    makeFood();
}
const changeDirection = (event) => {
    if([37,38,39,40].includes(event.keyCode)) keyCode = event.keyCode;
 }
 const isInBoundry = () => x+ snakeSize*2> boundary || y+ snakeSize*2> boundary || y-snakeSize<0 || x-snakeSize<0


