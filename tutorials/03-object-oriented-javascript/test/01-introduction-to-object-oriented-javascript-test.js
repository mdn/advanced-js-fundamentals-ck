if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var Dog = require('../01-introduction-to-object-oriented-javascript.js');
}

describe('03 - Object Oriented JavaScript', function () {
  describe('Introduction to OO JavaScript', function () {
    describe('sayGoodbye', function () {
      it('bids farewell', function () {
        var fido = new Dog('Fido');

        expect(fido.sayGoodbye()).to.include('Goodbye');
      });
    });
  });
});
