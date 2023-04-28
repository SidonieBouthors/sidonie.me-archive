/*******constants & general*/
const canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const bound = 4;
const mandelbrotDiam = 2.0;

function mouseDownCanvasEvent(e){ getCursorPosition(canvas, e); }
canvas.addEventListener('mousedown', mouseDownCanvasEvent);

simulate(); //generate on page load

/*******main simulators */
function simulate(){
    if (getMode() == 'Julia') {
        simulateJulia();
    } else {
        simulateMandelbrot();
    }
}

function simulateMandelbrot(){

    var maxIterations = getMaxIterations();
    if (checkMaxIterations(maxIterations)) {return; }
    
    var invertColours = getInvertColours();
    var colourScheme = getColourScheme();

    var zoom = getZoom();
    var centerX = getCenterX();
    var centerY = getCenterY();
    
    var width = canvas.width;
    var height = canvas.height;
    var mandelbrotSize = mandelbrotDiam/zoom;

    var mandelbrotMinX = - mandelbrotSize + centerX;;
    var mandelbrotMaxX = mandelbrotSize + centerX;
    var mandelbrotMinY = - mandelbrotSize + centerY;
    var mandelbrotMaxY = mandelbrotSize + centerY;

    setXYSlidersMinMax();

    var imagedata = context.createImageData(width, height);
    var offset = 0;

    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x){

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

            var [r, g, b] = getColor(n, maxIterations, invertColours, colourScheme);
            
            imagedata.data[offset++] = r;
            imagedata.data[offset++] = g;
            imagedata.data[offset++] = b;
            imagedata.data[offset++] = 255;
        }
    }

    context.putImageData(imagedata, 0, 0);
    console.log("mandelbrot generated");
}

function simulateJulia() {
    
    var maxIterations = getMaxIterations();

    var invertColours = getInvertColours();
    var colourScheme = getColourScheme();
    
    var width = canvas.width;
    var height = canvas.height;
    var mandelbrotSize = 2.0;

    var mandelbrotMinX = - mandelbrotSize;
    var mandelbrotMaxX = mandelbrotSize;
    var mandelbrotMinY = - mandelbrotSize;
    var mandelbrotMaxY = mandelbrotSize;

    var ca =  parseFloat(document.getElementById("constant-real-number").value)
    var cb =  parseFloat(document.getElementById("constant-imaginary-number").value)
    
    var imagedata = context.createImageData(width, height);
    var offset = 0;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++){

            //real and imaginary parts of z
            var a = map(x, 0, width, mandelbrotMinX, mandelbrotMaxX);
            var b = map(y, 0, height, mandelbrotMinY, mandelbrotMaxY);

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

            var [r, g, b] = getColor(n, maxIterations, invertColours, colourScheme);
            
            imagedata.data[offset++] = r;
            imagedata.data[offset++] = g;
            imagedata.data[offset++] = b;
            imagedata.data[offset++] = 255;
        }
    }
    context.putImageData(imagedata, 0, 0);
    console.log("julia generated");
}

function map(value, minIn, maxIn, minOut, maxOut){
    return ((value-minIn)/ (maxIn-minIn) * (maxOut-minOut) + minOut);
}

function getZoom(){ return parseFloat(document.getElementById("mandelbrot-zoom-value").value);}
function getCenterX(){return parseFloat(document.getElementById("mandelbrot-x-value").value);}
function getCenterY(){ return parseFloat(document.getElementById("mandelbrot-y-value").value); }
function getMaxIterations() {return parseInt(document.getElementById("iteration-number").value);}

function getMinX() {
    return parseFloat(document.getElementById("mandelbrot-x").min);}
function getMaxX() {
    return parseFloat(document.getElementById("mandelbrot-x").max);}
function getMinY() {
    return parseFloat(document.getElementById("mandelbrot-y").min);}
function getMaxY() {
    return parseFloat(document.getElementById("mandelbrot-y").max);}

function showZoomValue(newValue){
    document.getElementById("mandelbrot-zoom-value").value = newValue;
    //setXYSlidersMinMax();
    //simulate();
}
function showXYValue(newX, newY, boolX, boolY){
    if (boolX) {
        document.getElementById("mandelbrot-x-value").value = newX;
    }
    if (boolY) {
        document.getElementById("mandelbrot-y-value").value = newY;
    }
    //simulate();
}
function showXValue(newValue){ showXYValue(newValue, 0, true, false);}
function showYValue(newValue){ showXYValue(0, newValue, false, true)}

