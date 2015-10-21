function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function (addend) {
  this.value += addend;
  return this;
};

Calculator.prototype.subtract = function (subtrahend) {
  this.value -= subtrahend;
  return this;
};

Calculator.prototype.multiplyBy = function (factor) {
  this.value *= factor;
  return this;
};

Calculator.prototype.divideBy = function (divisor) {
  this.value /= divisor;
  return this;
};

