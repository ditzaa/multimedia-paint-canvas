/**
 * @type {HTMLCanvasElement} canvas - Elementul canvas din DOM
 * @type {CanvasRenderingContext2D} ctx - Contextul 2D al canvasului
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnRect = document.getElementById('btn-dreptunghi');
const btnElipsa = document.getElementById('btn-elipsa');
const btnLine = document.getElementById('btn-linie');
const btnSaveRaster = document.getElementById('btn-save-raster');
const btnSaveVectorial = document.getElementById('btn-save-svg');
const inputLineSize = document.getElementById('input-line-size');

//set canvas dimensions
canvas.width = 800;
canvas.height = 500;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let tool = '',
isPainting = false,
prevMouseX, 
prevMouseY,
beforeDrawing,
lineSize = 10;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", whileDrawing);
canvas.addEventListener("mouseup", stopDrawing);

btnRect.addEventListener('click', () =>{
    // console.log("Am ales sa desenez un dreptunghi");
    tool = 'rectangle';
});

btnElipsa.addEventListener('click', () =>{
    tool = 'elipsa';
});

btnLine.addEventListener('click', () =>{
    console.log("Am ales sa desenez o linie");
    tool = 'line';
});

btnSaveRaster.addEventListener('click', () =>{
    const dataUrl = canvas.toDataURL('/media/png', 1);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = 'chart.png';
    a.click();
});


btnSaveVectorial.addEventListener('click', () =>{
});

//"change", () => brushWidth = sizeSlider.value
inputLineSize.addEventListener('change', ()=>{
    lineSize = inputLineSize.value;
    console.log(lineSize);
})

function drawElipsa(e){
    ctx.beginPath();
    let centerEllipseX =  e.offsetX - (e.offsetX - prevMouseX)/2;
    let centerEllipseY = (e.offsetY - (e.offsetY - prevMouseY)/2);
    let radiusX = Math.abs((e.offsetX - prevMouseX)/2);
    let radiusY =  Math.abs((e.offsetY - prevMouseY)/2);
    //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.ellipse(centerEllipseX, centerEllipseY, radiusX, radiusY,
        0, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawRectangle(e){
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    // console.log("OFFSET X: " + e.offsetX);
    // console.log("PREV X: " + prevMouseX);
    // console.log("OFFSET Y: " + e.offsetY);
    // console.log("PREV Y: " + prevMouseY);
}

function drawLine(e){
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function startDrawing(e){
    isPainting = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY; 
    ctx.beginPath();
    ctx.lineWidth = lineSize;
    beforeDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function whileDrawing(e){
    if(!isPainting) return;
    ctx.putImageData(beforeDrawing, 0, 0);
    if(tool==='rectangle'){
        drawRectangle(e);
    }else if(tool === 'elipsa'){
        drawElipsa(e);
    }else if(tool == "line"){
        drawLine(e);
    }
}

function stopDrawing(){
    isPainting = false;
}














