# Array Prototype Methods

## Learning Objectives

In this segment, you'll learn the following:

* How to use the `Array.prototype` `forEach()`, `map()`, `filter()`, `reduce()`, and `sort()` methods.
* How to create DOM nodes from API data and append them to the page.
* Read and write simple unit and DOM tests using [Mocha][].

If you have not cloned [Advanced JS](https://github.com/stevekinney/advanced-js-fundamentals-ck.git) please do so now.  For this tutorial we'll be working with the `array-prototype-methods` demo

[Mocha]: http://mochajs.com/

## Array.prototype.forEach

One of the first methods we'll explore together is [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FforEach), which iterates over the array and passes each element into a callback function that you provide.

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

In the example above, we work through each letter one by one and pass it into an anonymous function that logs each letter to the console. `forEach()` passes three arguments to the callback function: the current element for this iteration, the index of that element, and a full copy of the array that we're iterating through.

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

`forEach()` is not the only way to iterate through an array — you may have seen another approach using for loops.

```js
const letters = ['a', 'b', 'c'];

for (var i = 0; i < letters.length; i++) {
  console.log(letters[i]);
}
```

In the example above, we set up an iterator, `i`. As long as `i` is less than the length of the array of letters, we'll keep calling the body of the loop. After we call the body of the loop, we'll increment `i`, which will eventually become greater than the length of the array and the loop will exit.

`forEach()` has a few advantages over using a `for` loop. First, it's quicker to write and easier to read. Secondly, JavaScript has function scope, but not block scope. This means that `number` in our first example is scoped only to our callback function, whereas `i` is accessible outside of the loop body, which is the global scope in this case. The latter could have some unintended consequences.

`forEach()` is the foundation for many of the other methods we'll explore today and you can accomplish much of the same functionality with `forEach()` that other methods specialize in. That said, just because you _can_ use it, it doesn't mean it's the best choice and that you _should_ use it. More on this later.

### Your turn

Let's put on our imagination caps and make believe we're building a photo gallery that pulls images from the Instagram API. We did the hard work and mocked it out for you.

If you head on over to the [forEach demo][forEach] in the Advanced JS repo, you'll see that we have written code to cache 16 photographs from the Instagram API and stored them in the `photographs` array. We have also created a pair of simple functions for appending them to the DOM. If you're curious, here is what the code looks like (see [_setup.js][forEach setup]):

[forEach]: https://github.com/stevekinney/advanced-js-fundamentals-ck/tree/gh-pages/demos/array-prototype-methods/01-forEach

[forEach setup]: https://github.com/stevekinney/advanced-js-fundamentals-ck/blob/gh-pages/demos/array-prototype-methods/01-forEach/_setup.js

```js
var photographsDiv = document.getElementById('photographs');

function createImageElementFromPhotograph(photograph) {
  var image = document.createElement('img');
  image.alt = photograph.caption.text;
  image.src = photograph.images.low_resolution.url;
  image.className = "instagram-image";
  return image;
}

function addInstagramImageToThePage(photograph) {
  var newImage = createImageElementFromPhotograph(photograph);
  photographsDiv.appendChild(newImage);
}
```

Your job is to iterate over the array of photographs and call `addInstagramImageToThePage()` on each one: put your code in `01-forEach/script.js`.

If you finish early, try the following:

* Write your own function to render a photograph inside a DOM element and render it to the DOM. The URL of the image in each case is stored in the `photograph.images.low_resolution.url` property.

## Array.prototype.map

`forEach()` will iterate through each element in an array and pass that element to an anonymous function. It's not uncommon that we find ourselves in a position where we need to transform the contents of an array.

In theory, we could use `forEach()` like this:

```js
const letters = ['a', 'b', 'c'];
const uppercaseLetters = [];

letters.forEach(function (letter) {
  const uppercaseLetter = letter.toUpperCase();
  uppercaseLetters.push(uppercaseLetter);
});

console.log(uppercaseLetters);
```

This will work. The `console.log` statement will log `['A', 'B', 'C']` — we've mapped each element in the array to its uppercase equivalent. However, JavaScript's `Array` provides us with a better way to do this — [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2Fmap):

```js
const letters = ['a', 'b', 'c'];

const uppercaseLetters = letters.map(function (letter) {
  return letter.toUpperCase();
});

console.log(uppercaseLetters);
```

The example above will give us the same result as the one before it: `['A', 'B', 'C']`. That said, it's about half the length and doesn't involve mutating an existing array.

Like `forEach()`, `map()` accepts an anonymous function that it calls on each element of the array it's called on. `forEach()` returns `undefined` when its finished. `map()`, on the other hand, returns a new array made up of the values returned by the callback function on each iteration.

### Your turn

The Instagram API returns a lot of information about each photograph. Here is the information for a single photograph:

```js
{
  "attribution": null,
  "tags": [
    "cute",
    // additional tags omitted for brevity…
  ],
  "type": "image",
  "location": null,
  "comments": {
    "count": 0,
    "data": []
  },
  "filter": "Crema",
  "created_time": "1434910534",
  "link": "https://instagram.com/p/4M24o2IPW1/",
  "likes": {
    "count": 1,
    "data": [
      {
        "username": "thiago_artwork",
        "profile_picture": "https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-19/11410486_492673490883809_1952978378_a.jpg",
        "id": "387386769",
        "full_name": "Thiago Villas Boas"
      }
    ]
  },
  "images": {
    "low_resolution": {
      "url": "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e15/11417453_831691666899875_2026130128_n.jpg",
      "width": 320,
      "height": 320
    },
    "thumbnail": {
      "url": "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s150x150/e15/11417453_831691666899875_2026130128_n.jpg",
      "width": 150,
      "height": 150
    },
    "standard_resolution": {
      "url": "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e15/11417453_831691666899875_2026130128_n.jpg",
      "width": 640,
      "height": 640
    }
  },
  "users_in_photo": [],
  "caption": {
    "created_time": "1434910534",
    "text": "Dressed up for the BBQ! #Frodo #Dog #Lab #Labrador #LabradorPuppy #Puppy #Puppies #Cute #BowTie #FathersDay #Barbecue @davejn87",
    "from": {
      "username": "holly_afc",
      "profile_picture": "https://igcdn-photos-h-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-19/11357379_508399145976207_186974738_a.jpg",
      "id": "470167108",
      "full_name": "Holly Nunn"
    },
    "id": "1012425404278961457"
  },
  "user_has_liked": false,
  "id": "1012425402911618485_470167108",
  "user": {
    "username": "holly_afc",
    "profile_picture": "https://igcdn-photos-h-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-19/11357379_508399145976207_186974738_a.jpg",
    "id": "470167108",
    "full_name": "Holly Nunn"
  }
}
```

That's a lot of data and we're not using the vast majority of it. In the previous example, we only needed the caption text and the URL for the low resolution version of the image.

As we've seen, `map()` is really good at transforming data. Try solving the following problems, writing your solutions into `demos/array-prototype-methods/02-map/script.js`:

* Create an array called `simplifiedPhotographs` that takes `photographs` and transforms each one into an object with only two properties: `caption` and `url`.
* Create an array called `photographElements` that takes `simplifiedPhotographs` and transforms each one into a DOM element.

Tests have been provided in `demos/array-prototype-methods/02-map/tests.js` to help guide your progress and let you know if you've got it right.

As a bonus, you can try the following in `01-forEach`:

* Map each photo into a DOM element and then chain `forEach()` that adds a click event listener using [`document.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
* Add each image element to the DOM manually.

## Array.prototype.filter

[`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), like `map()`, returns a new array based on the return value of the callback function you pass it. The mechanics, however, differ slightly.

`filter()` will include an element in the new array if return value is truthy and omit it if the return value is falsy.

What makes a value truthy or falsy? Let's start with the easy ones: `true` is truthy and `false` is falsy. `0`, `null`, `undefined`, `NaN`, and an empty string are all falsy as well. Everything else is truthy.

Let's start with a simple example:

```js
const booleans = [true, true, false, true];

const truths = booleans.filter(function (value) {
  return value;
});

console.log(truths); // Logs [true, true, true]
```

As you can see in the example above, `false` is omitted from the resulting array. This works, but it's not very useful. Let's look at something slightly more interesting:

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
  { name: 'Ringo', living: true, instruments: ['drums', 'bongos'] },
];

