# What is `this`?

In the [last tutorial][calling-functions], we used a special property in JavaScript called `this`. `this` is not only very hard to talk about in English, it's a concept that can be confusing to many new JavaScript developers. We'll be dealing with `this` a lot in the next few sections, so it's probably best that we spend a little time talking about it now.
The short and not very helpful version is that `this` refers to the _context_ in which a function was _invoked_ in JavaScript. This is different from where it was _defined_.

[calling-functions]: https://github.com/mdn/advanced-js-fundamentals-ck/blob/gh-pages/tutorials/02-functions/01-calling-functions.md#methods

Let's look at an example:

```javascript
function logThis() {
  console.log(this);
}

logThis(); // logs `window` in the browser or `global` in Node

var someObj = {
  log: logThis
};

someObj.log(); // logs `someObj`
```

This gives you a basic idea of what `this` is, but sometimes things get more complicated and it is harder to get `this` to reference the correct context for your programs to work properly — this is a common source of problems in JavaScript.

## rules for `this`

Below we'll look at a couple of rules we can follow to make things easier.

### Rule 1: Unless another rule says otherwise, `this` is the global object

When we declare `logThis`, it's in the global scope. When we're in the global scope, `this` is set to the global object, which can be one of three things depending on our environment:

* In the browser, `window` is the global object.
* If we are in [strict mode][], `this` is `undefined`.
* In Node.js, `global` is the global object as we don't have a window to speak of.

[strict mode]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode?redirectlocale=en-US&redirectslug=JavaScript%2FStrict_mode

We'll discuss a few cases where `this` is not the global object. But, the first rule is that — if no other rules apply — then `this` is the global scope.

### Rule 2: `this` is set implicitly when a function is called as a method

The first time we call `logThis()`, we're still in the context of the global scope. So, the first rule applies and `this` is the global object (or `undefined` if we're in strict mode.)

But something a little different happens when we put a reference to that function inside of `someObj`. `someObj.log` points to our original `logThis` function at the top of the example, but when we call `someObj.log`, we're calling it from the context of `someObj` so we get a different result. `this` is `someObj`, because that is the context it is being called from — regardless of what the context was when `logThis` was declared.

### Rule 3: `this` can be explicitly set using call or apply

It's helpful that functions will adapt to their surroundings, but sometimes we need to be explicit about what we want `this` to be when we invoke a function.

Functions in JavaScript are objects and share methods on `Function.prototype` — just like all arrays share methods on `Array.prototype`.

One method all functions share is `call()`, which uses the first argument you hand it and sets it to `this`, it then takes all subsequent arguments and passes them to the function you're calling `call()` on. It basically provides a way to call any function on a specific function scope.

```javascript
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

The first argument when we use the `call()` method is used to set `this`. The second argument is passed to the function we're calling as its first argument. If we had a third argument, it would be passed as the second argument to the function we're calling and so on.

Remember that in JavaScript you can pass an arbitrary number of arguments to a function and it will simply ignore the ones it doesn't need. Thus, the following would also be a valid use of `call()`

```javascript
addToFoo.call(bar, 2, 'extra arg'); // adds 2 to the `foo` property on `bar` and
                                    // returns 3; ignores the third argument
                                    // since `addToFoo` takes only one
```

`apply()` is another method shared by all functions and it behaves in a very similar fashion to `call()`, except that it takes the arguments you'd like to pass to the function as an array.

```javascript
function addThreeNumbersToFoo(first, second, third) {
  return this.foo + first + second + third;
}

var someObject = { foo: 1 };
var numbers = [2, 3, 4];

addThreeNumbersToFoo.apply(someObject, numbers); // returns 10
addThreeNumbersToFoo.apply({ foo: 1 }, [1, 1, 1]); // returns 4
```

`call()` and `apply()` allow us to have a say as to the mercurial binding of `this`. Regardless of the first and second rules, if we explicitly set the value of `this` using `call()` or `apply()`, then that's the value of `this` inside of that function.

There is a [fourth rule][], but we'll have to wait until we discuss [object-oriented JavaScript][] later on before we say anymore about it.

[fourth rule]: https://github.com/mdn/advanced-js-fundamentals-ck/blob/gh-pages/tutorials/03-object-oriented-javascript/01-introduction-to-object-oriented-javascript.md#functions-and-this-revisited

[object-oriented JavaScript]: https://github.com/mdn/advanced-js-fundamentals-ck/tree/gh-pages/tutorials/03-object-oriented-javascript


## Using `apply()` to spread an array of arguments

As we've seen `apply()` — like `call()` — is useful for explicitly setting `this`. Additionally, `apply()` is useful when we have an array that we'd like to spread out over the arguments of a function. Here's a quick example:

```javascript
function addThreeNumbers(first, second, third) {
  return first + second + third;
}

