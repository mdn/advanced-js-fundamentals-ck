if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var Partials = require('../02-currying-and-partial-application.js');
  var addOne = Partials.addOne;
  var subtractThree = Partials.subtractThree;
  var doubleNumber = Partials.doubleNumber;
  var halveNumber = Partials.halveNumber;
}

describe('02 - Functions', function () {
  describe('Partials', function () {
    it.skip('has a function that adds 1 to a number', function () {
      expect(addOne(5)).to.equal(6);
    });

    it.skip('has a function that subtracts 3 from a number', function () {
      expect(subtractThree(5)).to.equal(2);
    });

    it.skip('has a function that doubles a number', function () {
      expect(doubleNumber(5)).to.equal(10);
    });

    it.skip('has a function that halves a number', function () {
      expect(halveNumber(5)).to.equal(2.5);
    });
  });
});
