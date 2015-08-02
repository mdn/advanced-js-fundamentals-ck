var dontClickMeButton = document.getElementById('dont-click-me');
var pleaseClickMeButton = document.getElementById('please-click-me');

dontClickMeButton.addEventListener('click', function fireAlert() {
  alert('I asked you very nicely not to click the button.');
});
