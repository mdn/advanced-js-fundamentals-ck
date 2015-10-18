
# Advanced JavaScript fundamentals content kit
Very much in draft right now.

This is the Advanced JavaScript Fundamentals Content Kit. It contains everything you need to present/teach several lessons on advanced Js techniques.

To get started, visit [This project's index file.](http://mdn.github.io/advanced-js-fundamentals-ck/).

You can get much more detailed instructions on writing a content kit from our [Making a new content kit guide](http://chrisdavidmills.github.io/content-kit-guide/).

---

#### Testing

Mocha is used for testing each of the tutorial sections. If you don't have
`mocha` installed, run the command `npm install -g mocha`.

Chai is an assertion library. We are using it to write the tests in an `expect`
format. To install `chai` for this repo, run

```sh
npm install
```

You should now be able to run `npm test` from the main directory and see the
failing and pending tests.

Each folder in [tutorials](https://github.com/mdn/advanced-js-fundamentals-ck/tree/gh-pages/tutorials)
has a `test` folder. You can run tests for a specific tutorial section by
changing into that directory and running `mocha`. For example,

```sh
cd tutorials/02-functions
mocha
```

[Some](#contributing) of the files to write your answers have already been created, but are not
yet properly filled out to pass the tests. For example,

```sh
tutorials/02-functions/01-calling-functions.js
```

Is where you should write your answers to the test file

```sh
tutorials/02-functions/test/01-calling-functions-test.js
```

And includes the work to be completed from

```sh
tutorials/02-functions/01-calling-functions.md
```

#### Contributing

Not all of the tutorial tests have been written. All of the tutorials that are
currently tested will have a corresponding `js` file named similarly to the `md`
file, as noted above. If you would like to add a test and starter file of your
own for one of the topics, please do the following:

Fork the repo and create a new branch with the name of the tutorial section you
will be contributing to.

```sh
git checkout -b calling-functions
```

Create the corresponding test and start files for that tutorial, making sure to
use `kebab-case` rather than `snake_case` for the file names.

```sh
touch tutorials/02-functions/01-calling-functions.js
touch tutorials/02-functions/test/01-calling-functions-test.js
```

Don't forget to also add these new files as `<script>` tags in the tutorial's
`index.html` file, located in each tutorial folder.

```html
<script src="01-calling-functions.js"></script>

<script src="test/01-calling-functions-test.js"></script>
```

Include the necessary setup variables in the starter file to at least make your
tests fail with a message rather than producing an error.

```javascript
function doubleNumber(number) {
}

var timesTwo;

if (typeof window === 'undefined') {
  module.exports = timesTwo;
  module.exports = doubleNumber;
}
```

And then of course write your tests in the test file.

```javascript
if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var doubleNumber = require('../01-calling-functions.js');
  var timesTwo = require ('../01-calling-functions.js');
}

describe('Calling functions', function () {
  ...
});
```

Please note the `if (typeof window === 'undefined')` statement in both of these
files. The statement surrounds the `module.exports` portion of the starter file
and the `require` statements of the test file. The reason for this `if`
statement is to ensure that the `mocha` tests will run both from the command
line and in the browser, depending on the user's preference.

Once you have completed your tests, commit your code to your branch and create a
[pull-request](https://github.com/mdn/advanced-js-fundamentals-ck/compare).

Please [leave an issue](https://github.com/mdn/advanced-js-fundamentals-ck/issues/new)
if you have any questions or would like help contributing to this repository.
