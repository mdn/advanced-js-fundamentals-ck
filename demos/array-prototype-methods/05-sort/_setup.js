var photographs = instagramAPI.data.filter(function (asset) {
  return asset.type === 'image';
}).slice(0, 16);

var photographsDiv = document.getElementById('photographs');

function createImageElementFromPhotograph(photograph) {
  var image = document.createElement('img');
  image.alt = photograph.caption.text;
  image.src = photograph.images.low_resolution.url;
  image.className = "instagram-image";
  return image;
}

function addInstagramImageToThePage(photograph) {
  var newImage = createImageElementFromPhotograph(photograph);
  photographsDiv.appendChild(newImage);
}
