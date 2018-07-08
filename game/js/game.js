; (function (window, undefined) {
  var document = window.document;
  window.Game = Game;

  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    
  }

  Game.prototype.start = function () {

    this.snake.render(this.map);
    this.food.render(this.map);
    runSnake.bind(this)();
    keyControl.bind(this)();
    topSnake1();
    bottomSnake1();
    leftSnake1();
    rightSnake1();
  }
 

  function runSnake() {

    var timerId = setInterval(function () {

      this.snake.move(this.food, this.map);
      // 在渲染前，删除之前的蛇
      this.snake.render(this.map);

      // 判断蛇是否撞墙
      var maxX = this.map.offsetWidth / this.snake.width;
      var maxY = this.map.offsetHeight / this.snake.height;
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      for(var i = 1 ; i < this.snake.body.length ; i++){
        if(this.snake.body[i].x == headX && this.snake.body[i].y == headY){
          clearInterval(timerId);
          alert('吃饱啦~');
          this.snake.body = [
            { x: 3, y: 2, color: 'transparent' },
            { x: 2, y: 2, color: 'brown' },
            { x: 1, y: 2, color: 'brown' }
          ]
          this.snake.direction = 'right';
        }
      }

      if (headX < 0 || headX >= maxX) {

        clearInterval(timerId);
        alert('吃饱啦~');
        this.snake.body = [
          { x: 3, y: 2, color: 'brown' },
          { x: 2, y: 2, color: 'brown' },
          { x: 1, y: 2, color: 'brown' }
        ]
        this.snake.direction = 'right';
      }

      if (headY < 0 || headY >= maxY) {
        clearInterval(timerId);
        alert('吃饱啦~');
        this.snake.body = [
          { x: 3, y: 2, color: 'pink' },
          { x: 2, y: 2, color: 'pink' },
          { x: 1, y: 2, color: 'pink' }
        ]
        this.snake.direction = 'right';
      }

    }.bind(this), 150);
  }

  function keyControl() {
    document.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 37: //left
          if(this.snake.direction != 'right'){
            this.snake.direction = 'left';
          }
          break;
        case 38: //top
          if(this.snake.direction != 'bottom'){
            this.snake.direction = 'top';
          }
          break;
        case 39: //right
          if(this.snake.direction != 'left'){
             this.snake.direction = 'right';
          }
          break;
        case 40: //bottom
          if(this.snake.direction != 'top'){
            this.snake.direction = 'bottom';
          }
          break;

      }
    }.bind(this), false)
  }


  function topSnake1(){
    var topSnake = document.getElementById('top');
    animateCall(topSnake,{
      left : 760
    },topSnake2)
  }
  function topSnake2(){
    var topSnake = document.getElementById('top');
    animateCall(topSnake,{
      left : 0
    },topSnake1)
  }
  function bottomSnake1(){
    var bottomSnake = document.getElementById('bottom');
    animateCall(bottomSnake,{
      left : 0
    },bottomSnake2)
  }
  function bottomSnake2(){
    var bottomSnake = document.getElementById('bottom');
    animateCall(bottomSnake,{
      left : 760
    },bottomSnake1)
  }
  function leftSnake1(){
    var leftSnake = document.getElementById('left');
    animateCall(leftSnake,{
      top : 0
    },leftSnake2)
  }
  function leftSnake2(){
    var leftSnake = document.getElementById('left');
    animateCall(leftSnake,{
      top : 560
    },leftSnake1)
  }
  function rightSnake1(){
    var rightSnake = document.getElementById('right');
    animateCall(rightSnake,{
      top : 560
    },rightSnake2)
  }
  function rightSnake2(){
    var rightSnake = document.getElementById('right');
    animateCall(rightSnake,{
      top : 0
    },rightSnake1)
  }

})(window, undefined)