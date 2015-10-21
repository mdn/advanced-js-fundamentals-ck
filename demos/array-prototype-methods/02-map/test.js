describe('simplifiedPhotographs', function () {

  it('is an array', function () {
    assert(Array.isArray(simplifiedPhotographs));
  });

  it.skip('contains objects with only caption and url properties', function () {
    simplifiedPhotographs.forEach(function (photograph) {
      assert.deepEqual(Object.keys(photograph), ['caption', 'url']);
    });
  });

  it.skip('contains object with the correct caption', function () {
    simplifiedPhotographs.forEach(function (photograph, index) {
      assert.equal(photograph.caption, photographs[index].caption.text);
    });
  });

  it.skip('contains object with the correct url', function () {
    simplifiedPhotographs.forEach(function (photograph, index) {
      assert.equal(photograph.url, photographs[index].images.low_resolution.url);
    });
  });

});

describe('photographElements', function () {

  it('is an array', function () {
    assert(Array.isArray(photographElements));
  });

  it.skip('contains an array of DOM nodes', function () {
    photographElements.forEach(function (element) {
      assert.ok(element instanceof Node);
    });
  });

  it.skip('contains elements with the correct alt attribute', function () {
    photographElements.forEach(function (element, index) {
      assert.equal(element.alt, photographs[index].caption.text);
    });
  });

  it.skip('contains elements with the correct src attribute', function () {
    photographElements.forEach(function (element, index) {
      assert.equal(element.src, photographs[index].images.low_resolution.url);
    });
  });

});
