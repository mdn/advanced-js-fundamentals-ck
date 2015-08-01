# Recursion

A recursive function is a function that calls itself. It's not uncommon to use a recursive function to solve a factorial.

The factorial `5!` is equivalent to `5 * 4 * 3 * 2 * 1` or 120.

```js
function factorial(n) {
  if (n <= 1) { return 1 };
  return n * factorial(n - 1);
}

factorial(5); // 120
```

The function above goes through the following steps:

* We pass in `5`
* `5` is not less than or equal to `1`; move on
* Return `5` times `factorial(n - 1)`, which is `factorial(4)`
* Evaluate `factorial(4)` before returning from the function
  * `4` is not less than or equal to `1`; move on
  * Return `4` times `factorial(n - 1)`, which is `factorial(3)`
  * Evaluate `factorial(3)` before returning from the function
    * `3` is not less than or equal to `1`; move on
    * Return `3` times `factorial(n - 1)`, which is `factorial(2)`
    * Evaluate `factorial(2)` before returning from the function
      * `2` is not less than or equal to `1`; move on
      * Return `2` times `factorial(n - 1)`, which is `factorial(1)`
      * Evaluate `factorial(1)` before returning from the function
        * `1` is less than or equal to `1`; return `1`
      * We now know that `factorial(1)` is `1`, return `2 * 1` or `2`
    * `factorial(2)` just returned `2`; return `3 * 2` or `6`
  * `factorial(3)` just returned `6`; return `4 * 6` or `24`
* `factorial(4)` just returned `24`; return `5 * 24` or `120`

It's important to have an escape hatch for your recursive function. Otherwise, it will go on forever — actually, you'll exceed the maximum size of the call stack and be cut off by the JavaScript runtime.

We used recursion in the section where we drew blocks to the canvas using `requestAnimationFrame()`. At the end of the function, we called `requestAnimationFrame()` again with a reference to the same `gameLoop()` function.

```js
requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function (block) { block.draw().move(); });
  requestAnimationFrame(gameLoop); // Recursion!
});
```

## Function declarations, function expressions, and recursion

Declared functions have a `name` property that is availably internally to the function. Function expressions stored in variables are anonymous. Instead, we use a variable to refer to them. JavaScript will look at the right side of a an assignment (anytime we use the `=` operator) before storing it into a variable. This means that the function itself has no way of knowing what variable it will be assigned to and—as a result—has to no way of referring to itself recursively.

```js
function logYourselfDeclaration() {
  console.log(typeof logYourselfDeclaration);
}

var logYourselfExpression = function () {
  console.log(typeof logYourselfExpression);
}

logYourselfDeclaration(); // "function"
logYourselfExpression(); // "undefined"

console.log(logYourselfDeclaration.name); // "logYourselfDeclaration"
console.log(logYourselfExpression.name); // ""
```

We cannot use function expressions recursively because they do not have a reference to themselves.

## Your turn
Now it's time to try writing some recursive examples of your own.

## Countdown

Write a function called `countdown()`, which takes a number and counts down from the number passed in to `0` by recursively calling itself. If you called `countdown(4)`, it should `console.log(4)`, `console.log(3)`, `console.log(2)`,  `console.log(1)`, and—finally— `console.log(0)`.

## Fibonacci Sequence

A Fibonacci sequence is a series of numbers where the next number is the sum of the previous two — starting with 1, 1. Here is a short example:

```
1, 1, 2, 3, 5, 8, 13, 21, 34, 55
```

Can you write a function called `fibonacci()`, which takes a number as an argument and returns an array containing a Fibonacci sequence of that length?

```js
fibonacci(5); // returns [1, 1, 2, 3, 5]
fibonacci(3); // returns [1, 1, 2]
fibonacci(10); // returns [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```
