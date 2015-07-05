describe('totalLikes', function () {

  it('be the sum the likes for all of the photographs', function () {
    assert.equal(totalLikes, 71);
  });

});

describe('popularTags', function () {

  it.skip('is an object with keys', function () {
    assert(!!Object.keys(popularTags).length);
  });

  it.skip('has the correct number of tags', function () {
    assert.equal(Object.keys(popularTags).length, 229);
  });

  it.skip('has the correct count for the tags', function () {
    assert.equal(popularTags.love, 6);
    assert.equal(popularTags.family, 1);
  });

});
