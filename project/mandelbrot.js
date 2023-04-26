//*****utilitary */
function drawPixel(context, x, y, color) {
	var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.fillStyle = color || '#000';
  	context.fillRect(roundedX, roundedY, 1, 1);
    //console.log(color);
}
function map(value, minIn, maxIn, minOut, maxOut){
    return ((value-minIn)/ (maxIn-minIn) * (maxOut-minOut) + minOut);
}

/*******constants & general*/
const canvas = document.querySelector('canvas');
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
});
simulateMandelbrot(); //generate on page load

/*******main simulators */
function simulateMandelbrot(){
    var context = canvas.getContext('2d');
    var maxIterations = parseInt(document.getElementById("iteration-number").value);
    var maxIterationsAllowed = parseInt(document.getElementById("iteration-number").max);
    var minIterationsAllowed = parseInt(document.getElementById("iteration-number").min);
    document.getElementById("mandelbrot-error-message").value = "";
    if( maxIterations > maxIterationsAllowed) {
        document.getElementById("mandelbrot-error-message").value = 
        "Too many iterations!"
        +" Mandelbrot could not be generated..."
        +"\nChoose a value under " + maxIterationsAllowed + " iterations per pixel";
        return;
    }
    else if( maxIterations < minIterationsAllowed) {
        document.getElementById("mandelbrot-error-message").value = 
        "Negative iteration number!"
        +" Mandelbrot could not be generated..."
        +"\nChoose a positive value of iterations per pixel";
        return;
    }
    var zoom = parseFloat(document.getElementById("mandelbrot-zoom-value").value);
    var centerX = parseFloat(document.getElementById("mandelbrot-x-value").value);
    var centerY = - parseFloat(document.getElementById("mandelbrot-y-value").value);
    var invertColours = false;
    if (document.getElementById("select-inverted").value == "true"){
        invertColours = true;
    }
    var colourCheck = document.getElementsByName('mandelbrot-colour');
              
    var colourScheme = 'black';
    for(i = 0; i < colourCheck.length; i++) {
        if(colourCheck[i].checked) { 
            colourScheme = colourCheck[i].value;}
    }
    var width = canvas.width;
    var height = canvas.height;
    var mandelbrotSize = 2.0/zoom;
    var bound = 4;

    var mandelbrotMinX = - mandelbrotSize + centerX;
    var mandelbrotMaxX = mandelbrotSize + centerX;
    var mandelbrotMinY = - mandelbrotSize + centerY;
    var mandelbrotMaxY = mandelbrotSize + centerY;
    setXYSlidersMinMax(mandelbrotMinX, mandelbrotMaxX, - mandelbrotMaxY, - mandelbrotMinY);

    // Create an ImageData object
    var imagedata = context.createImageData(width, height);

    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++) {

            //real and imaginary parts of z
            var a = map(x, 0, width, mandelbrotMinX, mandelbrotMaxX);
            var b = map(y, 0, height, mandelbrotMinY, mandelbrotMaxY);
            //real and imaginary parts of c
            var ca = a;
            var cb = b;

            var n = 0;
            while(n < maxIterations){
                //calculate z^2 + c
                var sqra = a*a - b*b;
                var sqrb = 2*a*b;
                a = sqra + ca;
                b = sqrb + cb;
                //check if absolute value remains bounded
                if (a*a + b*b > bound){
                    break;
                }
                n++;
            }

            var color = 'black';
            if (n == maxIterations) {
                color = colourScheme
                if (invertColours){ 
                    switch (colourScheme){
                        case 'red':
                            color = 'white';
                            break;
                        case 'blue':
                            color = 'black';
                            break;
                    }
                }
            }
            else {
                var proportion = Math.sqrt(n/maxIterations);
                if (!invertColours){ 
                    proportion = 1 - proportion;
                }
                var r = Math.round(map(proportion, 0, 1, 0, 255));
                var g = Math.round(map(proportion, 0, 1, 0, 255));
                var b = Math.round(map(proportion, 0, 1, 0, 255));
                switch (colourScheme){
                    case 'red':
                        r = 255;
                        break;
                    case 'blue':
                        b = 255;
                        break;
                    case 'green':
                        g = 255;
                        break;
                }
                color = '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');
            }
            drawPixel(context, x, y, color);
        }
    }
    console.log("mandelbrot generated");
}

function showZoomValue(newValue){document.getElementById("mandelbrot-zoom-value").value = newValue;}
function showXValue(newValue){document.getElementById("mandelbrot-x-value").value = newValue;}
function showYValue(newValue){document.getElementById("mandelbrot-y-value").value = newValue;}

function setXYSlidersMinMax(newMinX, newMaxX, newMinY, newMaxY){
    document.getElementById("mandelbrot-x").min = newMinX;
    document.getElementById("mandelbrot-x").max = newMaxX;
    document.getElementById("mandelbrot-y").min = newMinY;
    document.getElementById("mandelbrot-y").max = newMaxY;
    newX = (newMaxX + newMinX)/2;
    newY = (newMaxY + newMinY)/2;
    setXYSliders( newX.toFixed(3), newY.toFixed(3));
}
function setXYSliders(newX, newY){
    document.getElementById("mandelbrot-x").value = newX;
    document.getElementById("mandelbrot-y").value = newY;
    showXValue(newX);
    showYValue(newY);
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left)*scaleX;
    const y = (event.clientY - rect.top)*scaleY;
    const zoom = parseFloat(document.getElementById("mandelbrot-zoom-value").value);
    const mandelbrotSize = 2.0/zoom;
    const newX = map(x, 0, canvas.width, -mandelbrotSize, mandelbrotSize)+ getSliderCenterX();
    const newY = map(y, 0, canvas.height, mandelbrotSize, -mandelbrotSize)+ getSliderCenterY();
    setXYSliders(newX.toFixed(3), newY.toFixed(3));
}
function getSliderCenterX() {
    var min = parseFloat(document.getElementById("mandelbrot-x").min);
    var max = parseFloat(document.getElementById("mandelbrot-x").max);
    return (max + min)/2;
}
function getSliderCenterY() {
    var min = parseFloat(document.getElementById("mandelbrot-y").min);
    var max = parseFloat(document.getElementById("mandelbrot-y").max);
    return (max + min)/2;
}

