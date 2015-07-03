# Array Prototype Methods

## A Brief Introduction

## Array.prototype.forEach

One of the first methods we'll explore together is `Array.prototype.forEach`, which iterates over the array and passes each element into a callback function that you provide.

```js
const letters = ['a', 'b', 'c'];

letters.forEach(function (letter) {
  console.log(letter);
});
```

This will log the following output to the console:

```js
a
b
c
```

In the example above, we'll work through each letter one-by-one and pass it into an anonymous function that—in this case—will log each letter to the console. `forEach` passes three arguments to the callback function: the current element for this iteration, the index of that element, and a full copy of the array that we're iterating through.

```js
const letters = ['a', 'b', 'c'];

letters.forEach(function (letter, index, array) {
  console.log({
    currentValue: letter,
    currentIndex: index,
    fullArray: array
  });
});
```

This will log the following output to the console:

```js
{currentValue: "a", currentIndex: 0, fullArray: ["a", "b", "c"]}
{currentValue: "b", currentIndex: 1, fullArray: ["a", "b", "c"]}
{currentValue: "c", currentIndex: 2, fullArray: ["a", "b", "c"]}
```

JavaScript allows you to omit arguments without raising an error. You can use this to your advantage by leaving out the index and the full array if you're not using them, which is common and what we did in the first example. However, if you do need either or both the index or the full array, you have access to them.

`forEach` is not the only way to iterate through an array and you may have seen another approach using for-loops.

```js
const letters = ['a', 'b', 'c'];

for (var i = 0; i < letters.length; i++) {
  console.log(letters[i]);
}
```

In the example above, we set up an iterator, `i`. As long as `i` is less than the length of the array of letters, we'll keep calling the body of the loop. After we call the body of the loop, we'll increment `i`, which will eventually become greater than the length of the array and the loop will exit.

`forEach` has a few advantages over using a for-loop. First, it's easier to read. Secondly, JavaScript has function scope, but not block scope. This means that `number` in our first example is scoped only to our callback function, whereas `i` is accessible outside of the loop body, which is the global scope in this case. The latter could have some unintended consequences.

`forEach` is the foundation for many of the other methods we'll explore today and you can accomplish much of the same functionality with `forEach` that other methods specialize in. That said, just because you _can_ use it, it doesn't mean it's the best choice and that you _should_ use it.

## Array.prototype.map

`forEach` will iterate through each element in an array and pass that element to an anonymous function. It's not uncommon that we find ourselves in a position where we need to transform the contents of an array.

In theory, we could use `forEach` in this case:

```js
const letters = ['a', 'b', 'c'];
const uppercaseLetters = [];

letters.forEach(function (letter) {
  const uppercaseLetter = letter.toUpperCase();
  uppercaseLetters.push(uppercaseLetter);
});

console.log(uppercaseLetters);
```

This will work. The `console.log` at end will log `['A', 'B', 'C']`, but JavaScript's `Array` provides us with a better way to do this using `Array.prototype.map`.

```js
const letters = ['a', 'b', 'c'];

const uppercaseLetters = letters.map(function (letter) {
  return letter.toUpperCase();
});

console.log(uppercaseLetters);
```

The example above will give us the same result as the one before it: `['A', 'B', 'C']`. That said, it's about half the length and doesn't involve mutating an existing array.

Like `forEach`, `map` accepts an anonymous function that it calls on each element of the array it's call on. `forEach` returns `undefined` when its finished. `map`, on the other hand, returns a new array made up of the values returned by the callback function on each iteration.

## Array.prototype.filter

`Array.prototype.filter`, like `map`, returns a new array based on the return value of the callback function you pass it. The mechanics, however, differ slightly.

`filter` will include an element in the new array if return value is truthy and omit it if the return value is falsy.

What makes a value truthy or falsy? Let's start with the easy ones: `true` is truthy and `false` is falsy. `0`, `null`, `undefined`, 'NaN', and an empty string are all falsy as well. Everything else is truthy.

Let's start with a simple example:

```js
const booleans = [true, true, false, true];

const truths = booleans.filter(function (value) {
  return value;
});

console.log(truths); // Logs [true, true, true]
```

As you can see in the example above, `false` is omitted from the resulting array. This works, but it's not very useful.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7];

