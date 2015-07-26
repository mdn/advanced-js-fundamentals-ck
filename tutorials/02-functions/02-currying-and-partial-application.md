# Currying and partial application

## Partial application

Partial application is a technique that allows us to pre-fill arguments to a function. Earlier, we discussed how you can use `bind()` on functions in JavaScript to explicitly set the value of `this`. Like `call()`, `bind()` takes additional arguments and will set those arguments on the function it returns.

```js
function add(a, b) {
  return a + b;
}

var addTwo = add.bind(null, 2);

addTwo(4); // 6
```

The first argument is the value of `this` inside the function. We're not using `this`, so we'll just set it to `null`. In the same fashion as `call()`, the second argument, `2`, is applied as the first argument to `add`. All we have to do is supply the second argument and we're good to go.

This technique allows us to remove repetition from our code and use functions as templates for other functions.

### Your turn

Given the following base functions:

```js
function add(a, b) {
  return a + b;
};

function multiply(a, b) {
  return a * b;
};
```

Use partial application to create the following:

* A function that adds 1 to a number
* A function that subtracts 3 from a number
* A function that doubles a number
* A function that halves a number

## Currying

[Currying][] is a technique—similar to partial application named after the famous mathematician, [Haskell Curry][hc]—for whom the [Haskell][] programming language is also named. With partial application, we took an existing function and returned a new function with one or more of the arguments applied. With function currying we apply each argument one at a time, returning a new function in the currying chain until all the arguments have been supplied.

[Currying]: https://en.wikipedia.org/wiki/Currying
[hc]: https://en.wikipedia.org/wiki/Haskell_Curry
[haskell]: https://www.haskell.org

A curried function is one that returns a new function for every argument that it takes. Consider our `addThreeNumbers` function from an earlier section:

```js
function addThreeNumbers(first, second, third) {
  return first + second + third;
}

addThreeNumbers(1, 2, 3); // returns 6
```

To rewrite this function as a curried function, we need to have it return a new function for each argument.

```js
function curriedAddThreeNumbers(first) {
  return function (second) {
    return function (third) {
      return
    }
  }
}

curriedAddThreeNumbers(1)(2)(3); // returns 6
```

Let's break that out in order to getting a better sense of what's happening.

```js
var firstArgumentApplied = curriedAddThreeNumbers(1); // returns a function
var secondArgumentApplied = firstArgumentApplied(2); // returns a function
var thirdArgumentApplied = secondArgumentApplied(3); // returns 6
```

### DRYing our code with curried functions

There is a principle in programming called "Don't Repeat Yourself" (DRY). If you find yourself writing the same code over and over again, then your code isn't DRY. Consider the following.

```js
function wrapInParagraphTags(body) {
  return '<p>' + body + '</p>';
}

function wrapInHeaderTags(body) {
  return '<h1>' + body + '</h1>';
}

function wrapInListItemTags(body) {
  return '<h1>' + body + '</h1>';
}
```

This example is deliberately simple, but it illustrates the idea of repetitive code. It's fair to assume that we continued down this path, we'd end up with more than three functions.

Let's say we wanted to change this code to include a `class` attribute for each tag. We would have to update each function individually and each time we updated a function we would run the risk of making a mistake and introducing a bug into our code.

```js
function createCurriendWrapper(tagName) {
  return function (body) {
    return '<' + tagName + '>' + body + '</' + tagName + '>';
  };
}

var wrapInParagraphTags = createCurriendWrapper('p');
var wrapInHeaderTags = createCurriendWrapper('h1');
var wrapInListItemTags = createCurriendWrapper('li');

var h2 = createCurriendWrapper('h2')('Hello world');
```

Now, if we needed to change the basic implementation of wrapping strings in HTML tags, we could make our changes in one place, `createCurriendWrapper`, which is the foundation for all of our specialized wrapping functions.

### Your turn

You've been asked to create a custom logger for a major software project. The initial specifications include two functions `dangerLog` and `successLog`, but the roadmap includes no less than 42 different logger functions.

* Implement a `dangerLog` function that takes a message and prefixes it with `DANGER:`.
* Implement a `successLog` function that takes a message and prefixes it with `SUCCESS:`.

Can you you implement the above twice—once using partial application and once using function currying?
