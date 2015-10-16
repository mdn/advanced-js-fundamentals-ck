
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

Some of the files to write your answers have already been created, but are not
yet properly filled out to pass the tests. For example,

```sh
tutorials/02-functions/calling_functions.js
```

Is where you should write your answers to the test file

```sh
tutorials/02-functions/test/calling_functions_test.js
```

And includes the work to be completed from

```sh
tutorials/02-functions/01-calling-functions.md
```
