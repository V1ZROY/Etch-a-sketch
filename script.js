let sketchpad = document.getElementById("sketchpad");
let rainbowbutton = document.getElementById('rainbow');
let eraserbutton = document.getElementById('eraser');
let blackpenbutton = document.getElementById('blackpen');
let resetbutton = document.getElementById('reset');
let sizeslider = document.getElementById('sizerange');
let canvassize = document.getElementById('canvassize');
//Lines above are selecting all of the elements that will be needed to interact with the DOM

let size = sizeslider.value//Set initial size of canvas to the default value of the slider
let mode;
let pixels;


//function called when a click is detected on the canvas
function write(e){
    if(e.pressure != 0 | e.type == 'mousedown' | e.type == 'touchmove') {
        if (mode == "blackpen"){//Black color pen
            this.style.backgroundColor = "rgb(0, 0, 0)";
            this.style.border = 'none';
        } else if (mode == 'rainbow'){//random colors for rainbow colored pen
            var RGBColor1 = Math.round(Math.random()*200);
            var RGBColor2 = Math.round(Math.random()*200);
            var RGBColor3 = Math.round(Math.random()*200);
            this.style.backgroundColor = `rgb(${RGBColor1}, ${RGBColor2}, ${RGBColor3})`;
            this.style.border = 'none';
        } else if (mode == 'eraser'){//'eraser' to reset styling on pixel to blank
            this.style.backgroundColor = "rgb(255, 255, 255)";
            this.style = '';
        }
    }
}

function defaultbuttons(){//function to reset buttons when a new one is selected. there is probably a better way to do this
    blackpenbutton.classList.remove('selected');
    eraserbutton.classList.remove('selected');
    rainbowbutton.classList.remove('selected');
}

//Three functions below are to run on clikc of buttons to select the pen style. I could also use 'this.classList.add...' here but that only works on button click so did not work to default to blackpenmode on page load.

function rainbowmode(){
    mode = "rainbow";
    defaultbuttons();
    rainbowbutton.classList.add('selected');
}

function blackpenmode(){
    mode = "blackpen";
    defaultbuttons();
    blackpenbutton.classList.add('selected');
}

function erasermode(){
    mode = "eraser";
    defaultbuttons();
    eraserbutton.classList.add('selected');
}

//clear old canvas and set size for new canvas based on the value in the size slider. This removes all previously generated pixels and runs the function to generate a new canvas with new pixels. This was the only way I could figure out editing the number of pixels after loading the page.

function reset(){
    let size = sizeslider.value;
    pixels.forEach(element => {sketchpad.removeChild(element);})
    generate(size);
}

//

function generate(size){
    sketchpad.style.gridTemplateColumns=`repeat(${size}, 1fr)`;
    for (let i = 0; i < (size*size); i++){
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        sketchpad.appendChild(pixel);
    }
    canvassize.innerHTML = `Canvas size: ${sizeslider.value}x${sizeslider.value}`;
    blackpenmode();
    pixels = document.querySelectorAll(".pixel")
    //Have created a Nodelist of all the pixels in the canvas so that I can add event listeners to them to colour in the pixels. so far events set for mousedown to allow click and drag as a click is mousedown+mouseup. Pointerover so that once clicked, can drag into other pixels. To ensure it only draws when mouse is down, there is an if statement in write function that checks click pressure.
    pixels.forEach(element => {element.addEventListener('pointerover', write);});
    pixels.forEach(element => {element.addEventListener('mousedown', write);});
    pixels.forEach(element => {element.addEventListener('touchmove', write);});
}

// Run the initial generate function on page load
generate(size);

// Update the display of canvas size on page based on the input in the slider
sizeslider.oninput = () => {canvassize.innerHTML = `Canvas size: ${sizeslider.value}x${sizeslider.value}`;};

// Event listeners for button clicks 
rainbowbutton.addEventListener('click', rainbowmode);
blackpenbutton.addEventListener('click', blackpenmode);
eraserbutton.addEventListener('click', erasermode);
resetbutton.addEventListener('click', reset);