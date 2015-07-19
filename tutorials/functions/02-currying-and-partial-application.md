# Currying and Partial Application

## Partial Application

Partial application is a technique is a technique that allows us to pre-fill arguments to a function. Earlier, we discussed how you can use `bind()` on functions in JavaScript to explicit set the value of `this`. Like `call()`, `bind()` takes additional arguments and will set those arguments on the function it returns.

```js
function add(a, b) {
  return a + b;
}

var addTwo = add.bind(null, 2);

addTwo(4); // 6
```

The first argument is the value of `this` inside the function. We're not using `this`, so we'll just set it to `null`. The second argument, `2`, is applied as the first argument to `add`. All we have to do is supply the second argument and we're good to go.

This technique is allows us to remove repetition from our code and use functions as templates for other functions.

### Your Turn

Given the following base functions…

```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}
```

…can your use partial application to create the following:

* A function at adds 1 to a number
* A function to subtracts 3 from a number
* A function that doubles a number
* A function that halves a number

## Currying

<!-- WIP: I need to do a bit more research. -->
