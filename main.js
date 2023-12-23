/**
 * @type {HTMLCanvasElement} canvas - Elementul canvas din DOM
 * @type {CanvasRenderingContext2D} ctx - Contextul 2D al canvasului
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnRect = document.getElementById('btn-dreptunghi');
const btnElipsa = document.getElementById('btn-elipsa');

//set canvas dimensions
canvas.width = 800;
canvas.height = 500;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", whileDrawing);
canvas.addEventListener("mouseup", stopDrawing);

let tool = '',
isPainting = false,
prevMouseX, 
prevMouseY,
beforeDrawing;

btnRect.addEventListener('click', () =>{
    // console.log("Am ales sa desenez un dreptunghi");
    tool = 'rectangle';
})

btnElipsa.addEventListener('click', () =>{
    console.log("Am ales sa desenez o elipsa");
    tool = 'elipsa';
})

// function drawElipsaWeird(e){
//     // console.log("OFFSET X: " + e.offsetX);
//     // console.log("OFFSET Y: " + e.offsetY);
//     // console.log("PREV X: " + prevMouseX);
//     // console.log("PREV Y: " + prevMouseY);
//     ctx.beginPath();
//     let startPointX = e.offsetX;
//     let startPointY = (e.offsetY - (e.offsetY - prevMouseY)/2);
//     ctx.moveTo(startPointX, startPointY);
//     // console.log(startPointX, startPointY);
//     let controlPointX =  e.offsetX - (e.offsetX - prevMouseX)/2;
//     let controlPointY = e.offsetY;
//     // console.log(controlPointX, controlPointY);
//     let endPointX = prevMouseX;
//     let endPointY = (e.offsetY - (e.offsetY - prevMouseY)/2);
//     ctx.quadraticCurveTo(controlPointX,
//         controlPointY, endPointX, endPointY);
//     ctx.stroke();
    
//     ctx.beginPath();
//     controlPointX = e.offsetX - (e.offsetX - prevMouseX)/2;
//     controlPointY = prevMouseY;
//     ctx.moveTo(endPointX, endPointY);
//     ctx.quadraticCurveTo(controlPointX,
//         controlPointY, startPointX, startPointY);
//     ctx.stroke();

// }  

function drawElipsa(e){
    ctx.beginPath();
    let centerEllipseX =  e.offsetX - (e.offsetX - prevMouseX)/2;
    let centerEllipseY = (e.offsetY - (e.offsetY - prevMouseY)/2);
    let radiusX = Math.abs((e.offsetX - prevMouseX)/2);
    let radiusY =  Math.abs((e.offsetY - prevMouseY)/2);
    console.log(radiusX, radiusY);
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

function startDrawing(e){
    isPainting = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY; 
    ctx.beginPath();
    beforeDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function whileDrawing(e){
    if(!isPainting) return;
    ctx.putImageData(beforeDrawing, 0, 0);
    if(tool==='rectangle'){
        drawRectangle(e);
    }else if(tool === 'elipsa'){
        drawElipsa(e);
    }
}

function stopDrawing(){
    isPainting = false;
}












