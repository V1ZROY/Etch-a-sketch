let sketchpad = document.getElementById("sketchpad");
let rainbowbutton = document.getElementById('rainbow');
let eraserbutton = document.getElementById('eraser');
let blackpenbutton = document.getElementById('blackpen');
let resetbutton = document.getElementById('reset');
let sizeslider = document.getElementById('sizerange');
let canvassize = document.getElementById('canvassize');

let size = sizeslider.value//Set width of canvas, will eventually want this to be user editable
let mode;
let pixels;

function write(e){
    if(e.pressure != 0 | e.type == 'mousedown' | e.type == 'touchmove') {
        if (mode == "blackpen"){
            this.style.backgroundColor = "rgb(0, 0, 0)";
            this.style.border = 'none';
        } else if (mode == 'rainbow'){
            var RGBColor1 = Math.round(Math.random()*200);
            var RGBColor2 = Math.round(Math.random()*200);
            var RGBColor3 = Math.round(Math.random()*200);
            this.classList.add('rainbow');
            this.style.backgroundColor = `rgb(${RGBColor1}, ${RGBColor2}, ${RGBColor3})`;
            this.style.border = 'none';
        } else if (mode == 'eraser'){
            this.style.backgroundColor = "rgb(255, 255, 255)";
            this.style = '';
        }
    }
}

function defaultbuttons(){
    blackpenbutton.classList.remove('selected');
    eraserbutton.classList.remove('selected');
    rainbowbutton.classList.remove('selected');
}

function rainbowmode(){
    mode = "rainbow";
    defaultbuttons();
    this.classList.add('selected');
}

function blackpenmode(){
    mode = "blackpen";
    defaultbuttons();
    blackpenbutton.classList.add('selected');
}

function erasermode(){
    mode = "eraser";
    defaultbuttons();
    this.classList.add('selected');
}

function reset(){
    let size = sizeslider.value;
    console.log(size)
    pixels.forEach(element => {sketchpad.removeChild(element);})
    generate(size);
}






sketchpad.style.gap="0px"

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
    pixels.forEach(element => {element.addEventListener('pointerover', write);});
    pixels.forEach(element => {element.addEventListener('mousedown', write);});
    pixels.forEach(element => {element.addEventListener('touchmove', write);});
}

generate(size);

sizeslider.oninput = () => {canvassize.innerHTML = `Canvas size: ${sizeslider.value}x${sizeslider.value}`;};
rainbowbutton.addEventListener('click', rainbowmode);
blackpenbutton.addEventListener('click', blackpenmode);
eraserbutton.addEventListener('click', erasermode);
resetbutton.addEventListener('click', reset);