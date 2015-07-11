var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Alien(context, x, y, width, height) {
  this.context = context || window.context;
  this.x = x || 50;
  this.y = y || 50;
  this.height = height || 10;
  this.width = width || 10;
}

Alien.prototype.color = 'rgb(29, 178, 212)';

Alien.prototype.draw = function () {
  this.context.save();
  this.context.fillStyle = this.color;
  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.restore();
  return this;
}

Alien.prototype.move = function () {
  if (this.y < canvas.height - this.height) { this.y++; }
  return this;
}

var aliens = [];
aliens.createAlien = function (x, y, width, height) {
  this.push(new Alien(context, x, y, width, height));
}

canvas.addEventListener('click', function (event) {
  var pos = getClickPosition(event);
  aliens.createAlien(pos.x, pos.y);
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  aliens.forEach(function (alien) { alien.draw().move() });
  requestAnimationFrame(gameLoop);
});
