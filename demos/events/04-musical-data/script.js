var pianoKeys = document.querySelectorAll('.piano-key');

for (var i = 0; i < pianoKeys.length; i++) {
  pianoKeys[i].addEventListener('click', function (event) {
    playNote(this.attributes['data-piano-key']);
  });
}
