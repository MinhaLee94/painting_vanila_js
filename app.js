const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('#colors');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = "#2C2C2C";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function fillCanvas() {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function banRightClick(event) {
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmeu", banRightClick);
}

if(colors){
    colors.addEventListener("click", () => {
        // canvas color should be replaced with the color clicked
        const target = event.target.dataset.color;
        ctx.strokeStyle = target;
        ctx.fillStyle = target;
    }); 
}

if(range){
    range.addEventListener("input", () => {
        const size = event.target.value;
        ctx.lineWidth = size;
    });
}

mode.addEventListener("click", () => {
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
});

if(saveBtn){
    saveBtn.addEventListener("click", () => {
        const image = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "paint_export";
        link.click();
    });
}
