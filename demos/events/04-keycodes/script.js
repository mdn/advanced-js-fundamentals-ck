var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var block = {
  width: 20,
  height: 20,
  x: 190,
  y: 140,
}

document.addEventListener('keydown', function (event) {
  // Your code here…
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(block.x, block.y, block.width, block.height);
  requestAnimationFrame(gameLoop);
});
