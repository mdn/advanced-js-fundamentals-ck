var expect = require('chai').expect;
var doubleNumber = require('../calling_functions.js');
var timesTwo = require ('../calling_functions.js');

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