var numbers = [1, 2, 3];

addThreeNumbers.apply(null, numbers);
```

Here the `numbers` array is being split up into three separate values that are  then specified as the arguments of the `addThreeNumbers` function and added together.

Now consider the `Math.min()` function. It takes a set of numbers as arguments and returns the smallest number. It can take any number of arguments.

```javascript
Math.min(1, 4, 10, 2); // returns 1
Math.min(2, 3, 10, 100, 2048, 1984, 2012, 919); // returns 2
```

What if we had an array of numbers?

```javascript
var numbers = [201, 100, 2];
Math.min(numbers); // returns NaN
```

`numbers` is an array and `Math.min` doesn't know how to deal with an array. We could try the following:

```javascript
var numbers = [201, 100, 2];
Math.min(numbers[0], numbers[1], numbers[2]); // returns 2;
```

This works, but it relies us having a manageable number of items in the array. Worse, it relies on us knowing how many elements are in the array. What if we had built up our array of numbers from some kind of user input? We don't have a way of knowing if there will be 1 number in the array or 1,000.

`apply()` will take the items in the array and spread them out over the arguments of the array. We don't have to access each element by its index, which means we also don't have to know how many elements are in the array.

```javascript
var numbers = [2, 3, 10, 100, 2048, 1984, 2012, 919];

Math.min.apply(null, numbers); // returns 2;
```

### A word on the spread operator in ES6/2015

ES6 introduces the spread operator (`...`), which allows us to spread the contents of an array without using `apply()`. With ES6, you're able to do the following:

```javascript
var numbers = [2, 3, 10, 100, 2048, 1984, 2012, 919];

Math.min(...numbers);
```

You can [read more about the spread operator][mdn-spread] on MDN.

[mdn-spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator


### Setting the context when the context is unimportant

We used `null` in the example above because it doesn't matter what `this` is since we're not using it.

The following are all equivalent for the purposes of splitting up an array of values amongst a function's arguments:

```javascript
addThreeNumbers.apply(null, numbers);
addThreeNumbers.apply(this, numbers);
addThreeNumbers.apply('oogieboogie', numbers);
```

## Explicitly setting context with `bind()`

`call()` and `apply()` are great ways of explicitly setting `this` when we call a function. Sometimes, however, we want to set `this` when we define a function, not when we call it.

`call()` and `apply()` invoke the function immediately. `bind()` is different — it returns a copy of the function that takes the sometimes slippery `this` and replaces it with a hard set value that we give it.

```javascript
function logFoo() {
  console.log(this.foo);
}

var someObject = { foo: 'Hello' };

logFoo(); // undefined
logFoo.call(someObject); // Hello

var boundLogFoo = logFoo.bind(someObject); // returns a new function with
                                           // `this` explicitly set

boundLogFoo(); // Hello
```

Let's take one more look at this with some objects.

```javascript
var fido = {
  name: 'Fido',
  sayHello: function () {
    console.log('My name is ' + this.name + '.');
  }
};

var spot = {
  name: 'Spot',
  sayHello: fido.sayHello,
  boundSayHello: fido.sayHello.bind(fido)
};

var haveTacoSayHello = fido.sayHello.bind({ name: 'Taco' });

fido.sayHello(); // My name is Fido.
spot.sayHello(); // My name is Spot.
spot.boundSayHello(); // My name is Fido.
haveTacoSayHello(); // My name is Taco.
```

### Writing our own `bind()`

`bind()` seems like black magic, but it's something you can write a simple version of yourself — which might dispel some of the magic.

The easiest way to stop `this` from changing under our feet is to take it out of the picture.

Consider the following adaptation from an earlier example:

```javascript
function logThis() {
  console.log(this);
}
```

Let's say that we wanted a version of this function where the value of `this` was explicitly set. We couldn't use `call()` or `apply()` here because they would immediately invoke the function and we just want a version that we can call later without the context changing.

We could wrap our function in another function that would eventually use `call()` to explicitly set the value of `this`:

```javascript
function logThis() {
  console.log(this);
}

var logSandwich = function () {
  logThis.call('sandwich');
}

logThis(); // window
logSandwich(); // 'sandwich'
```

#### Keeping Our Code DRY

This works, but it's also a little tedious to have to create new variables each time we need to explicitly bind `this` and return a new function. It's also not very reusable — if you recall from our [section on currying][currying], we can create a function that returns a function in order to keep our code DRY.

[currying]: https://github.com/mdn/advanced-js-fundamentals-ck/blob/gh-pages/tutorials/02-functions/03-currying-and-partial-application.md
```javascript
function logThis() {
  console.log(this);
}

