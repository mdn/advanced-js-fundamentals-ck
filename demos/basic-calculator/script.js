function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function (addend) {
  this.value += addend;
  return this;
}
