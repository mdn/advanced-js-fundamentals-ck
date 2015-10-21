var addNewButton = document.querySelector('.add-new');
var buttons = document.querySelectorAll('.parent .button');
var buttonDiv = document.querySelector('.parent');

// Add a new button to the page whenever the "Add a new button below." button
// is pressed.

addNewButton.addEventListener('click', function () {
  var newButton = document.createElement('button');
  newButton.className = 'button';
  newButton.textContent = "New click me button!";
  buttonDiv.appendChild(newButton);
});

// Bind an event to all of the "Click me!" buttons that shows an alert.

function showAlert() {
  alert('You clicked me!');
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', showAlert);
}
