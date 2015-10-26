var keyboard = document.getElementById('piano-keyboard');

keyboard.addEventListener('click', function (event) {
  var note = event.target.getAttribute('data-piano-key');
  playNote(note);
});
