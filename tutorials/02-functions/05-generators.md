# Generators

When we call a function in JavaScript, it typically runs until it hits the end of the function or a `return` statement. Generators, which are new to [ES6/2015][], are functions that can be paused and restarted again, and can return values at multiple points in their execution.

[ES6/2015]: http://es6-features.org/#GeneratorFunctionIteratorProtocol

Consider the `countdown()`, `fibonacci()`, and `factorial()` functions from the section on calling functions. We passed either a starting or stopping point to each function. Letting them run forever would be problematic. That said, it's conceivable to think that we might want to keep working with new factorials or numbers in a Fibonacci sequence as time goes on. This is a great use for generators.

**A note on browser support:** As of this writing (July 19, 2015) generator functions are supported by most of the recent versions of Chrome/Opera and Firefox as well as [io.js][]. They are not supported by Safari, Internet Explorer, or Node.js.

[io.js]:https://iojs.org/en/index.html

Generator functions look similar to regular functions, with the addition of an `*` after the `function` keyword.

```js
function* someGeneratorFunction() {};
```

Calling a generator function returns a _Generator_ object. Generator objects have a `next()` method that either starts or resumes execution of the function until it hits the next `yield` statement.

```js
function* addTwoThreeTimes(addend) {
  yield addend + 2;
  yield addend + 2 + 2;
  yield addend + 2 + 2 + 2;
};

var generator = addTwoThreeTimes(2);
```

We can now call the generator to get the next value.

```js
generator.next(); // { value: 4, done: false }
generator.next(); // { value: 6, done: false }
generator.next(); // { value: 8, done: false }
generator.next(); // { value: undefined, done: true }
```

Generators return an object with two properties, the `value` emitted by the current `yield` statement and a boolean signifying whether or not the generator has reached its completion. In the example above, we could continue calling `generator.next()` and we would keep receiving `{ value: undefined, done: true }`.

We can also iterate over all of the values in a generator:

```js
for (x of generator) { console.log(x); }; // Logs 2, 4, 6
```

We can also create a generator function that yields values indefinitely. Let's create a simple counter generator that will always generate the next increment indefinitely.

```js
function* counterGenerator(count) {
  while (true) {
    yield count++;
  }
};

var counter = counterGenerator(0);

counter.next() // { value: 0, done: false }
counter.next() // { value: 1, done: false }
counter.next() // { value: 2, done: false }
counter.next() // { value: 3, done: false }
counter.next() // { value: 4, done: false }
counter.next() // { value: 5, done: false }
counter.next() // { value: 6, done: false }
// … and so on …
```

Normally, `while (true)` would create an infinite loop and lock up the main thread indefinitely — bringing our program to a screeching halt. With a generator, the execution of the function is paused each time it hits the `yield` statement and control and ceded back to the scope in which it was called.

This generator will continue generating values forever, but only when asked.

## Code-Along: A Fibonacci Generator

Let's create a generator function that will build a Fibonacci sequence one number at a time.

Let's start by creating a new generator function called `fibonacciGenerator`:

```js
function* fibonacciGenerator() {};
```

Fibonacci sequences are best expressed as an array of numbers. Let's instantiate an empty array. That we'll use to store our values.

```js
function* fibonacciGenerator() {
  var sequence = [];
};
```

We also know that we'd like to generate Fibonacci numbers indefinitely. We'll wrap our yield statement in a loop.

```js
function* fibonacciGenerator() {
  var sequence = [];
  while (true) {
    yield sequence;
  }
};
```

We can generate new numbers by adding the previous two together. In order to do that, we'll have to add `1` to the sequence if we have less than two numbers.

```js
function* fibonacciGenerator() {
  var sequence = [];
  while (true) {
    if (sequence.length < 2) { sequence.push(1); }
    yield sequence;
  }
};
```

Now, it's time for the real work. If we have at least two numbers, we want to add the last two numbers together. Additionally, we're going to need the length of the sequence in multiple difference places, so we'll store it into a variable at the beginning of each loop.

```js
function* fibonacciGenerator() {
  var sequence = [];
  while (true) {
    var length = sequence.length;
    if (length < 2) {
      sequence.push(1);
    } else {
      var nextNumber = sequence[length - 1] + sequence[length - 2];
      sequence.push(nextNumber);
    }
    yield sequence;
  }
};
```

We can now take our fibonacci generator for a spin and generate numbers to our heart's content.

```js
var fibonacci = fibonacciGenerator();

fibonacci.next();
// { value: [ 1 ], done: false }
fibonacci.next();
// { value: [ 1, 1 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5, 8 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5, 8, 13 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5, 8, 13, 21 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5, 8, 13, 21, 34 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ], done: false }
fibonacci.next();
// { value: [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ], done: false }
```

## Your turn

Can you create a generator function that can generate factorials? Below is an example of how the code should work when you have it up and running.

```js
function* factorialGenerator() {
  // Your code goes here.
}

var factorial = factorialGenerator();

factorial.next().value; // 1
factorial.next().value; // 3
factorial.next().value; // 6
factorial.next().value; // 24
factorial.next().value; // 120
```
