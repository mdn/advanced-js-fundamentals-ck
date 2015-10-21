function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

var addOne;
var subtractThree;
var doubleNumber;
var halveNumber;

if (typeof window === 'undefined') {
  module.exports = {
    addOne: addOne,
    subtractThree: subtractThree,
    doubleNumber: doubleNumber,
    halveNumber: halveNumber,
  };
}
