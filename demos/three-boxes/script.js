// Each box has a class of .box
// The red box has an ID of #red and classes of .super and .cool
// The green box has an ID of #green and classes of .super and .awesome
// The blue box has an ID of #blue and classes of .awesome and .cool

// The first button has an ID of #button1
// The second button has an ID of #button2
// The third button has an ID of #button3

// Some events to try:
// - hide()
// - show()
// - toggle()
// - slideUp()
// - slideDown()
// - slideToggle()
// - fadeIn()
// - fadeOut()
// - fadeToggle()

// Here is an example for you to mess around with.

$('#button1').on('click', function () {
  $('#red').fadeToggle();
});
