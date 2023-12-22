/**
 * @type {HTMLCanvasElement} canvas - Elementul canvas din DOM
 * @type {CanvasRenderingContext2D} ctx - Contextul 2D al canvasului
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnRect = document.getElementById('btn-dreptunghi');

//set canvas dimensions
canvas.width = 800;
canvas.height = 550;

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

function drawRectangle(e){
    console.log('');
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
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
    }
}

function stopDrawing(){

    isPainting = false;
}












