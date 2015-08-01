# Events

Events are happening all the time in the browser. When the browser has finished loading the page, an event is fired. Every time the user moves their mouse, hoves over an element, clicks or taps, submits a form, presses down on a key or takes their finger off — an event is fired. Some of these events are meaningful (e.g. the user clicks on a hyperlink), but many go by completely unnoticed.

It is, however, possible for us to use JavaScript to set up listeners for events that interest us. Our listeners wait patiently on a DOM node until the event their waiting for is fired. Then, they spring into action.

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

## Your turn

In `demos/events/01-basic-events`, you have an `index.html` file with two buttons. In `script.js` we have an event listener on the button with the `id` of `dont-click-me`.