const oddNumbers = numbers.filter(function (number) {
  return number % 2;
});

console.log(oddNumbers); // Logs [1, 3, 5, 7]
```

For all of the even numbers, `number % 2` returns `0`, which—as we saw earlier—is falsy. As a result, all of the even numbers are omitted from the new array. For all of the odd numbers, `number % 2` returns `1`, which is truthy. As a result, the odd numbers are placed in the new array and ultimately returned by the filter method.

We can also get a little bit more nuanced in how we filter elements in our array. Let's take a look at the following example:

```js
const beatles = [
  { name: 'John', living: false, instruments: ['guitar', 'bass', 'piano'] },
  { name: 'Paul', living: true, instruments: ['bass', 'guitar', 'piano'] },
  { name: 'George', living: false, instruments: ['guitar', 'sitar'] },
  { name: 'Ringo', living: false, instruments: ['drums', 'bongos'] },
];

const livingBeatles = beatles.filter(function (beatle) {
  return beatle.living;
});

const guitarPlayingBeatles = beatles.filter(function (beatle) {
  return beatle.instruments.indexOf('guitar') !== -1;
});
```

## Array.prototype.reduce

`Array.prototype.reduce` is a lot like `map` with one important distinction: it returns one single value as opposed to an array of new values.

```js
const numbers = [1, 2, 3];

const sum = numbers.reduce(function (total, number) {
  return total + number;
}, 0);

console.log(sum); // Logs 6
```

## Array.prototype.sort

`Array.prototype.sort` will sort all of the elements in the array. We can invoke it without a callback function.

```js
const numbers = [2, 1, 4, 3];
const letters = ['a', 'd', 'c', 'b'];

const sortedNumbers = numbers.sort();
const sortedLetters = letters.sort();

console.log(sortedNumbers); // Logs [1, 2, 3, 4]
console.log(sortedLetters); // Logs ['a', 'b', 'c', 'd']
```

Without a callback function, `sort` uses a default sorting algorithm. In the examples above, everything works the way we would expect, but there are some surprising peculiarities of the default sorting algorithm. Consider the following example:

```js
const numbers = [1, 7, 3, 10];

const sortedNumbers = numbers.sort();

console.log(sortedNumbers); // Logs [1, 10, 3, 7]
```

Unless you've encountered a similar example in the past, `[1, 10, 3, 7]` is probably not what you were expecting the sort method to return. By default, JavaScript uses lexicographical sorting. You can think of it as alphabetical sorting. 7 may come before 10 numerically, but 10 comes first lexicographically.

So, how do we sort numbers then? `Array.prototype.sort` also accepts a callback function that it will use to evalute the order of the elements in the new array it returns.

The callback function compares two elements at a time and the `sort` method rearranges the elements based on a value returned by the callback function.

* If the value returned is `0` then sort leaves both elements in the same place.
* If the value returned is negative, then the first element is placed before the second element.
* If the value returned is positive, then the second element is placed before the first element.

Armed with this new knowledge, let's see if we can sort an array of numbers—umm—numerically.

```js
const numbers = [1, 7, 3, 10];

const sortedNumbers = numbers.sort(function (a, b) {
  return a - b;
});

console.log(sortedNumbers); // Logs [1, 3, 7, 10]
```

`1 - 7` results in a negative number, `-6`. As a result the first element, `1` is placed before `7`. However, `7 - 3` is a positive number. So, the first element, `7` is placed _after_ `3`.

We can also use custom sorting functions for more complicated data structures. Let's say we wanted to sort the Beatles by the number of instruments played in descending order. As a bonus, we'll map the sorted array to just collect the names of each Beatle.

```js
const beatles = [
  { name: 'John', instruments: ['guitar', 'bass', 'piano' ] },
  { name: 'Paul', instruments: ['bass', 'guitar', 'piano', 'cowbell'] },
  { name: 'Ringo', instruments: ['drums'] },
  { name: 'George', instruments: ['guitar', 'sitar'] }
];

beatles.sort(function (a, b) {
  return b.instruments.length - a.instruments.length;
}).map(function (beatle) {
  return beatle.name;
});
```

## Array.prototype.concat

## Array.prototype.indexOf

## Array.prototype.slice

## Array.prototype.some and Array.prototype.every
