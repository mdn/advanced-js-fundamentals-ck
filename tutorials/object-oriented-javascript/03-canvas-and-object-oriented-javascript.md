# HTML5 Canvas and Object-Oriented JavaScript

Modern browsers include the [HTML5 Canvas API][canvas], which allows us to draw graphics with JavaScript.

[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

## Canvas Basics

This section is not intended to be an full tutorial on the basics of working with the Canvas API. Rather, it will be just enough to help us get by. We can easily add a `<canvas>` element to our HTML by doing the following:

```html
<canvas id="game" width="400px" height="300px"></canvas>
```

This will create a canvas element that is 400 pixels wide and 300 pixels high. Next, we'll need to get a hold of our new canvas element. Additionally, The Canvas API supports a number of different _contexts_ for drawing on it. We'll be using the two-dimension context.

```js
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
```

The `canvas` variable holds some important information like the width and the height of the canvas element, but we'll doing all of our drawing in with `context` object.

The `context` gives us a number of methods for drawing on our canvas. We'll start with `fillRect`, which creates a rectangle filled by a color—black, by default.

`context.fillRect` takes four arguments: `x`, `y`, `width`, and `height.`

Let's start by drawing a small, square alien to our canvas. A workspace has been set up for you in `demos/canvas-aliens`.

```js
context.fillRect(50, 50, 10, 10);
```

This will draw a 10 pixel by 10 pixel square located 50 pixels from the top-left corner of the canvas. Congratulations, you're an web artist now.

### Animating Canvas

We might be tempted to try something like `setTimeout`. The issue with `setTimeout` is that it doesn't guarantee accuracy. Let's consider the following:

```js
setTimeout(function () {
  console.log('Welcome to the future.');
}, 1000)
```

Schedules a the callback 1000 miliseconds (one second) in the future. Unfortunately, JavaScript can't—or won't, at least—make us any promises that this function will be called in one second. Instead, we're promised that it will be at least one second before the browser will try to call the function.
