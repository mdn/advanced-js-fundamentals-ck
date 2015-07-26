# Building a Chainable API

In this exercise, we'll build a `Calculator()` constructor, then add some functionality to `Calculator.prototype` that will be shared by all of the objects we create using the `Calculator()` constructor.

Let's start with a very simple constructor:

```js
function Calculator(value) {
  this.value = value;
}

var firstCalculator = new Calculator(2);
firstCalculator.value; // 2

var secondCalculator = new Calculator(4);
secondCalculator.value; // 4
```

Each calculator stores its own value, but neither do any — umm — calculations. Simple calculations should be available to all calculators, so as a result we'll probably want to share this functionality with each object constructed by `Calculator()`.

Each constructed calculator object will look to `Calculator.prototype` whenever it's asked for a property it doesn't have. So, it makes sense to put our functionality there.

```js
function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function (addend) {
  return this.value + addend;
};

Calculator.prototype.subtract = function (subtrahend) {
  return this.value - subtrahend;
};

var firstCalculator = new Calculator(2);
firstCalculator.value; // 2
firstCalculator.add(2); // 4

var secondCalculator = new Calculator(4);
secondCalculator.value; // 4
secondCalculator.subtract(2); // 2
```

## Your turn

Your mission is to add two more methods to `Calculator.prototype`: `multiplyBy()` and `divideBy()`. A test suite has been set up for you in [demos/basic-calculator](https://github.com/stevekinney/advanced-js-fundamentals-ck/tree/gh-pages/demos/basic-calculator).

# Limitations of Our Calculator

Our calculator works, but it's limited. We can only do one operation on the value.

```js
var calculator = new Calculator(4);
calculator.multiplyBy(10); // 40
```

`40` is just a number. So, we can't call another method from `Calculator.prototype` on it. We'd have to doing something along these lines:

```js
var calculator = new Calculator(4);
var multipliedValue = calculator.multiplyBy(10);
var secondCalculator = new Calculator(multipliedValue);
secondCalculator.add(2); // 42
```

Even in this very simple example, this approach is starting to get a little out of hand. It would be preferable if we could write our code as follows:

```js
var calculator = new Calculator(4);
calculator.add(2).multiplyBy(10).divideBy(5).subtract(11).add(2).value; // 3
```

This approach is called _method chaining_. Each method is called on the result of the previous method.

# Method Chaining the Wild

Let's take a look at an example of method chaining from jQuery:

```js
$('.some-class')
  .slideUp()
  .text('wowowow')
  .addClass('some-other-class')
  .on('click', function (e) {
    e.preventDefault();
    $(this).hide();
  })
  .fadeIn();
```

jQuery was designed to return the original selection of DOM elements after each method call. `slideUp()` returns the `$('.some-class')` selection — as does `text()`, `addClass()`, `on()`, and `fadeIn`. This allows us to continue working on the same object. Without chaining, the example above would look a little different.

```js
var $selection = $('.some-class');

$selection.slideUp()
$selection.text('wowowow')
$selection.addClass('some-other-class')
$selection.on('click', function (e) {
  e.preventDefault();
  $(this).hide();
})
$selection.fadeIn();
```

Examples of method chaining also exist in the JavaScript standard library. We could also do something similar with `Array.prototype` methods.

```js
var numbers = [1,2,3,4,5,6,7].filter(function (n) {
  return n % 2;
}).map(function (n) {
  return n * 2;
}).sort(function (a, b) {
  return b - a;
});

console.log(numbers); // Logs [14,10,6,2]
```

Without the ability to chain methods, this code would look very different — we would have to create many more local variables to store our data in between each step.

```js
var numbers = [1,2,3,4,5,6,7];

var oddNumbers = numbers.filter(function (n) {
  return n % 2;
});

var doubledNumbers = oddNumbers.map(function (n) {
  return n * 2;
});

var sortedNumbers = doubledNumbers.sort(function (a, b) {
  return b - a;
});

console.log(sortedNumbers); // Logs [14,10,6,2]
```

# Building a Method Chaining API for Your JavaScript Objects

Now that we've seen some examples of method chaining in JavaScript, let's refactor our calculator. Earlier, we discussed that it would be much nicer if our calculator worked like this:

```js
var calculator = new Calculator(4);
calculator.add(2).multiplyBy(10).divideBy(5).subtract(11).add(2).value; // 3
```

We can accomplish this by refactoring each of our methods to return our calculator object after the method is called.

```js
function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function (addend) {
  this.value += addend;
  return this;
}

var calculator = new Calculator(4);
calculator.add(2).add(10).add(2).value; // 18
```

## Your turn

Refactor `subtract()`, `multiply()`, and `divide()` to take advantage of method chaining. There are tests in `demos/basic-calculator` to help guide your implementation.
