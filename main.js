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
const inputLineSize = document.getElementById('input-line-size');
const btnColors = document.querySelectorAll('.colors');
const colorPicker = document.getElementById('color-picker');

//set canvas dimensions
canvas.width = 800;
canvas.height = 500;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
canvas

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
    tool = 'line';
});

btnSaveRaster.addEventListener('click', () =>{
    const dataUrl = canvas.toDataURL('/media/png', 1);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = 'chart.png';
    a.click();
});

inputLineSize.addEventListener('change', ()=>{
    lineSize = inputLineSize.value;
    console.log(lineSize);
});

for(let btnColor of btnColors){
    btnColor.style.backgroundColor = btnColor.id;
    btnColor.addEventListener('click', ()=>{
        ctx.strokeStyle = btnColor.id;
    })
}

colorPicker.addEventListener('change', ()=>{
    ctx.strokeStyle = colorPicker.value;
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














