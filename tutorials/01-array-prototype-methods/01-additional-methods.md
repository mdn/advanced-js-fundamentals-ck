# Addition Array.prototype methods

`Array.prototype` has a number of other methods beyond what we have discussed in depth above. You can find the full list of methods at [the Mozilla Developer Network page for `Array`][mdn-array]. Below are a few additional methods that are particularly useful.

[mdn-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## Array.prototype.some and Array.prototype.every

[`Array.prototype.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) and [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) are used to determine if some or all — respectively — of the elements meet a given criteria. Like `filter()`, `some()` and `every()` take a callback function that returns either a truthy or falsy value. While `filter()` returns a new array, however, `some()` and `every()` return a boolean that indicates the result of the test:

```javascript
function isOdd(number) {
  return !!(number % 2);
}

[1, 2, 3].some(isOdd);  // true
[2, 4, 6].some(isOdd);  // false
[1, 2, 3].every(isOdd); // false
[1, 3, 5].every(isOdd); // true
```

`some()` and `every()` are supported by most modern browsers, although notably, Internet Explorer 8 and earlier do not support these methods. That said, you can add support for these methods using a polyfill — see MDN's [some polyfill][somefill] and [every polyfill][everyfill].

[somefill]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some#Polyfill
[everyfill]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Polyfill

## Array.prototype.concat

[`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) defines additional values and arrays and adds them onto the array on which it is called.

```javascript
const stringedInstruments = ['guitar', 'bass', 'harp'];
const percussionInstruments = ['bongos', 'snare drum', 'bass drum'];

const instruments = stringedInstruments.concat(percussionInstruments);

console.log(instruments);
// Logs ["guitar", "bass", "harp", "bongos", "snare drum", "bass drum"]
```

## Array.prototype.indexOf

Often we will want to know if a certain element is in an array. In these cases, we can use [`Array.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) to find the index of a given element.

```javascript
const letters = ['a', 'b', 'c'];

letters.indexOf('a'); // returns 0;
letters.indexOf('b'); // returns 1;
```

In the event that an element is not in the array, `indexOf()` will return `-1` (it can't return `0` — a falsy value — because `0` is a valid array index, hence using -1 in this case.) To assert that an element is in the array, we can check to make sure its index is _not_ `-1`.

```javascript
['a', 'b', 'c'].indexOf('a') !== -1;
```

Conversely, if we want to check that an element is not in an array, we can assert that it has an index of `-1`;

```javascript
['a', 'b', 'c'].indexOf('not in here') === -1;
```

## Array.prototype.slice

[`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) returns a copy of a given array. It takes two optional arguments: a starting index and an ending index. If we give `slice` a starting index it will return a copy of the array from that starting index forward. If we provide it a starting and ending index, it will return an array of the elements between those two indexes. If we give `slice()` a negative starting index, it will start from the end of the array and work backwards.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

numbers.slice();     // [1, 2, 3, 4, 5, 6]
numbers.slice(0);    // [1, 2, 3, 4, 5, 6]
numbers.slice(1);    // [2, 3, 4, 5, 6]
numbers.slice(2);    // [3, 4, 5, 6]
numbers.slice(-2);   // [5, 6]
numbers.slice(2, 4); // [3, 4];
```

In JavaScript there are some collections that are not instances of `Array` and —as a result — do not inherit any of the methods from `Array.prototype` that we've discussed so far. One solution is to borrow the `slice()` method from `Array.prototype` to return an actual array.

The most common use of this technique is with the `arguments` object that is available to every function in JavaScript.

```javascript
function exampleFunction() {
  console.log(arguments);
}

exampleFunction(1, 2, 3); // Logs [1, 2, 3]
```

At first glance, `arguments` looks suspiciously like an array, but it isn't and — more importantly — it does not inherit from `Array.prototype`.

```javascript
console.log(arguments.forEach); // undefined
console.log(arguments.map); // undefined
console.log(arguments.reduce); // undefined
```

If we tried to use `forEach()` try to iterate over each of the arguments passed to the array, it would raise an error.

```javascript
function exampleFunction() {
  arguments.forEach(function (argument) {
    console.log(argument)
  });
}

exampleFunction(1, 2, 3); // TypeError: arguments.forEach is not a function.
```

The common solution is to simply convert `arguments` into an array — which, in turn, would inherit from `Array.prototype`.

```javascript
function exampleFunction() {
  const args = Array.prototype.slice.call(arguments);
  args.forEach(function (argument) {
    console.log(argument)
  });
}
```

As we discussed earlier, calling slice with no arguments returns a copy of the array. In the example above, we are "borrowing" the `slice()` method from `Array.prototype` and using `call()` to set the context to our `arguments` object. The end result is a copy of `arguments` that happens to inherit from `Array.prototype`.
