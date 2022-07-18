//for on-canvas positions, use vh
//horizontal use h
//vertical use v
//xyz are reserved for on-board positions

let zv = 40;
let zh = 0;
let xv = 15;
let xh = 25;
let yv = 15;
let yh = -15;
let ov = 200;
let oh = 200;




let gfx = document.getElementById("gfx").getContext("2d");

//in: 0,1,2
//out:123, 234, 345
function gridCoordsToGFXCoords(x, y, z){
    let ansV = (x * xv) + (y*yv) + (z * zv);
    let ansH = (x * xh) + (y*yh) + (z * zh);
    return {x: ansH + 200, y: ansV+200};
}

//to reset box origin relative to canvas center
let translateObject = gridCoordsToGFXCoords(1,1,1);
translateObject.x *= -1;
translateObject.y *= -1;


//pure on-canvas macro to simplify drawing
function drawCircleAt(x, y, r){
    gfx.beginPath();
    gfx.arc(x, y, r, 0, 2*Math.PI);
    gfx.strokeStyle = '#F00';
    gfx.stroke();
}

function testDraw(){
    drawCircleAt(1,1,1);
    drawCircleAt(2,2,2);
    
    console.log(gridCoordsToGFXCoords(0,0,0));
    console.log(gridCoordsToGFXCoords(1,1,1));
    console.log(gridCoordsToGFXCoords(2,2,0));
    console.log(gridCoordsToGFXCoords(2,2,2));

    let curr = gridCoordsToGFXCoords(0,0,0);
    drawCircleAt(curr.x, curr.y, 20);
    curr = gridCoordsToGFXCoords(1,1,1);
    drawCircleAt(curr.x, curr.y, 20);
    curr = gridCoordsToGFXCoords(2,2,2);
    drawCircleAt(curr.x, curr.y, 20);
    curr = gridCoordsToGFXCoords(2,2,0);
    drawCircleAt(curr.x, curr.y, 20);
}


testDraw();

