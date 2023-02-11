let sketchpad = document.getElementById("sketchpad");
let size = 8;//Set width of canvas, will eventually want this to be user editable

function write(e){

    if(e.pressure != 0) {
        this.classList.add("clicked")
    }
    if(e.type == 'mousedown') {
        this.classList.add("clicked")
    }
}

sketchpad.style.gridTemplateColumns=`repeat(${size}, 1fr)`;
sketchpad.style.gap="0px"

for (let i = 0; i < (size*size); i++){
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    sketchpad.appendChild(pixel);
}

let pixels = document.querySelectorAll(".pixel")

pixels.forEach(element => {element.addEventListener('pointerover', write);})
pixels.forEach(element => {element.addEventListener('mousedown', write);})