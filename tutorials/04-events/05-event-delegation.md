# Event Delegation

If you look at `demos/events/06-musical-data`, we iterated over all of the elements with the class of `.piano-key` and added an event listener to each of them.

```js
var pianoKeys = document.querySelectorAll('.piano-key');

for (var i = 0; i < pianoKeys.length; i++) {

  pianoKeys[i].addEventListener('click', function (event) {
    var note = this.getAttribute('data-piano-key');
    playNote(note);
  });

}
```

This works, but it involves adding twelve very similar functions as event listeners to twelve very similar elements. In the section on partial application and function currying, we talked a bit about avoiding repetition in our code using the "Don't Repeat Yourself" (DRY) principle.

The loop isn't adding a lot of repetition in our code. But when the code executes, it will do the same thing multiple times. With twelve elements, this isn't a big deal. But what if we wanted to have thousands of keys on our piano? This approach would start to have a performance impact.

As a alternative, we can use a technique called _event delegation_. Event delegation relies on the fact that events bubble up—as we discussed earlier. Many event objects have a `target` property with a reference to the element where the event occurred.

With event delegation, we add a single event listener to a parent element and then inspect the `target` property on the event to see which element in particular triggered the event. Let's take a look at how we can refactor the code above to leverage event delegation.


```js
var keyboard = document.getElementById('piano-keyboard');

keyboard.addEventListener('click', function (event) {
  var note = event.target.getAttribute('data-piano-key');
  playNote(note);
});
```

This code looks similar to the example above, with some important differences:

* We are only binding one event listener whether we stick with the 12 keys we have now or decide to expand to 12,000.
* We won't have to add new listeners if we add additional keys to the keyboard.
* We won't have to remove listeners if we remove keys from the keyboard to prevent memory leaks.

Event delegation does have some edge cases. There are some potential issues that you should be mindful of:

* Not all events bubble. `blur`, `focus`, `load` and `unload` do _not_ bubble.
* Events that fire _too often_ (e.g. `mousemove`) might cause a performance bottleneck.

## Your Turn

Look at the code in `demos/events/05-delegation`. Add an event listener to the `<div>` with the class of "container". The event listener should look at the `target` property of the event to see which button was clicked. Change the text of the button that was clicked from "Click me!" to "I was clicked!".
