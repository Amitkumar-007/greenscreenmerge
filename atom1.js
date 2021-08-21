  var fgImage = null;
  var bgImage = null;
  var fgCanvas;
  var bgCanvas;

  function loadforeground() {
    var file = document.getElementById("fore");
    fgImage = new SimpleImage(file);
    fgCanvas = document.getElementById("can1");
    fgImage.drawTo(fgCanvas);
  }

  function loadbackground() {
    var file = document.getElementById("back");
    bgImage = new SimpleImage(file);
    bgCanvas = document.getElementById("can2");
    bgImage.drawTo(bgCanvas);
  }

  function createComposite() {
    // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
    var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
    var greenThreshold = 240;
    for (var pixel of fgImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      if(x>=bgImage.getWidth())
      continue;
      if(y>=bgImage.getHeight())
      continue;
      if (pixel.getGreen() > greenThreshold) {
        //pixel is green, use background
        var bgPixel = bgImage.getPixel(x,y);
        output.setPixel(x,y,bgPixel);
      }
      else {
        //pixel is not green, use foreground
        output.setPixel(x,y,pixel);
      }
    }
    return output;
  }

  function merge() {
    //check that images are loaded
    if (fgImage == null  || ! fgImage.complete()) {
      alert("Foreground image not loaded");
    }
    if (bgImage == null || ! bgImage.complete()) {
      alert("Background image not loaded");
    }
    // clear canvases
    show();
    // call createComposite, which does green screen algorithm and returns a composite image
    var finalImage = createComposite();
    finalImage.drawTo(fgCanvas);
  }

  function show() {
    doClear(fgCanvas);
    doClear(bgCanvas);
  }

  function doClear(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
  }
