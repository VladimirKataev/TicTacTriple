//for on-canvas positions, use vh
//horizontal use h
//vertical use v
//xyz are reserved for on-board positions

let zv = -50;
let zh = 0;
let xv = 0;
let xh = 50;
let yv = -45;
let yh = 40;
let ov = 300;
let oh = 100;
let angle = -15;
let stdLen = 50;


let gfx = document.getElementById("gfx").getContext("2d");

//in: 0,1,2
//out:123, 234, 345
function gridCoordsToGFXCoords(x, y, z){
    //x += 0.5;
    //y += 0.5;
    //z += 0.5;
    let ansV = (x * xv) + (y*yv) + (z * zv);
    let ansH = (x * xh) + (y*yh) + (z * zh);
    console.log(ansH, ansV);
    return {x: ansH + oh, y: ansV+ ov};
}


//pure on-canvas macro to simplify drawing
function drawCircleAt(x, y, r){
    gfx.beginPath();
    gfx.arc(x, y, r, 0, 2*Math.PI);
    gfx.strokeStyle = '#F00';
    gfx.fillStyle = '#F00';
    gfx.fill();
    gfx.stroke();
}

function testDraw(){
    //drawCircleAt(1,1,1);
    //drawCircleAt(2,2,2);

    /*
    console.log(gridCoordsToGFXCoords(0,0,0));
    console.log(gridCoordsToGFXCoords(1,1,1));
    console.log(gridCoordsToGFXCoords(2,2,0));
    console.log(gridCoordsToGFXCoords(2,2,2));
    */
    
    /*
    let curr = gridCoordsToGFXCoords(0,0,0);
    drawCircleAt(curr.x, curr.y, 20);
    curr = gridCoordsToGFXCoords(1,1,1);
    drawCircleAt(curr.x, curr.y, 20);
    curr = gridCoordsToGFXCoords(2,2,2);
    drawCircleAt(curr.x, curr.y, 20);
    curr = gridCoordsToGFXCoords(2,2,0);
    drawCircleAt(curr.x, curr.y, 20);
    */
}

function gridBallDrawAt(x, y, z){
    let curr = gridCoordsToGFXCoords(x,y,z);
    drawCircleAt(curr.x, curr.y, 20);    
}

//x, y, z as drawn in rgb
function drawAxes(){
    

    gfx.beginPath();
    gfx.strokeStyle = "#f00";
    gfx.moveTo(oh, ov);
    gfx.lineTo(oh + xh, ov + xv);

    gfx.stroke();

    gfx.beginPath();
    gfx.moveTo(oh, ov);
    gfx.lineTo(oh + yh, ov + yv);
    gfx.strokeStyle = "#0f0";
    gfx.stroke();

    gfx.beginPath();
    gfx.moveTo(oh, ov);
    gfx.lineTo(oh + zh, ov + zv);
    gfx.strokeStyle = "#00f";
    gfx.stroke();


}

function drawFromInputs(){
    let x = document.getElementById("inputx").value;
    let y = document.getElementById("inputy").value;
    let z = document.getElementById("inputz").value;
    //console.log(x, y, z)
    gridBallDrawAt(x,y,z);
}

function rotate(theta){
    angle += theta;

    xh = stdLen * Math.cos(2 * Math.PI * angle / 360);
    xv = stdLen * Math.sin(2 * Math.PI * angle / 360);
    yh = stdLen * Math.sin(2 * Math.PI * angle / 360);
    yv = -stdLen * Math.cos(2 * Math.PI * angle / 360);

    //xv *= 0.8;
    //yv *= 0.8;

    oh = 200 - (1.5 * xh) - (1.5 * yh); 
    ov = 200 - (1.5 * xv) - (1.5 * yv) - (0.5 * zv); 


    console.log(oh, ov, xh, xv, yh, yv);
    gfx.clearRect(0,0,400,400);
    drawAxes();
    
}

rotate(15);
drawAxes();

//testDraw();