function bind(fn, context) {
  return function () {
    fn.call(context);
  }
}

var logSandwich = bind(logThis, 'sandwich');
var logTaco = bind(logThis, 'taco');
var logBurrito = bind(logThis, 'burrito');

logSandwich(); // 'sandwich'
logTaco(); // 'taco'
logBurrito(); // 'burrito'
```

We now have a reusable function that we can use to create new functions with the context explicitly bound. We're close to approximating the version that ships in [ECMAScript 5][ES5]. We don't want to override the method that comes built-in, so we'll call ours `Function.prototype.bindTo()`;

```javascript
Function.prototype.bindTo = function (context) {
  var fn = this;
  return function () {
    fn.call(context);
  }
}

function logThis() {
  console.log(this);
}

var logSandwich = logThis.bindTo('sandwich');
var logTaco = logThis.bindTo('taco');
var logBurrito = logThis.bindTo('burrito');

logSandwich(); // 'sandwich'
logTaco(); // 'taco'
logBurrito(); // 'burrito'
```

Our new method mostly works, but there is one small problem: our implementation ignores any arguments that our function takes. This hasn't hurt us so far because `logThis()` didn't take any arguments. Let's do one final refactoring that will allow our explicitly-bound function to take the same arguments as the original function.

```javascript
Function.prototype.bindTo = function (context) {
  var fn = this;
  return function () {
    fn.apply(context, arguments);
  }
}

function logThisAndStuff(stuff) {
  console.log(this, stuff);
}

var logSandwich = logThis.bindTo('sandwich');
var logTaco = logThis.bindTo('taco');
var logBurrito = logThis.bindTo('burrito');

logSandwich('one', 'two', 'three'); // 'sandwich', 'one', 'two', 'three'
logTaco('one', 'two', 'three'); // 'taco', 'one', 'two', 'three'
logBurrito('one', 'two', 'three'); // 'burrito', 'one', 'two', 'three'
```

All functions have access to an array-like collection called `arguments`. In the example above, we swap out `call()` for `apply()` and let it spread the collections of arguments passed in to our explicitly-bound function across the arguments of the original function.

#### A word of caution

Our custom `bind()` method isn't perfect. Most modern browsers ship with a `bind()` method that you should use instead of making your own. If you're interested in using `bind()` in older browsers or exploring a more robust solution, we encourage you to take a look at the polyfill available at the [Mozilla Developer Network page][mdnbind] on `Function.prototype.bind()`.

[mdnbind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

### `this` and the perils of asynchronous JavaScript

`bind()` is useful when working with asynchronous JavaScript using callbacks or promises. When we make an AJAX request to a server, we typically pass a callback function that will execute when we hear back from the server. We will usually write this function in context of the object we're working with, but with `bind()` it can be executed in a totally different context.

Let's take a look at an example without any asynchronous callbacks:

```javascript
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

```javascript
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

Although we're writing our code in the context of the `person` object, that's not where it's getting called.

Recall the first rule from earlier in this section: it doesn't matter what `this` is when you declare the function, all that matters is what the context is when you invoke the function.

Our callback is getting called later on and our anonymous function — passed into `somethingAsynchronous()` as `callback` — doesn't have any context of where it came from, so `this` ends up being equal to `window`. `setTimeout` executes in the global scope and Rule 1 applies.

The end result is that not only did we not update the property we wanted to, but we also accidentally set a global variable when we set the `firstName` property on the global object.

There are a few ways to handle this. While the callback loses its reference to `this`, it still has access to the scope that it came from. As a result, this would work:

```javascript
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

```javascript
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

### A word on arrow functions in ES6/2015

ES6 introduces (fat) arrow functions, which allow us to write functions with shorter syntax (among other things). ES6 arrow functions deserve a tutorial of their own, but the relevance to this example is that arrow functions also lexically bind the `this` value implicitly. With ES6, we could write:

```javascript
function somethingAsynchronous(callback) {
  console.log('Maybe we\'re fetching the new name from the server.');
  setTimeout(callback, 1000);
}

var person = {
  firstName: 'Steve',
  lastName: 'Kinney',
  updateName: function () {
    somethingAsynchronous(() => {
      this.firstName = 'Wes'
    });
  }
};

person.updateName();
// Wait a second…
console.log(person.firstName); // Wes.
```

Notice that we used a fat arrow function (`() => {}`) as our callback inside of `somethingAsynchronous`. This syntax negates the need to set a variable equal to `this` or explicitly use `bind()`, as was done in the first and second solutions, respectively.

You can [read more about arrow functions][mdn-arrow-functions] on MDN.

[mdn-arrow-functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
