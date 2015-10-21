if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var Calculator = require('../02-building-a-chainable-api.js');
}

describe('03 - Object Oriented JavaScript', function () {
  describe('Chainable API', function () {
    describe('Calculator', function () {
      describe('simple calculations', function () {
        it.skip('multiplyBy', function () {
          var calculator = new Calculator(3);

          expect(calculator.multiplyBy(2).value).to.equal(6);
        });

        it.skip('divideBy', function () {
          var calculator = new Calculator(12);

          expect(calculator.divideBy(4).value).to.equal(3);
        });
      });

      describe('chaining', function () {
        it.skip('can chain methods together', function () {
          var calculator = new Calculator(14);

          expect(calculator.subtract(4).multiplyBy(2).divideBy(4).value).to.equal(5);
        });
      });
    });
  });
});
