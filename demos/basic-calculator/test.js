describe('Calculator', function () {

  it('instantiates a new object', function () {
    assert(new Calculator());
  });

  it('holds a value', function () {
    var calculator = new Calculator(42);
    assert.equal(calculator.value, 42);
  });

  describe('Basic API', function () {

    describe('.add', function () {

      it('has an add method', function () {
        var calculator = new Calculator(42);
        assert(calculator.add);
      });

      it.skip('adds values', function () {
        var calculator = new Calculator(4);
        assert(calculator.add(2), 6);
      });

    });

    describe('.subtract', function () {

      it.skip('has an subtract method', function () {
        var calculator = new Calculator(42);
        assert(calculator.subtract);
      });

      it.skip('subtracts values', function () {
        var calculator = new Calculator(4);
        assert(calculator.subtract(2), 2);
      });

    });

    describe('.multiplyBy', function () {

      it.skip('has an multiplyBy method', function () {
        var calculator = new Calculator(42);
        assert(calculator.multiplyBy);
      });

      it.skip('multiplies values', function () {
        var calculator = new Calculator(4);
        assert(calculator.multiplyBy(2), 8);
      });

    });

    describe('.divideBy', function () {

      it.skip('has an divideBy method', function () {
        var calculator = new Calculator(42);
        assert(calculator.divideBy);
      });

      it.skip('divides values', function () {
        var calculator = new Calculator(4);
        assert(calculator.divideBy(2), 2);
      });

    });

  });

  describe('Chainable API', function () {

    describe('.add', function () {

      it.skip('can add to the internal value', function () {
        var calculator = new Calculator(2);
        calculator.add(2);
        assert.equal(calculator.value, 4);
      });
    });

    describe('.subtract', function () {
      it.skip('has a subtract method', function () {
        var calculator = new Calculator(42);
        assert(calculator.subtract);
      });

      it.skip('can subtract from the internal value', function () {
        var calculator = new Calculator(4);
        assert.equal(calculator.subtract(2).value, 2);
      });
    });

    describe('.multiply', function () {
      // Implement your tests here.
    });

    describe('.divide', function () {
      // Implement your tests here.
    });

    describe('chaining', function () {

      it.skip('can perform multiple operations', function () {
        var calculator = new Calculator(4);
        calculator.add(2).subtract(2).multiplyBy(2).divideBy(2);
        assert.equal(calculator.value, 4);
      });

    });

  });

});
