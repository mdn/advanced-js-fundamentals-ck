describe('photographs', function () {

  it('is an array', function () {
    assert(Array.isArray(photographs));
  });

  it.skip('should only contain photographs', function () {
    photographs.forEach(function (photograph) {
      assert.equal(photograph.type, 'image');
    });
  });

});

describe('videos', function () {

  it('is an array', function () {
    assert(Array.isArray(videos));
  });

  it.skip('should only contain videos', function () {
    videos.forEach(function (video) {
      assert.equal(video.type, 'video');
    });
  });

});

describe('popularPosts', function () {

  it('is an array', function () {
    assert(Array.isArray(popularPhotographs));
  });

  it.skip('does not contain any posts with zero likes', function () {
    popularPhotographs.forEach(function (photograph) {
      assert.notEqual(photograph.likes.count, 0);
    });
  });

});

describe('Adding Photographs to the DOM', function () {

  var photographsDiv = document.getElementById('photographs');

  it.skip('should have the same number of children as the photographs array', function () {
    assert.equal(photographsDiv.childElementCount, photographs.length);
  });

});
