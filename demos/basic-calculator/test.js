describe('Calculator', function () {

  it('instantiates a new object', function () {
    assert(new Calculator());
  });

  it('holds a value', function () {
    var calculator = new Calculator(42);
    assert.equal(calculator.value, 42);
  });

  describe('.add', function () {
    it('has an add method', function () {
      var calculator = new Calculator(42);
      assert(calculator.add);
    });

    it('can add to the internal value', function () {
      var calculator = new Calculator(2);
      calculator.add(2);
      assert.equal(calculator.value, 4);
    });
  });

  describe('.subtract', function () {
    it.skip('has an add method', function () {
      var calculator = new Calculator(42);
      assert(calculator.subtract);
    });

    it.skip('can subtract from the internal value', function () {
      var calculator = new Calculator(4);
      assert.equal(calculator.subract(2).value, 2);
    });
  });

  describe('.multiply', function () {
    // Implement your tests here.
  });

  describe('.divide', function () {
    // Implement your tests here.
  });

});
