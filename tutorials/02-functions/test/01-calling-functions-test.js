if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var doubleNumber = require('../01-calling-functions.js');
  var timesTwo = require ('../01-calling-functions.js');
}

describe('02 - Functions', function () {
  describe('Calling functions', function () {
    describe('doubleNumber', function () {
      it('doubles the number given to it', function () {
        expect(doubleNumber(2)).to.equal(4);
      });
    });

    describe('timesTwo', function () {
      it.skip('is a reference to the doubleNumber() function', function () {
        expect(typeof timesTwo).to.equal("function");
        expect(timesTwo.name).to.equal("doubleNumber");
      });

      it.skip('doubles the number given to it', function () {
        expect(timesTwo(2)).to.equal(4);
      });
    });
  });
});
