if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var Partials = require('../02-currying-and-partial-application.js');
  var addOne = Partials.addOne;
  var subtractThree = Partials.subtractThree;
  var doubleNumber = Partials.doubleNumber;
  var halveNumber = Partials.halveNumber;

  var Currying = require('../02-currying-and-partial-application.js');
  var prefixLog = Currying.prefixLog;
  var dangerLog = Currying.dangerLog;
  var successLog = Currying.successLog;
}

describe('02 - Functions', function () {
  describe('Partial Application', function () {
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

  describe('Currying', function () {
    describe('prefixLog', function () {
      it.skip('should return a function', function () {
        expect(typeof prefixLog('PREFIX')).to.equal('function');
      });

      it.skip('should return a function that accepts a message and uses the prefix', function () {
        var prefixWithPrefix = prefixLog('PREFIX');
        expect(prefixWithPrefix('message')).to.equal('PREFIX: message');
      });
    });

    describe('dangerLog', function () {
      it.skip('should prefix a message with DANGER:', function () {
        expect(dangerLog('Oh no')).to.equal('DANGER: Oh no');
      });
    });

    describe('successLog', function () {
      it.skip('should prefix a message with SUCCESS:', function () {
        expect(successLog('Oh no')).to.equal('SUCCESS: Oh no');
      });
    });
  });
});
