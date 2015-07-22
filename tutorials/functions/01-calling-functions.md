# Functions

Functions in JavaScript are little units of code that can be executed later and reused as many times asyou want. If you've worked with JavaScript in the past, you've probably come across functions before, so in this section we'll skim the basics and look at more advanced function-related concepts to level up that basic knowledge.

Here is a simple example of a function that takes a single argument and logs a message to the console, just in case you are in the dark as to what a function looks like:

```js
function sayHello(name) {
    console.log('Hello, ' + name + '.');
}
```

## Defining functions

(Function declaration versus expressions)

## Invoking functions
Let's now take a look at the intricacies of function invocation.

### The differnce between calling functions and referencing functions

The easiest way to call a function is to append a pair of parentheses to the end of the name assigned to the function.

```js
function sayHello(name) {
    console.log('Hello!');
}

sayHello();
```

Functions are incredibly flexible in JavaScript. Not only can we call them like we did above — we can also pass them as arguments to other functions. We can also assign them to properties in objects as well as store them in variables. As a result, we need a way to talk about functions without accidentally calling them in the wrong place.

We can refer to a function without calling it by omitting the parentheses (you'll sometimes see the parentheses refferred to as the "function invocation operator").

```js
var myFavoriteFunction = sayHello;
```

In the first section of this content kit, we passed functions to methods on `Array.prototype`. It was the method's job to call this function on each member of the array. We _do not_ want to call it the function as we pass it to the method on `Array.prototype`.

We omit the parentheses in this context because we're referencing it, but not invoking it. For example:

```js
function doubleNumber(n) {
  return n * 2;
}

[1,2,3].map(doubleNumber);
```

If we did add the parentheses to `doubleNumber`, JavaScript would evaluate the function and place its return value as the argument being passed to `c`. It's also worth noting that if you do invoke the function without passing an argument, the function will attempt to multiply `undefined` by `2`. This will result in `NaN`, which stands for "not a number" and is also not a function that `Array.prototype.map` can call — as a result the browser will throw an error.

Consider the following:

```js
function returnSomething(something) {
  return something;
};

var result = returnSomething(2); // 2

var nothing = returnSomething(); // undefined

var reference = returnSomething; // reference points to the returnSomething function
reference(2); // 2
```

#### Your turn

* Write a new function called `doubleNumber` that takes a single argument and returns that argument multiplied by two.
* Pass the number two into the function and verify that it returns `4`.
* Store a reference to the `doubleNumber` function in a variable called `timesTwo`.
* Call the `timesTwo` function, passing in `2` as an argument
* Try `console.log(timesTwo.name)` and inspect the result

### Invoking functions

At this point we've explored one way of invoking a function — adding a pair of parentheses onto the end. In the section on Object-Oriented JavaScript, we also explored adding methods to an objects prototype. These methods — and the ones on `Array.prototype` — are just functions stored in object properties.

However, something special happens when we declare a function as property on a object.

```js
function logThis() {
  console.log(this);
}

logThis();

var someObject = {
  logThis: logThis
};

someObject.logThis();
```

Inside `someObject { ... }`, we declare a `logThis` property and make it equal to the `logThis` function from the beginning of the code sample. Note we are not using parentheses, as we want to make it equal to the function, not the result of the function call.

The first time we call `logThis()` (not the parenthese are included), we're in the global scope. In this case, `this` is logged as the `window` object in the browser (or `global` if you run this code in Node.)

The second time we call `logThis()`, it's in a different context — it's now a method of the `someObject` object. As a result, it logs `someObject` instead of `window`.

When functions are set as the values of object properties, they adapt to their new surroundings and set `this` to contain a reference to the object they're being called from.

#### Your Turn

Implement the following function:

```js
function logFoo() {
  console.log(this.foo);
}
```

* Create two objects: `bar` and `baz`.
* Set a `foo` property on each object to the value of your choice.
* Set a `log` property on each object with a reference to `logFoo`.
* Call `bar.log()` and `baz.log()` and notice the difference

### The call() and apply() functions

It's helpful that functions will adapt to their surroundings, but sometimes we need to be explicit about what we want `this` to be when we invoke a function.

Functions in JavaScript are objects and share methods on `Function.prototype`—just like all arrays share methods on `Array.prototype`.

One method all functions share is `call`, which uses the first argument you hand it and sets it to `this`, it then takes all subsequent arguments and passes them to the function you're calling `call` on. It basically provides a way to call any function on a specific function scope.

```js
function addToFoo(n) {
  return this.foo + n;
}

var bar = { foo: 1 };
var baz = { foo: 2 };

addToFoo(2); // tries add 2 to `undefined` and returns `NaN`
addToFoo.call(bar, 2); // adds 2 to the `foo` property on `bar` and returns 3
addToFoo.call(baz, 2); // adds 2 to the `foo` property on `bar` and returns 4
addToFoo.call({ foo: 3 }, 2); // adds 2 to the `foo` property on a new object
                         // and returns 5
```

The first argument when we use the `call` method is used to set `this`. The second argument is passed to the function we're calling as its first argument. If we had a third argument, it would be passed as the second argument to the function we're calling and so on.

`apply` is another method shared by all functions and it behaves in a very similar fashion to `call`, except that it takes the arguments you'd like to pass to the function as an array.

```js
function addThreeNumbersToFoo(first, second, third) {
  return this.foo + first + second + third;
}

var someObject = { foo: 1 };
var numbers = [2, 3, 4];

addThreeNumbersToFoo.apply(someObject, numbers); // returns 10
addThreeNumbersToFoo.apply({ foo: 1 }, [1, 1, 1]); // returns 4
```

On top of allowing you to explicitly set `this`, `apply` makes it easy to split up an array of arguments.

```js
function addThreeNumbers(first, second, third) {
  return first + second + third;
}

var numbers = [1, 2, 3];

addThreeNumbers.apply(null, numbers);
```

We used `null` in the example above because it doesn't matter what `this` is since we're not using it.

The following are all equivalent for the purposes of splitting up an array of values amongst a function's arguments:

```js
addThreeNumbers.apply(null, numbers);
addThreeNumbers.apply(this, numbers);
addThreeNumbers.apply('oogieboogie', numbers);
```

## Explicitly setting context with `bind()`

`call()` and `apply()` are great ways of explicitly setting `this` when we call a function. But sometimes, we want to set `this` when we define a function, not when we call it.

`call()` and `apply()` invoke the function immediately. `bind()` is different — it returns a copy of the function with `this` set explicitly that we can call later.

```js
function logFoo() {
  console.log(this.foo);
}

var someObject = { foo: 'Hello' };

logFoo(); // undefined
logFoo.call(someObject); // Hello

var boundLogFoo = logFoo.bind(someObject); // returns a new function with
                                           //`this` explicitly set

boundLogFoo(); // Hello
```

Let's take one more look at this with some objects.

```js
var fido = {
  name: 'Fido',
  sayHello: function () {
    console.log('My name is ' + this.name + '.');
  }
};

var spot = {
  name: 'Spot',
  sayHello: fido.sayHello,
  boundSayHello: fido.sayHello.bind(fido),
  anotherBoundSayHello: fido.sayHello.bind({ name: 'Taco' })
};

fido.sayHello(); // My name is Fido.
spot.sayHello(); // My name is Spot.
spot.boundSayHello(); // My name is Fido.
spot.anotherBoundSayHello(); // My name is Taco.
```

`bind` is useful when working with asynchronous JavaScript using callbacks or promises. When we make an AJAX request to a server, we typically pass a callback function that will execute when we hear back from the server. While, we're usually writing this function in context of the object we're working with. It will be executed in a totally different context.

Let's take a look at an example without any asynchronous callbacks:

```js
var person = {
  firstName: 'Steve',
  lastName: 'Kinney',
  updateName: function () {
    this.firstName = 'Wes'
  }
};

person.updateName();
console.log(person.firstName); // Wes
```

This works as we expect. When we call `updateName()`, `this` is still in the context of the `person` object.

Things get a little tricker when we call an asynchronous function (like an AJAX call) and pass a callback.

```js
function somethingAsynchronous(callback) {
  console.log('Maybe we\'re fetching the new name from the server.');
  setTimeout(callback, 1000);
};

var person = {
  firstName: 'Steve',
  lastName: 'Kinney',
  updateName: function () {
    somethingAsynchronous(function () {
      this.firstName = 'Wes'
    });
  }
};

person.updateName();
// Wait a second…
console.log(person.firstName); // This is still Steve.
console.log(window.firstName); // Wes. Whoops, we made a global variable.
```

Although we're writing our code in the context of the `person` object, that's not where it's getting called. It's getting called later on and our anonymous function — passed into `somethingAsynchronous()` as `callback` — doesn't have any context of where it came from, so `this` ends up being equal to `window`. The end result is that not only did we not update the property we wanted to, but we also accidentally set a global variable.

There are a few ways to handle this. While the callback loses its reference to `this`, it still has access to the scope that it came from. As a result, this will work:

```js
function somethingAsynchronous(callback) {
  console.log('Maybe we\'re fetching the new name from the server.');
  setTimeout(callback, 1000);
}

var person = {
  firstName: 'Steve',
  lastName: 'Kinney',
  updateName: function () {
    var self = this;
    somethingAsynchronous(function () {
      self.firstName = 'Wes'
    });
  }
};

person.updateName();
// Wait a second…
console.log(person.firstName); // This is now Wes.
```

`self` isn't a special keyword or anything — you can use anything you like. Other popular names to use are `_this` and `that`.

An alternate approach is to explicitly set the value of `this` on the callback function using `bind()`.

```js
function somethingAsynchronous(callback) {
  console.log('Maybe we\'re fetching the new name from the server.');
  setTimeout(callback, 1000);
}

var person = {
  firstName: 'Steve',
  lastName: 'Kinney',
  updateName: function () {
    somethingAsynchronous(function () {
      this.firstName = 'Wes'
    }.bind(this));
  }
};

person.updateName();
// Wait a second…
console.log(person.firstName); // Wes.
```

The example above works because we used `bind(this)` to explicitly set the value of `this` on the anonymous function while we're still in the scope of `person`. When the callback is eventually called, it remembers what `this` is because we bound it to the function.

## Recursion

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

### Your Turn
Now it's time to try writing some recursive examples of your own.

#### Countdown

Write a function called `countdown()`, which takes a number and counts down from the number passed in to `0` by recursively calling itself. If you called `countdown(4)`, it should `console.log(4)`, `console.log(3)`, `console.log(2)`,  `console.log(1)`, and—finally— `console.log(0)`.

#### Fibonacci Sequence

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
