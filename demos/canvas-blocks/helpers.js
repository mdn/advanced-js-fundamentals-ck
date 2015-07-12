function getClickPosition(e) {
  function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  }

  var parentPosition = getPosition(e.currentTarget);
  var xPosition = e.clientX - parentPosition.x;
  var yPosition = e.clientY - parentPosition.y;

  return { x: xPosition, y: yPosition };
}
