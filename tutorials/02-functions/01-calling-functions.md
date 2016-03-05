# Functions

Functions in JavaScript are little units of code that can be executed later and reused as many times as you want. If you've worked with JavaScript in the past, you've probably come across functions before, so in this section we'll skim the basics and look at more advanced function-related concepts to level up that basic knowledge.

Here is a simple example of a function that takes a single argument and logs a message to the console, just in case you are in the dark as to what a function looks like:

```javascript
function sayHello(name) {
    console.log('Hello, ' + name + '.');
}
```

## Defining functions

There a two major ways of defining functions in JavaScript: _function declarations_ and _function expressions_. Both approaches are fairly similar with a few nuances.

First, let's take a look at each in practice.

```javascript
// Function declaration
function logSomething(something) {
  console.log(something);
}

// Function expression
var logSomething = function (something) {
  console.log(something);
};
```

In the first example, we are declaring a function with the name `logSomething`. In the second example, we are declaring a variable called `logSomething` and assigning an anonymous function as its value.

Function declarations are hoisted to the top of the scope, which means that you can invoke a function on an earlier line than your declaration appears on. Variable declarations are also hoisted, but their assignment is not. They are `undefined` until the line where they are assigned a value.

Let's look at an example:

```javascript
logSomethingDeclaration('This works.');
console.log(typeof logSomethingDeclaration); // "function"

function logSomethingDeclaration(something) {
  console.log(something);
}

logSomethingExpression('This will throw an error');
// TypeError: logSomethingExpression is not a function. (In
// 'logSomethingExpression('This will throw an error')',
// 'logSomethingExpression' is undefined)

console.log(typeof logSomethingExpression); // "undefined"

var logSomethingExpression = function (something) {
  console.log(something);
};
```

We'll revisit some of the other differences between function declarations and expressions later on when we discuss [recursion][].

[recursion]: https://github.com/mdn/advanced-js-fundamentals-ck/blob/gh-pages/tutorials/02-functions/04-recursion.md#function-declarations-function-expressions-and-recursion

## Invoking functions

Let's now take a look at the intricacies of function invocation.

### The difference between calling functions and referencing functions

The easiest way to call a function is to append a pair of parentheses to the end of the name assigned to the function.

```javascript
function sayHello(name) {
    console.log('Hello!');
}

sayHello();
```

Functions are incredibly flexible in JavaScript. Not only can we call them like we did above — we can also pass them as arguments to other functions. We can also assign them to properties in objects as well as store them in variables. As a result, we need a way to talk about functions without accidentally calling them in the wrong place.

We can refer to a function without calling it by omitting the parentheses (you'll sometimes see the parentheses referred to as the "function invocation operator").

```javascript
var myFavoriteFunction = sayHello;
```

In the first section of this content kit, we passed functions to methods on `Array.prototype`. It was the method's job to call this function on each member of the array. We _do not_ want to call the function as we pass it to the method on `Array.prototype`.

We omit the parentheses in this context because we're referencing it, but not invoking it. For example:

```javascript
function doubleNumber(n) {
  return n * 2;
}

[1,2,3].map(doubleNumber);
```

If we did add the parentheses to `doubleNumber()`, JavaScript would evaluate the function and place its return value as the argument being passed to `c`. It's also worth noting that if you do invoke the function without passing an argument, the function will attempt to multiply `undefined` by `2`. This will result in `NaN`, which stands for "not a number" and is also not a function that `Array.prototype.map()` can call — as a result the code will throw an error.

Consider the following:

```javascript
function returnSomething(something) {
  return something;
};

var result = returnSomething(2); // 2

var nothing = returnSomething(); // undefined

var reference = returnSomething; // reference points to the returnSomething function
reference(2); // 2
```

#### Your turn

* Write a new function called `doubleNumber()` that takes a single argument and returns that argument multiplied by two.
* Pass the number two into the function and verify that it returns `4`.
* Store a reference to the `doubleNumber()` function in a variable called `timesTwo`.
* Call the `timesTwo()` function, passing in `2` as an argument
* Try `console.log(timesTwo.name)` and inspect the result

### Methods

At this point we've explored one way of invoking a function — adding a pair of parentheses onto the end. In the section on Object-Oriented JavaScript, we also explored adding methods to an object's prototype. These methods — and the ones on `Array.prototype` — are just functions stored in object properties.

However, something special happens when we declare a function as a property on a object.

```javascript
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

#### Your turn

Implement the following function:

```javascript
function logFoo() {
  console.log(this.foo);
}
```

* Create two objects: `bar` and `baz`.
* Set a `foo` property on each object to the value of your choice.
* Set a `log` property on each object with a reference to `logFoo`.
* Call `bar.log()` and `baz.log()` and notice the difference
