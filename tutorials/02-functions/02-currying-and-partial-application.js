function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Use partial application to finish the following:

var addOne;
var subtractThree;
var doubleNumber;
var halveNumber;

// Create a function called `prefixLog` that takes a prefix as an argument and uses
// partial application and/or currying to return a function that takes a message and
// adds the prefix to the beginning of the message.

function prefixLog() {}

// Implement a `dangerLog` function that takes a message and prefixes it with `DANGER:`.
// Implement a `successLog` function that takes a message and prefixes it with `SUCCESS:`.

var dangerLog;
var successLog;

if (typeof window === 'undefined') {
  module.exports = {
    addOne: addOne,
    subtractThree: subtractThree,
    doubleNumber: doubleNumber,
    halveNumber: halveNumber,
    dangerLog: dangerLog,
    successLog: successLog,
  };
}
