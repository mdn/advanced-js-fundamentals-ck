# Recursion

A recursive function is a function that calls itself. Recursion is especially useful when dealing with tree structures. It's commonly used for traversing filesystems, crawling web pages, solving games, and sorting data. It's also useful for certain types of math problems, such as computing a factorial.

The factorial `5!` is equivalent to `5 * 4 * 3 * 2 * 1` or 120.

```javascript
function factorial(n) {
  if (n <= 1) {
    return 1;
  };
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

It's important to have an escape hatch for your recursive function, otherwise it will go on forever — actually, you'll exceed the maximum size of the call stack and be cut off by the JavaScript runtime. Unfortunately with a recursive function like the one above you may exceed the maximum size of the call stack even if you have an escape hatch. If you try `factorial(40000)` in many environments you'll get "RangeError: Maximum call stack size exceeded".

The good news is that JavaScript is getting an upgrade to deal with this problem. EcmaScript 6 will have "tail call optimization", which means that as long as the last thing a function does before returning isn't calling itself, it can be automatically optimized by the interpreter. To make use of this feature we'd rewrite the previous example as follows:

```js
function factorial(n) {
    function recur(n, acc) {
        if (n <= 1) {
            return acc;
        } else {
            return recur(n-1, n*acc);
        }
    }
    return recur(n, 1);
}

factorial(40000); //Still an error now, will work later
```

Until JavaScript engines implement tail call optimization, if you have a recursive function which may make lots of nested calls you'll need to use a technique called trampolining. Trampolining basically turns a recursive function into a loop which iteratively calls a function and feeds back in the result until a function isn't returned.

We used recursion in the [section where we drew blocks to the canvas][requestAnimationFrame Section] using `requestAnimationFrame()`. At the end of the function, we called `requestAnimationFrame()` again with a reference to the same `gameLoop()` function.

[requestAnimationFrame Section]: https://github.com/mdn/advanced-js-fundamentals-ck/blob/gh-pages/tutorials%2F03-object-oriented-javascript%2F03-canvas-and-object-oriented-javascript.md#requestanimationframe

```javascript
requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function (block) { block.draw().move(); });
  requestAnimationFrame(gameLoop); // Recursion!
});
```

## Your turn
Now it's time to try writing some recursive examples of your own.

### Countdown

Write a function called `countdown()`, which takes a number and counts down from the number passed in to `0` by recursively calling itself. If you called `countdown(4)`, it should `console.log(4)`, `console.log(3)`, `console.log(2)`,  `console.log(1)`, and—finally— `console.log(0)`.

### Fibonacci Sequence

A Fibonacci sequence is a series of numbers where the next number is the sum of the previous two — starting with 1, 1. Here is a short example:

```
1, 1, 2, 3, 5, 8, 13, 21, 34, 55
```

Can you write a function called `fibonacci()`, which takes a number as an argument and returns an array containing a Fibonacci sequence of that length?

```javascript
fibonacci(5);  // returns [1, 1, 2, 3, 5]
fibonacci(3);  // returns [1, 1, 2]
fibonacci(10); // returns [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

### Sorting

Write a recursive function called `sort()` to sort an array of numbers. I recommend using the  [Quicksort](https://en.wikipedia.org/wiki/Quicksort) algorithm, though any recursive algorithm you come up with is good.

```js
var randomNumbers = [1, 13, 55, 1, 8, 5, 34, 21, 2, 3];
sort(randomNumbers); //[1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```
