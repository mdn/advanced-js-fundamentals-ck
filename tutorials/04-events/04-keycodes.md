# Responding to Keyboard Events

In the last section, we learned how to respond to click events elements in the DOM. Listening for keyboard events is a relatively similar affair. Let's say we wanted to fire an event every time a user enters a key into an input field. This could be useful if we were implementing a fuzzy search that updated the results as we entered in our query.

```js
var inputElement = document.querySelector('#fuzzy-search-input');

inputElement.addEventListener('keyup', function (event) {
  // The logic for implementing a fuzzy search goes here.
});
```

Mouse movements and clicks fire `MouseEvent`s. Key presses fire `KeyboardEvent`s. Both inherit from the `Event` object, but have some additonal properties. `KeyboardEvent`s are commonly created when one of the following user actions occurs:

* `keydown` occurs when a user presses a key.
* `keyup` occurs when a user releases a key.
* `keypress` occurs when a user presses and releases a key.

A combination of the events — depending on the users platform — above will occur when a key is held down. For more informaiton, please visit [the section on auto-repeat handling on the MDN page for `KeyboardEvent`][autorepeat].

[autorepeat]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Auto-repeat_handling

### Quick Experiment

Go to `demos/events/04-keycodes` and add a `keyup` listener to the `document` that logs the `event`. How do the properties of this event differ from `MouseEvent`?

## Key Codes

The properties on the `KeyboardEvent` object vary from browser to browser. If you hit the down key in Firefox, you'll see that there is a `key` property with the value of `ArrowDown`. In Chrome and Safari, on the other hand, there is no `key` property. There is, however, a `keyIdentifier` property, which has a value of `Down` when he hit the down arrow.

We can, however, rely on the trusty `keyCode` property, which is consistent across browsers and returns a number based on the key that was pressed.

Let's modify that code from our previous experiment to log the keycode for any key.

```js
document.addEventListener('keydown', function (event) {
  console.log(event.keyCode);
});
```

What are the key codes for the four arrow keys? Write them down as we'll be using them shortly.

## Your Turn

In `demos/events/04-keycodes`, we have a block object with some properties and a `requestAnimationFrame` loop that renders the current state of the block.

Modify the event listener to move adjust the `x` and `y` properties of the box on `keydown`.

* When the user presses the up arrow, the event listener should decrease the `y` property of the `block` by 1.
* When the user presses the down arrow, the event listener should increase the `y` property of the `block` by 1.
* When the user presses the left arrow, the event listener should decrease the `x` property of the `block` by 1.
* When the user presses the right arrow, the event listener should increase the `x` property of the `block` by 1.

# Responding to Keyboard Events

In the last section, we learned how to respond to click events elements in the DOM. Listening for keyboard events is a relatively similar affair. Let's say we want to fire an event every time a user enters a key into an input field. This could be useful if we were implementing a fuzzy search that updated the results as we entered in our query.

```js
var inputElement = document.querySelector('#fuzzy-search-input');

inputElement.addEventListener('keyup', function (event) {
  // The logic for implementing a fuzzy search goes here.
});
```

Mouse movements and clicks fire `MouseEvent`s. Key presses fire `KeyboardEvent`s. Both inherit from `Event`, but have some additonal properties. `KeyboardEvent`s are commonly created when one of the following user actions occurs:

* `keydown` occurs when a user presses a key
* `keyup` occurs when a user releases a key
* `keypress` occurs when a user presses and releases a key

A combination of the events — depending on the users platform — above will occur when a key is held down. For more informaiton, please visit [the section on auto-repeat handling on the MDN page for `KeyboardEvent`][autorepeat].

[autorepeat]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Auto-repeat_handling

### Quick Experiment

Go to `demos/events/04-keycodes` and add an `keyup` listener to the `document` that logs the `event`. What are some properties that different from what we saw earlier with `MouseEvent`?

## Key Codes

The properties on `KeyboardEvent` vary from browser to browser. If you hit the down key in Firefox, you'll see that there is a `key` property with the value of `ArrowDown`. In Chrome and Safari, on the other hand, there is no `key` property. There is, however, a `keyIdentifier` property, which has a value of `Down` when he hit the down arrow.

We can, however, rely on the trusty `keyCode` property, which is consistent across browsers and returns a number based on the key that was pressed.

Let's modify that code from our previous experiment to log the keycode for any key.

```js
document.addEventListener('keydown', function (event) {
  console.log(event.keyCode);
});
```

What are the key codes for the four arrow keys? Write them down as we'll be using them shortly.

## Your Turn

In `demos/events/04-keycodes`, we have a block object with some properties and a `requestAnimationFrame` loop that renders the current state of the block.

Modify the event listener to move adjust the `x` and `y` properties of the box on `keydown`.

* When the user presses the up arrow, the event listener should decrease the `y` property of the `block` by 1.
* When the user presses the down arrow, the event listener should increase the `y` property of the `block` by 1.
* When the user presses the left arrow, the event listener should decrease the `x` property of the `block` by 1.
* When the user presses the right arrow, the event listener should increase the `x` property of the `block` by 1.
