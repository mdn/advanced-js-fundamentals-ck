function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function (addend) {
  return this.value + addend;
};

Calculator.prototype.subtract = function (subtrahend) {
  return this.value - subtrahend;
};

module.exports = Calculator;
