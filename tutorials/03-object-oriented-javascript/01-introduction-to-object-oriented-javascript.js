function Dog(name) {
  this.name = name;
}

Dog.prototype.sayHello = function () {
  return 'Hello, my name is ' + this.name + '.';
};

if (typeof window === 'undefined') {
  module.exports = Dog;
}