function setXYSlidersMinMax(){
    var zoom = getZoom();
    var centerX = getCenterX();
    var centerY = getCenterY();
    var mandelbrotSize = mandelbrotDiam/zoom;

    document.getElementById("mandelbrot-x").min = - mandelbrotSize + centerX;
    document.getElementById("mandelbrot-x").max = mandelbrotSize + centerX;
    document.getElementById("mandelbrot-y").min = - mandelbrotSize + centerY;
    document.getElementById("mandelbrot-y").max = mandelbrotSize + centerY;

    console.log("testing");
    if (getCenterX() != centerX){
        console.log("centerX changed");
    }
    if (document.getElementById("mandelbrot-x").value != centerX){
        console.log("centerX slider changed");
    }
    console.log(centerX - ((parseFloat(document.getElementById("mandelbrot-x").min) + parseFloat(document.getElementById("mandelbrot-x").max)) / 2));
    //newX = (newMaxX + newMinX)/2;
    //newY = (newMaxY + newMinY)/2;
    //setXYSliders( centerX.toFixed(3), centerY.toFixed(3));
}
function setXYSliders(newX, newY){
    document.getElementById("mandelbrot-x").value = newX;
    document.getElementById("mandelbrot-y").value = newY;
    showXYValue(newX, newY, true, true);
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left)*scaleX;
    const y = (event.clientY - rect.top)*scaleY;
    const zoom = parseFloat(document.getElementById("mandelbrot-zoom-value").value);
    const mandelbrotSize = 2.0/zoom;
    const newX = map(x, 0, canvas.width, -mandelbrotSize, mandelbrotSize) + getSliderCenterX();
    const newY = map(y, 0, canvas.height, mandelbrotSize, -mandelbrotSize) + getSliderCenterY();
    setXYSliders(newX.toFixed(3), newY.toFixed(3));
    setConstantJulia(x, y);
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
function getInvertColours() {
    var invertColours = false;
    if (document.getElementById("select-inverted").value == "true"){invertColours = true;}
    return invertColours;
}
function getColourScheme(){
    var colourCheck = document.getElementsByName('mandelbrot-colour');
    var colourScheme = 'black';
    for(i = 0; i < colourCheck.length; i++) {
        if(colourCheck[i].checked) { colourScheme = colourCheck[i].value; }
    }
    return colourScheme;
}
function getMode(){
    var modeCheck = document.getElementsByName('mandelbrot-julia-setting');
    var mode = 'Mandelbrot';
    for(i = 0; i < modeCheck.length; i++) {
        if(modeCheck[i].checked) { mode = modeCheck[i].value; }
    }
    return mode;
}

function checkMaxIterations(maxIterations){
    var maxIterationsAllowed = parseInt(document.getElementById("iteration-number").max);
    var minIterationsAllowed = parseInt(document.getElementById("iteration-number").min);
    document.getElementById("mandelbrot-error-message").value = "";
    if( maxIterations > maxIterationsAllowed) {
        document.getElementById("mandelbrot-error-message").value = 
        "Too many iterations!"
        +" Mandelbrot could not be generated..."
        +"\nChoose a value under " + maxIterationsAllowed + " iterations per pixel";
        return true;
    }
    else if( maxIterations < minIterationsAllowed) {
        document.getElementById("mandelbrot-error-message").value = 
        "Negative iteration number!"
        +" Mandelbrot could not be generated..."
        +"\nChoose a positive value of iterations per pixel";
        return true;
    }
    return false;
}
function setConstantJulia(x, y){
    const mandelbrotSize = 2.0;
    const re = map(x, 0, canvas.width, -mandelbrotSize, mandelbrotSize);
    const im = map(y, 0, canvas.height, mandelbrotSize, -mandelbrotSize);
    document.getElementById("constant-real-number").value = re.toFixed(3);
    document.getElementById("constant-imaginary-number").value = im.toFixed(3);
}

function turnOffAutoJulia(){
    document.getElementById('generate-button').disabled = false;
    canvas.removeEventListener('mousemove', autoJulia);
    canvas.removeEventListener('pointerdown', pauseAutoJulia);
    canvas.removeEventListener('pointerdown', unpauseAutoJulia);
    canvas.addEventListener('mousedown', mouseDownCanvasEvent);
}
function turnOnAutoJulia(){
    document.getElementById('generate-button').disabled = true;
    canvas.removeEventListener('mousedown', mouseDownCanvasEvent);
    canvas.addEventListener('mousemove', autoJulia);
    canvas.addEventListener('pointerdown', pauseAutoJulia);
}
function autoJulia(event){
    const rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left)*scaleX;
    const y = (event.clientY - rect.top)*scaleY;
    setConstantJulia(x, y);
    simulateJulia();
}
function pauseAutoJulia(event){
    if (event.pointerType === "mouse") {
        canvas.removeEventListener('mousemove', autoJulia);
        canvas.removeEventListener('pointerdown', pauseAutoJulia);
        canvas.addEventListener('pointerdown', unpauseAutoJulia);
    }
}
function unpauseAutoJulia(event){
    if (event.pointerType === "mouse") {
        canvas.addEventListener('mousemove', autoJulia);
        canvas.removeEventListener('pointerdown', unpauseAutoJulia);
        canvas.addEventListener('pointerdown', pauseAutoJulia);
    }
}

function getColor(n, maxIterations, invertColours, colourScheme){
    
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
        if (!invertColours){ proportion = 1 - proportion;}
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
    }
    return [r, g, b];
}


/*****ARCHIVE******
function formatColor {
    color = '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');
}
function drawPixel(context, x, y, color) {
	var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.fillStyle = color || '#000';
  	context.fillRect(roundedX, roundedY, 1, 1);
}
*/
