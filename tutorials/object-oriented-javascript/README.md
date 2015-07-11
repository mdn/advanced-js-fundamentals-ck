# Object-Oriented JavaScript

## Learning Objectives

In this section, we're going to explore a few different topics. You'll learn the following:

* How to construct objects in JavaScript and create shared methods using object prototypes
* How to build a chaining API for your JavaScript objects

## An Introduction to Object-Oriented JavaScript

JavaScript is an object-oriented programming language. Functions can be used to construct new objects in JavaScript.

It's not a rule baked into the language, but—by convention—most JavaScript developers capitalize the names of functions that they intend on using as object constructors.

Object constructors can be called using the `new` keyword.

```js
function Dog() {};

var fido = new Dog();
```

`fido` in the example above will be a new object—albeit, a very simple one.

Let's add to our `Dog` constructor.

```js
function Dog(name) {
  this.name = name;
  this.legs = 4;
};

var fido = new Dog('Fido');
var spot = new Dog('Spot');

fido.name; // 'fido'
fido.legs; // 4
spot.name; // 'spot'
```

When we use the `new` keyword to call our function as a constructor, a few things happen under the scenes:

1. `this` is set to a new empty object
2. The prototype property of the constructor function (`Dog.prototype` in the example above) is set as the prototype of the new object, which was set to `this` in the first step
3. the body of our function is run
4. our new object, `this`, is returned from the constructor

Let's take a look at this in context of our `Dog` constructor:

```js
function Dog(name) {
  // `this` is set to a new object
  // the prototype is set to `Dog.prototype`
  this.name = name;
  this.legs = 4;
  // return this;
};
```

What is `Dog.prototype` and where does it come from? Functions are objects and all functions in JavaScript have a `prototype` property. This property is set to an empty object—`{}`—by default.

```js
function Dog() {}
function Cat() {}

console.log(Dog.prototype); // Logs {}
console.log(Cat.prototype); // Logs {}
```

With regular functions, we generally don't use the `prototype` property. This special little object comes in to play when we use the function as a constructor.

You may have heard that JavaScript has something called prototypal inheritance. This is a very complicated term for a relatively simple concept.

When we call a property on an object (e.g. `fido.name`), JavaScript checks the object to see if it has a `name` property. If it does, then it hands us that property. If not, then it checks the object's prototype. If the object's prototype doesn't have that property, then it check's the prototype's prototype. It continues this process until it reaches the top of the chain. If it still hasn't defined this property, then it returns `undefined`.

By default, all objects inherit from `Object`, which has a few methods on it. One of these methods is `toString()`.

```js
function Dog(name) {
  this.name = name;
  this.legs = 4;
};

var fido = new Dog('Fido');

fido.legs; // 4
fido.toString(); // [object Object]
```

When we call `fido.legs` in the example above, JavaScript checks `fido` to see if it has a `legs` property. It does, so JavaScript returns the value, `4`. In the next line, we call `toString()`. Well, `fido` doesn't have a `toString` property, so we check `fido`'s prototype, which is `Dog.prototype`. That's an empty object, so it certainly doesn't have that property. Eventually, we work our way up to `Object.prototype`, which has a to `toString` property set to a built-in function. JavaScript calls that `toString()` method that it found up the chain, which returns `[object Object]`.

We could, however, set our own `toString()` method that would return something a little more helpful.

```js
function Dog(name) {
  this.name = name;
};

var fido = new Dog('Fido');

fido.toString = function () {
  return '[dog ' + this.name + ']';
};

fido.toString(); // [dog Fido];
```

JavaScript finds the `toString` property immediately and doesn't have to look up the chain of prototypes. But, only `fido` has this fancy new `toString` property. It would be nice if all dogs could share this new functionality.

Each dog constructed by the `Dog` has `Dog.prototype` set as it's prototype. This means that each dog has looks immediately to `Dog.prototype`, if we ask for a property that it doesn't have.

Consider the following:

```js
function Dog(name) {
  this.name = name;
};

Dog.prototype.toString = function () {
  return '[dog ' + this.name + ']';
};

var fido = new Dog('Fido');
var spot = new Dog('Spot');

Fido.toString(); // [dog Fido];
Spot.toString(); // [dog Spot];
```

Prototypes are a great way to share functionality between related objects. We can define any properties we want on `Dog.prototype`.

```js
function Dog(name) {
  this.name = name;
};

Dog.prototype.sayHello = function () {
  return 'Hello, my name is ' + this.name + '.'
};

var fido = new Dog('Fido');
var spot = new Dog('Spot');

fido.sayHello(); // Hello, my name is Fido.
spot.sayHello(); // Hello, my name is Spot.
```

### Your Turn: Quick Exercise

Can you add a second method called `sayGoodbye` that enables each dog to bid farewell?

## Building a Calculator Object

In this exercise, we'll build a `Calculator` constructor. We'll add some functionality to `Calculator.prototype`, which will be shared by all of the objects we create using the `Calculator` constructor.

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

Each calculator stores its own value, but neither do any—umm—calculation. Ideally, simple calculations is something that should be done by all calculators. As a result, we'll probably want to share this functionality with each object constructed by `Calculator`.

Each object constructed by `Calculator` will look to `Calculator.prototype` whenever it's asked for a property it doesn't have. So, it makes sense to put our functionality there.

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

### Your Turn

Your mission is to add two more methods to `Calculator.prototype`: `multiplyBy()` and `divideBy()`.

A test suite has been set up for you, but you'll have to write the tests on your own this time.

## Limitations of Our Calculator

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

## Method Chaining the Wild

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

jQuery was designed to return the original selection of DOM elements after each method call. `slideUp()` returns the `$('.some-class')` selection—as does `text()`, `addClass()`, `on()`, and `fadeIn`. This allows us to continue working on the same object. Without chaining, the example above would look a little different.

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

Without the ability to chain methods, this code would look very different as we would have to create many more local variables to store our data in between each step.

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

## Building a Method Chaining API for Your JavaScript Objects

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

### Your Turn

Refactor `subtract`, `multiply`, and `divide` to take advantage of method chaining. There are tests in `demos/basic-calculator` to help guide your implementation.
