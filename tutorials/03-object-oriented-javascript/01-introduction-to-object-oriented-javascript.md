# An Introduction to Object-Oriented JavaScript

JavaScript is an object-oriented programming language. Functions can be used to construct new objects in JavaScript.

It's not a rule baked into the language, but — by convention — most JavaScript developers capitalize the names of functions that they intend on using as object constructors.

Object constructors can be called using the `new` keyword.

```js
function Dog() {}

var fido = new Dog();
```

`fido` in the example above will be a new object — albeit, a very simple one.

Let's add to our `Dog()` constructor.

```js
function Dog(name) {
  this.name = name;
  this.legs = 4;
}

var fido = new Dog('Fido');
var spot = new Dog('Spot');

fido.name; // 'Fido'
fido.legs; // 4
spot.name; // 'Spot'
```

## Functions and `this` revisited

You may have noticed that we're using `this` in our function and that it isn't bound to the global object, like it ought to be if we were following the three rules in the section on functions. Well, that's because there is a _fourth rule_.

`Dog` is just a regular function. But, we call it a little differently than we did in previous section on functions. If you recall, there are a few ways we can call a function:

* Using a pair of parenthesis as the end of the functions name (e.g. `someFunction()`).
* Using the `call()` method (e.g. `someFunction.call()`).
* Using the `apply()` method (e.g. `someFunction.apply()`).

When we are writing object-oriented JavaScript, we have a fourth way of invoking a function: the `new` keyword. The `new` keyword invokes the function _as a constructor_, which causes it to behave in a fundamentally different way. Additionally, the three previous rules for determining the value of `this` no longer apply.

When we use the `new` keyword to call our function as a constructor, a few things happen behind the scenes:

1. `this` is set to a new empty object
2. The prototype property of the constructor function (`Dog.prototype` in the example above) is set as the prototype of the new object, which was set to `this` in the first step
3. the body of our function is run
4. our new object, `this`, is returned from the constructor

## The `prototype` property

Let's take a look at this in the context of our `Dog()` constructor:

```js
function Dog(name) {
  // `this` is set to a new object
  // the prototype is set to `Dog.prototype`
  this.name = name;
  this.legs = 4;
  // return this;
}
```

What is `Dog.prototype` and where does it come from? Functions are objects and all functions in JavaScript have a `prototype` property. This property is set to an empty object — `{}` — by default.

```js
function Dog() {}
function Cat() {}

Dog.prototype; // {}
Cat.prototype; // {}
```

With regular functions, we generally don't use the `prototype` property — it's like an appendix. But, this special little object comes in to play when we use the function as a constructor.

You may have heard that JavaScript has something called prototypal inheritance. This is a very complicated term for a relatively simple concept.

When we call a property on an object (e.g. `fido.name`), JavaScript checks the object to see if it has a `name` property. If it does, then it hands us that property. If not, then it checks the object's prototype. If the object's prototype doesn't have that property, then it check's the prototype's prototype, and so on. It continues this process until it reaches the top of the chain. If it still hasn't defined this property, then it returns `undefined`.

By default, all objects inherit from `Object`, which has a few methods on it. One of these methods is `toString()`.

```js
function Dog(name) {
  this.name = name;
  this.legs = 4;
}

var fido = new Dog('Fido');

fido.legs; // 4
fido.toString(); // [object Object]
```

When we call `fido.legs` in the example above, JavaScript checks `fido` to see if it has a `legs` property. It does, so JavaScript returns the value, `4`. In the next line, we call `toString()`. Well, `fido` doesn't have a `toString` property, so we check `fido`'s prototype, which is `Dog.prototype`. That's an empty object, so it certainly doesn't have that property. Eventually, we work our way up to `Object.prototype`, which has a to `toString` property set to a built-in function. JavaScript calls the `toString()` method that it found up the chain, which returns `[object Object]`.

We could, however, set our own `toString()` method that would return something a little more helpful.

```js
function Dog(name) {
  this.name = name;
}

var fido = new Dog('Fido');

fido.toString = function () {
  return '[Dog: ' + this.name + ']';
};

fido.toString(); // [Dog: Fido]
```

JavaScript finds the `toString` property immediately and doesn't have to look up the chain of prototypes. But, only `fido` has this fancy new `toString` property. It would be nice if all dogs could share this new functionality.

Each dog constructed by the `Dog()` constructor has `Dog.prototype` set as its prototype. This means that each dog looks immediately to `Dog.prototype` if we ask for a property that it doesn't have.

Consider the following:

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.toString = function () {
  return '[Dog: ' + this.name + ']';
};

var fido = new Dog('Fido');
var spot = new Dog('Spot');

fido.toString(); // [Dog: Fido]
spot.toString(); // [Dog: Spot]
```

Prototypes are a great way to share functionality between related objects. We can define any properties we want on `Dog.prototype`.

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.sayHello = function () {
  return 'Hello, my name is ' + this.name + '.'
};

var fido = new Dog('Fido');
var spot = new Dog('Spot');

fido.sayHello(); // Hello, my name is Fido.
spot.sayHello(); // Hello, my name is Spot.
```

## Your turn: Quick Exercise

Can you add a second method called `sayGoodbye` that enables each dog to bid farewell?
