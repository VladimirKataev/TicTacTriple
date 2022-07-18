//for on-canvas positions, use vh
//horizontal use h
//vertical use v
//xyz are reserved for on-board positions

let zv = -60;
let zh = 0;
let xv = 0;
let xh = 60;
let yv = -45;
let yh = 60;
let ov = 300;
let oh = 100;




let gfx = document.getElementById("gfx").getContext("2d");


//to reset box origin relative to canvas center
let translateObject = gridCoordsToGFXCoords(1,1,1);
translateObject.x *= -1;
translateObject.y *= -1;

//in: 0,1,2
//out:123, 234, 345
function gridCoordsToGFXCoords(x, y, z){
    let ansV = (x * xv) + (y*yv) + (z * zv);
    let ansH = (x * xh) + (y*yh) + (z * zh);
    return {x: ansH + oh, y: ansV+ ov};
}


//pure on-canvas macro to simplify drawing
function drawCircleAt(x, y, r){
    gfx.beginPath();
    gfx.arc(x, y, r, 0, 2*Math.PI);
    gfx.strokeStyle = '#F00';
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
    gfx.moveTo(oh, ov);
    gfx.lineTo(oh + xh, ov + xv);
    gfx.strokeStyle = "#foo"
    gfx.stroke();

    gfx.beginPath();
    gfx.moveTo(oh, ov);
    gfx.lineTo(oh + yh, ov + yv);
    gfx.strokeStyle = "#ofo"
    gfx.stroke();

    gfx.beginPath();
    gfx.moveTo(oh, ov);
    gfx.lineTo(oh + zh, ov + zv);
    gfx.strokeStyle = "#oof"
    gfx.stroke();


}

function drawFromInputs(){
    let x = document.getElementById("inputx").value;
    let y = document.getElementById("inputy").value;
    let z = document.getElementById("inputz").value;
    //console.log(x, y, z)
    gridBallDrawAt(x,y,z);
}

drawAxes();

//testDraw();

