(function () {
  window.onload = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = processData;
    request.open('GET', 'file:///C:/Users/cpf5193/Google%20Drive/Practice%20Webpages/imageUrls.txt', true);
    request.send();
  }

  function processData (response) {
    if (this.readyState === 4 && (this.status === 200 || this.status === 0)) {
      var imageUrls = response.target.response.split('\n');
      var i = 0;
      document.querySelector('.carousel-img').setAttribute('src', imageUrls[i]);
      window.setInterval(function () {
        var imageUrl = imageUrls[++i % imageUrls.length];
        document.querySelector('.carousel-img').setAttribute('src', imageUrl);
        resizeImg();
        i++;
      }, 5000);
    }
  }

  function resizeImg () {
    let img = document.querySelector('.carousel-img');
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let imgHeight = img.height;
    let imgWidth = img.width;

    // We compare the ratios of the image dimensions to the window dimensions. We take the difference
    // closest to 0 and use those two dimensions to control the size of the image by multiplying both the
    // width and height of the image by the ratio of closest dimensions
    let dimensionDiffs = [
      imgHeight - windowHeight,
      imgHeight - windowWidth,
      imgWidth - windowHeight,
      imgWidth - windowWidth
    ].map(function (diff) {
      return Math.abs(diff);
    });
    let dimensionRatios = [
      windowHeight / imgHeight,
      windowWidth / imgHeight,
      windowHeight / imgWidth,
      windowWidth / imgWidth
    ];

    let min = Infinity;
    let minIndex = 0;
    for(let i = 0; i < dimensionDiffs.length; i++) {
      if (dimensionDiffs[i] < min) {
        min = dimensionDiffs[i];
        minIndex = i;
      }
    }

    let ratioToMultiply = dimensionRatios[minIndex];
    img.setAttribute('width', img.width * ratioToMultiply);
  }
})();