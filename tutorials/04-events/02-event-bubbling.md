# Event Bubbling
Now we've covered the very basics of events, let's turn our attention to event bubbling, which refers to the ability of events set on DOM nodes to "bubble up" and also apply to children of those nodes. We'll start with a quick experiment. 

## Experiment

In `demos/events/02-bubbling`, we have three nested HTML elements in `index.html`:

```html
<div class="grandparent">
  <div class="parent">
    <button class="button" id="click-me">Click me!</button>
  </div>
</div>
```

Try the following:

* Add a click event to the button, that logs the element that was clicked on using `this`.
* Move the event listener to the `.parent` element. What is the result when you click on the button?
* Move the event listener from the first step to the `.grandparent` element.
  * What is the result when you click on the button?
  * What is is the result when you click the `.parent` element?

## Discussion

You may have noticed that the event listeners on a parent element are fired whenever the action occurs on one of its children.

When an event occurs, the browser checks the element to see if there are any event listeners registered. After it checks the element where the event occured, the browser works its way up the DOM tree to see if any of the parents have a listener registered, then grandparents, and so on. It checks every element all the way up to the root. This process is known as _event bubbling_.

Try out the following code in `demos/events/02-bubbling/script.js`:

```js
document.querySelector('.grandparent').addEventListener('click', function (event) {
  console.log('Grandparent');
});

document.querySelector('.parent').addEventListener('click', function (event) {
  console.log('Parent');
});

document.querySelector('#click-me').addEventListener('click', function (event) {
  console.log('Button');
});
```

If you click on the button, you'll see that the events all bubbles up through the `.parent` and `.grandparent` elements — this provides a more explicit proof than the solutions you may come up with for the previous question.

### The Event Object

The anonymous function passed to `document.addEventListener()` takes an optional argument, which it assigns an `Event` object to. In the case of the click event we've been using as an example, this is a `MouseEvent`. You can visit [the MDN page for `Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) to explore the full list of supported event types.

Each type of event supports a number of different properties. `MouseEvent`s contains information about the `x` and `y` coordinates where the mouse was clicked. `KeyboardEvent` has information about which key was pressed. The `currentTarget` property on the `Event` object can be useful during the event bubbling phase.

Let's make some changes to the code from earlier. Instead of logging a description of each element where an event was triggered, either by a click or through event bubbling, let's log the `target` of the event.

```js
document.querySelector('.grandparent').addEventListener('click', function (event) {
  console.log(event.target);
});

document.querySelector('.parent').addEventListener('click', function (event) {
  console.log(event.target);
});

document.querySelector('#click-me').addEventListener('click', function (event) {
  console.log(event.target);
});
```

#### Your Turn

Modify the code above to log the event itself (as opposed to the `target` property on the event). What other properties on the event object look particularly useful?
