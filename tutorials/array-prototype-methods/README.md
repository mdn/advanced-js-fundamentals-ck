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

## Array.prototype.reduce

## Array.prototype.sort

## Array.prototype.concat

## Array.prototype.indexOf

## Array.prototype.slice

## Array.prototype.some and Array.prototype.every
