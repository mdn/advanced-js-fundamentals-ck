describe('prefixLog - Currying', function () {

  // Only unskip this test if you are using trying to use partial application.

  it.skip('should prefix a message', function () {
    assert.equal(prefixLog('PREFIX', 'message'), 'PREFIX: message');
  });

});

describe('prefixLog - Currying', function () {

  // Only unskip these tests if you are using trying to use currying.

  it.skip('should return a function', function () {
    assert.equal(typeof prefixLog('PREFIX'), 'function');
  });

  it.skip('should return a function that accepts a message and uses the prefix', function () {
    var prefixWithPrefix = prefixLog('PREFIX');
    assert.equal(prefixWithPrefix('message'), 'PREFIX: message');
  });

});

describe('dangerLog', function () {

  it.skip('should prefix a message with DANGER:', function () {
    assert.equal(dangerLog('Oh no'), 'DANGER: Oh no');
  });

});

describe('successLog', function () {

  it.skip('should prefix a message with SUCCESS:', function () {
    assert.equal(successLog('Oh no'), 'SUCCESS: Oh no');
  });

});
