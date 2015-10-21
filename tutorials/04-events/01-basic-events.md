# Event basics

Events are happening all the time in the browser. When the browser has finished loading the page, an event is fired. Every time the user moves their mouse, hovers over an element, clicks or taps, submits a form, presses down on a key or takes their finger off that key — an event is fired. Some of these events are very easy to spot when they occur (e.g. the user clicks on a hyperlink), but many go by completely unnoticed.

It is, however, possible for us to use JavaScript to set up listeners for events that interest us. Our listeners wait patiently on a DOM node until the event they're waiting for is fired. Then, they spring into action, running an appropriate function to respond to the event as required, or whatever else you deem appropriate.

## Finding DOM Nodes

Before we can add an event listener to a DOM node, we have to get our hands on it. We've touched briefly on this in the past, but now it's time to go a little deeper. Consider the following markup:

```html
<div id="important-information">
  <p class="heading">Lorem ipsum…</p>
  <p>Lorem ipsum…</p>
</div>
```

In the browser, the `document` object has a number of useful methods for finding DOM nodes. We're only going to touch on a few:

* `document.getElementById()`
* `document.getElementsByClassName()`
* `document.getElementsByTagName()`
* `document.querySelector()`
* `document.querySelectorAll()`

The first three should be pretty straightforward, but let's give them their due diligence. `document.getElementById()` will find a single element with a given `id`. You should not have more than one element with the same `id`. The method returns a `Node` from the DOM.

```js
document.getElementById('important-information');
// returns the Node with the id of 'important-information'
```

Notice the pluralization of the word "elements" in `document.getElementsByClassName()` and `document.getElementsByTagName()`. These methods return a `NodeList` of elements for a given class name or tag respectively. `NodeList` is a collection of `Node`s. `NodeList` does _not_ inherit from `Array.prototype`, which means you cannot use any of the methods from `Array.prototype` unless you first convert it into an array. You can however index it using square brackets and iterate over it using a `for` loop.

```js
document.getElementsByClassName('heading');
// returns a NodeList with just the paragraph with the class of "heading"

document.getElementsByTagName('p');
// returns a NodeList of all of the paragraph elements
```

In modern browsers, we have two additional ways of finding nodes in the DOM. `document.querySelector()` and `document.querySelectorAll()` use CSS selectors to locate a node or set of nodes. `document.querySelector()` returns a single `Node`. `document.querySelectorAll()` returns a `NodeList` of all of the nodes matching that CSS selector.

```js
document.querySelector('#important-information');
// returns the Node with the id of 'important-information'

document.querySelector('p');
// returns the first paragraph Node in the page

document.querySelector('.heading');
// returns the first Node with the class "paragraph" in the page

document.querySelectorAll('p');
// returns a NodeList of all of the paragraph elements

document.querySelectorAll('.heading');
// returns a NodeList with just the paragraph with the class of "heading"
```

`document.querySelector()` and `document.querySelectorAll()` support all of the CSS3 selectors. You can use advanced selectors to locate the particular `Node` you're looking for. For more on CSS selectors, visit the Mozilla Developer Network entry on [selectors][mdn-selectors].

[mdn-selectors]: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors

### Adding an Event Listener

Now that we've found an element, we can add a listener. `Node`s have methods for attaching event listeners to them as well as removing them. Let's take a look.

```js
// Imagine that we have a button with an id of "click-me"
var clickMeButton = document.getElementById('click-me');

clickMeButton.addEventListener('click', function () {
  console.log('You clicked me!');
});
```

`addEventListener` takes two arguments: the type of event you're listening for and a function you'd like to run when the event occurs. Here is a list of some common events:

* `click`
* `dblclick`
* `focus` (occurs when the user focuses an input element)
* `blur` (occurs when the user leaves an input element; in other words, the element loses focus)
* `change` (occurs when the user leaves an input element after changing its value)
* `keydown` (occurs when a user presses down on a key)
* `keyup` (occurs when a user releases a key)
* `mouseenter` (occurs when the user's mouse enters a given element, or in other words, hovers over it)
* `mouseleave` (occurs when the user's mouse leaves a given element, or stops hovering over it)

You can find a much more in depth list at [MDN](https://developer.mozilla.org/en-US/docs/Web/Events).

### `this` in Event Listeners

The mechanism that calls your event listener sets `this` to the `Node` where the event occured using `Function.prototype.call`. At first, this seems like an additional thing to remember, but it's useful for referencing the element where the event occured.

```js
var clickMeButton = document.getElementById('click-me');

clickMeButton.addEventListener('click', function () {
  console.log(this); // Logs the button that was clicked on.
});
```

## Your turn

In `demos/events/01-basic-events`, you have an `index.html` file with two buttons. In `script.js` we have an event listener on the button with the `id` of `dont-click-me`.

* Add an event listener to the button with the `id` of `please-click-me`.
* Refactor the `document.getElementById()` calls for `document.querySelector()` (remember, you'll need the `#` for the CSS selector).
* Add an event listener to both buttons (find them both using either `document.getElementyByTagName()` or `document.querySelectorAll()`) that logs the button that was clicked to the console.
