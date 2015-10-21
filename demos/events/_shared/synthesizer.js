if (window.AudioContext) {
  context = new window.AudioContext();
} else if (window.webkitAudioContext) {
  context = new window.webkitAudioContext();
} else {
  throw new Error('The Web Audio API is not supported in this browser.');
}

var oscillators = {};

function Oscillator(frequency) {
  var destination = context.destination;

  var oscillator = this.oscillator = context.createOscillator();
  var gain = context.createGain();
  var volume = this.volume = gain.gain;

  oscillator.frequency.value = frequency;
  volume.value = 0;

  oscillator.connect(gain);
  gain.connect(destination);

  oscillator.start(0);
}

Oscillator.prototype.start = function () {
  this.volume.value = 1;
}

Oscillator.prototype.stop = function () {
  this.volume.value = 0;
}

Oscillator.forNote = function (note) {
  var frequency = new Octavian.Note(note).frequency;
  if (!oscillators[frequency]) {
    oscillators[frequency] = new Oscillator(frequency);
  }
  return oscillators[frequency];
}

function playNote(note) {
  var oscillator = Oscillator.forNote(note);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, 250)
}
