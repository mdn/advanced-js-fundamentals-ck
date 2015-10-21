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

      it('adds values', function () {
        var calculator = new Calculator(4);
        assert(calculator.add(2), 6);
      });

    });

    describe('.subtract', function () {

      it('has an subtract method', function () {
        var calculator = new Calculator(42);
        assert(calculator.subtract);
      });

      it('subtracts values', function () {
        var calculator = new Calculator(4);
        assert(calculator.subtract(2), 2);
      });

    });

    describe('.multiplyBy', function () {

      it('has an multiplyBy method', function () {
        var calculator = new Calculator(42);
        assert(calculator.multiplyBy);
      });

      it('multiplies values', function () {
        var calculator = new Calculator(4);
        assert(calculator.multiplyBy(2), 8);
      });

    });

    describe('.divideBy', function () {

      it('has an divideBy method', function () {
        var calculator = new Calculator(42);
        assert(calculator.divideBy);
      });

      it('divides values', function () {
        var calculator = new Calculator(4);
        assert(calculator.divideBy(2), 2);
      });

    });

  });

  describe('Chainable API', function () {

    describe('.add', function () {

      it('can add to the internal value', function () {
        var calculator = new Calculator(2);
        calculator.add(2);
        assert.equal(calculator.value, 4);
      });
    });

    describe('.subtract', function () {
      it('has a subtract method', function () {
        var calculator = new Calculator(42);
        assert(calculator.subtract);
      });

      it('can subtract from the internal value', function () {
        var calculator = new Calculator(4);
        assert.equal(calculator.subtract(2).value, 2);
      });
    });

    describe('.multiply', function () {
      it('has a multiply method', function () {
        var calculator = new Calculator(5);
        assert(calculator.multiplyBy);
      });

      it('can multiply from the internal value', function () {
        var calculator = new Calculator(4);
        assert.equal(calculator.multiplyBy(3).value, 12);
      });
    });

    describe('.divide', function () {
      it('has a divide method', function () {
        var calculator = new Calculator(4);
        assert(calculator.divideBy);
      });

      it('can divide from the internal value', function () {
        var calculator = new Calculator(6);
        assert.equal(calculator.divideBy(2).value, 3);
      });

      describe('chaining', function () {

        it('can perform multiple operations', function () {
          var calculator = new Calculator(4);
          calculator.add(2).subtract(2).multiplyBy(2).divideBy(2);
          assert.equal(calculator.value, 4);
        });
      });

    });

  });
});