const livingBeatles = beatles.filter(function (beatle) {
  return beatle.living;
});

const guitarPlayingBeatles = beatles.filter(function (beatle) {
  return beatle.instruments.indexOf('guitar') !== -1;
});
```

### Your turn

You're welcome. For what? Well, it turns out that the Instagram API supports videos as well as images. Up until now, we've been filtering those videos out for you. You know how to use filter now however so you don't need us doing it for you anymore.

Assuming that `instagramAPI.data` is a collection of both photographs and videos, write solutions to the following problems in `demos/array-prototype-methods/03-filter/script.js`:

* Filter out just the photographs and store them in a variable called `photographs`.
* Filter out just the videos and store them in a variable called `videos`.
* Filter out all of the photographs that don't have any likes and store the remaining photographs into a variable called `popularPhotographs`.

Here are some helpful hints:

* All of the photogtaphs have a `type` property that is set to `"image"`.
* All of the videos have a `type` property that is set to `"video"`.
* All of the photographs have a property called `likes`, which has a property called `count`.

As long as we're taking off the training wheels, you're on your own for adding them to the DOM as well. Take a look at the code we provided you earlier if you need some inspiration for how to create a DOM element and add it to the page.

You may want to consider using one (or more) of the `Array.prototype` methods we covered earlier when adding the photogtaph to the DOM.

## Array.prototype.reduce

[`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FReduce) is a lot like `map()`, but with one important distinction: it returns one single value as opposed to an array of new values. Consider this example:

