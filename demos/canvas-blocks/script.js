var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Block(x, y, width, height, canvas, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.canvas = canvas;
  this.context = context;
}

Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Block.prototype.move = function () {
  this.x++;
  return this;
};

var blocks = [];

for (var i = 0; i < 200; i += 20) {
  blocks.push(new Block(0, i, 14, 14, canvas, context));
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  //block.move();
  //block.draw();

  blocks.forEach(function (block) {
    block.draw().move();
  });

  requestAnimationFrame(gameLoop);
});
