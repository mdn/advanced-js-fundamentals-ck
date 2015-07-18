# Functions

<!--

OUTLINE

* Brief introduction
* `this`
* Calling functions
  * Referencing versus calling
  * The regular way
  * `call`
  * `apply`
  * `bind`
* Arguments
  * Optional arguments
  * The `arguments` object
* Recursion
* Currying, partial application
* Closures
* Generators

-->

Functions in JavaScript are little units of code that can be executed later. If you've worked with JavaScript in the past, you've probably come cross functions before.

Here is a simple example of a function that takes a single argument and logs a message to the console:

```js
function sayHello(name) {
    console.log('Hello, ' + name + '.');
}
```

## Defining Functions

(Function declaration versus expressions)

## Invoking Functions

### Calling Functions, Referencing Functions, and the Difference

The easiest way to call a function is to append a pair of parentheses to the end of the name assigned to the function.

```js
function sayHello(name) {
    console.log('Hello!');
}

sayHello();
```

Functions are incredibly flexible in JavaScript. Not only can we call them like we did above, we can also pass them as arguments to other functions. We can also assign them to properties in objects as well as store them in variables. As a result, we need a way to talk about functions without accidentally calling them.

We can refer to a function without calling it by omitting the parentheses.

```js
var myFavoriteFunction = sayHello;
```

In the first section of this content kit, we passed functions to methods on `Array.prototype`. It was the method's job to call this function on each member of the array. We _do not_ want to call it the function as we pass it to the method on `Array.prototype`.

We omit the parentheses, because we're talking about the function, not invoking.

```js
function doubleNumber(n) {
  return n * 2;
};

[1,2,3].map(doubleNumber);
```

If we did add the parentheses to `doubleNumber`, JavaScript would evaluate the function and place it's return value as the argument being passed to `c`. Without an argument, the function will attempt to multiply `undefined` by `2`. This will result in `NaN`, which stands for "not a number" and is also not a function that `Array.prototype.map` can call. An error will be thrown.

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

#### Your Turn

* Write a new function called `doubleNumber` that takes a single argument and returns that argument multiplied by two.
* Pass the number two into the function and verify that it returns `2`.
* Store a reference to the `doubleNumber` function in a variable called `timesTwo`.
* Call the `timesTwo` function, passing in `2` as an argument
* Try `console.log(timesTwo.name)` and inspect the result

### Invoking Functions

We've explored on way of invoking a function—adding a pair of parentheses onto the end. In the section on Object-Oriented JavaScript, we also explored adding methods to an objects prototype. These methods—and the ones on `Array.prototype`—are just functions stored in object properties.

But, something special happens when we declare a function as property on a object.

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

In `someObject`, the first time we say `logThis`, we're defining a property on the object. The second time, we're providing a reference to the `logThis` function in the very beginning of the code sample.

The first time we call `logThis`, we're in the global scope. `this` is the `window` object in the browser and `global` in Node.

The second time we call `logThis`, it's in a different context—`someObject`. As a result, it logs `someObject` instead of `window` or `global`.

When functions are called in the context of properties on an object, it adapts to its new surroundings and sets `this` to a reference of the object it's being called from.

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

### Call and Apply

It's helpful that functions will adapt to their surroundings, but sometimes we need to be explicit about what we want `this` to be when we invoke a function.

Functions in JavaScript are objects and share methods on `Function.prototype`—just like all arrays share methods on `Array.prototype`.

One method all functions share is `call`, which uses the first argument you hand it and sets it to `this`, it then takes all subsequent arguments and passes them to the function you're calling `call` on.

```js
function addToFoo(n) {
  return this.foo + n;
}

var bar = { foo: 1 };
var baz = { foo: 2 };

addToFoo(); // tries add 2 to `undefined` and returns `NaN`
addToFoo.call(bar, 2); // adds 2 to the `foo` property on `bar` and returns 3
addToFoo.call(baz, 2); // adds 2 to the `foo` property on `bar` and returns 4
addToFoo.call({ foo: 3 }, 2); // adds 2 to the `foo` property on a new object
                         // and returns 5
```

The first argument when we use the `call` method is used to set `this`. The second argument is passed to function we're calling as the first argument. If we had a third argument, it would be passed as the second argument to the function we're calling and so on.

`apply` is another method shared by all functions and it behaves in a very similar fashion to `call`, but it takes the arguments you'd like to pass to the function as an array.

```js
function addThreeNumbersToFoo(first, second, third) {
  return this.foo + first + second + third;
}

var someObject = { foo: 1 };
var numbers = [2, 3, 4];

addThreeNumbersToFoo(someObject, numbers); // returns 10
addThreeNumbersToFoo({ foo: 1 }, [1, 1, 1]); // returns 4
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

The following are all equivalent for the purposes of splitting up an array of values amongst the a function's arguments:

```js
addThreeNumbers.apply(null, numbers);
addThreeNumbers.apply(this, numbers);
addThreeNumbers.apply('oogieboogie', numbers);
```

## Explicitly Setting Context with `bind`

`call` and `apply` are great ways of explicitly setting `this` when we call a function. But sometimes, we want set `this` when we define a function, not when we call it.

`call` and `apply` invoke the function immediately. `bind` is different. It returns a copy of the function with `this` set explicitly that we can call later.

```js
// Example
```

`bind` is useful when working with asynchronous JavaScript using callbacks or promises. When we make an AJAX request to a server, we typically pass a callback function that will execute when we hear back from the server. While, we're usually writing this function in context of the object we're working with. It will be executed in a totally different context.

<!-- The code examples from my ES6 talk should go here. -->

## Recursion

```js
function factorial(n) {
  if (n <= 1) { return 1 };
  return n * factorial(n - 1);
}
```