```js
const numbers = [1, 2, 3];

const sum = numbers.reduce(function (total, number) {
  return total + number;
}, 0);

console.log(sum); // Logs 6
```

You might notice that we have a second argument after our anonymous function. In the example above, we passed `0`. The second argument is the starting value of the accumulator (`total` in this case). It doesn't have to be a number. You could pass in an empty array or even an object that you want to work with.

If we wanted to—and we're not sure that we ever would—we could implement `map()` using `reduce()`:

```js
const letters = ['a', 'b', 'c'];

const capitalLetters = letters.reduce(function (newArray, letter) {
  newArray.push(letter.toUpperCase());
  return newArray;
}, []);

console.log(capitalLetter); // Logs ["A", "B", "C"]
```

The second argument that we pass to the `reduce()` method is an empty array, which is then set as the initial value for `newArray`. Next, we push in a capital version of the current letter. [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2Fpush) returns the current length of the array after the new element has been pushed in, so we have to explicitly return `newArray` to pass it along to the next iteration in our `reduce()`.

### Your turn

In the same fashion as before, head over to `demos/array-prototype-methods/04-reduce/script.js` and write solutions to the following problems.

#### Part One

We saw before that each photo/video has a count for the number of likes stored in `likes.count`. What is the total number of likes for all of the photos/videos fetched from the API?

#### Part Two

It's time to up the ante a bit. Many of the photographs have tags. It would be cool if we could count up how many times each tag appeared in the API response. Ideally, it would look something like this:

```js
{
  firstTag: 4,
  secondTag: 3,
  thirdTag: 2
}
```

If you recall from the `map` exercise, each photo/video has a property called `tags`, which — coincidentally — is an array of all of the tags in the caption.

```js
{
  "attribution": null,
  "tags": [
    "love",
    "family",
    "bulldog",
    "fathersday",
    "bulldogsofig",
    "bulldogs",
    "puppies",
    "daddy",
    "loveyou"
  ],
  "type": "image",
  // more properties here…
  "images": {
      // all the different resolutions live here…
    }
  },
  // even more properties live here…
}
```

Given an API response stored in `instagramAPI.data`, can you count up the number of times each tag appears? We have provided you with some tests in `04-reduce` to help guide you in your implementation.

## Array.prototype.sort

[`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) will sort all of the elements in the array. We can invoke it without a callback function.

```js
const numbers = [2, 1, 4, 3];
const letters = ['a', 'd', 'c', 'b'];

const sortedNumbers = numbers.sort();
const sortedLetters = letters.sort();

console.log(sortedNumbers); // Logs [1, 2, 3, 4]
console.log(sortedLetters); // Logs ['a', 'b', 'c', 'd']
```

Without a callback function, `sort()` uses a default sorting algorithm that simply sorts the array items in ascending order. In the examples above, everything works the way we would expect, but there are some surprising peculiarities of the default sorting algorithm. Consider the following example:

```js
const numbers = [1, 7, 3, 10];

const sortedNumbers = numbers.sort();

console.log(sortedNumbers); // Logs [1, 10, 3, 7]
```

Unless you've encountered a similar example in the past, `[1, 10, 3, 7]` is probably not what you were expecting the `sort()` method to return. By default, JavaScript uses lexicographical sorting. You can think of it as alphabetical sorting. 7 may come before 10 numerically, but 10 comes first lexicographically.

So, how do we sort numbers then? `Array.prototype.sort()` also accepts a callback function that it will use to evalute the order of the elements in the new array it returns.

The callback function compares two elements at a time and the `sort()` method rearranges the elements based on a value returned by the callback function.

* If the value returned is `0` then sort leaves both elements in the same place.
* If the value returned is negative, then the first element is placed before the second element.
* If the value returned is positive, then the second element is placed before the first element.

Armed with this new knowledge, let's see if we can sort an array of numbers — umm — numerically.

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

const sortedBeatles = beatles.sort(function (a, b) {
  return b.instruments.length - a.instruments.length;
}).map(function (beatle) {
  return beatle.name;
});

console.log(sortedBeatles); // Logs ['Paul', 'John', 'George', 'Ringo']
```

### Your turn

As we saw earlier: not only were the fine folks at Instagram nice enough to give us a tidy array of all of the tags for a given photograph or video, they also tallied up all of "likes" it received.

```js
console.log(instagramAPI.data[2].likes.count); // Logs 7
```

We want to know what the cool kids are into. Can you sort the photos and videos by the number of times it was liked? The most liked photo or video should be first and the least liked photo or video should be last.
