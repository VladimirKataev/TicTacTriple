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
let maskTaken = 0;
let maskRed = 0;

let gfx = document.getElementById("gfx").getContext("2d");

let eventSource = new EventSource("/serverUser")
eventSource.onmessage = function(e){
    let msg = (e.data);
    let first = msg.slice(0, msg.indexOf(','));
    let second = msg.slice(msg.indexOf(',')+1, -1);
    maskTaken = parseInt(first);
    maskRed = parseInt(second);
    //console.log(maskTaken, maskRed);
    reDraw();
}

//in: 0,1,2
//out:123, 234, 345
function gridCoordsToGFXCoords(x, y, z){
    //x += 0.5;
    //y += 0.5;
    //z += 0.5;
    let ansV = (x * xv) + (y*yv) + (z * zv);
    let ansH = (x * xh) + (y*yh) + (z * zh);
    //console.log(ansH, ansV);
    return {x: ansH + oh, y: ansV+ ov};
}


//pure on-canvas macro to simplify drawing
function drawCircleAt(x, y, r, red, transparent = false){
    gfx.beginPath();
    gfx.arc(x, y, r, 0, 2*Math.PI);
    if(transparent){
	gfx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
	gfx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    }
    else if(red){
	gfx.strokeStyle = '#F00';
	gfx.fillStyle = '#F00';
    }
    else{
	gfx.strokeStyle = '#00F';
	gfx.fillStyle = '#00F';
    }
    gfx.fill();
    gfx.stroke();
}



function gridBallDrawAt(x, y, z, red=false, transparent = false){
    let curr = gridCoordsToGFXCoords(x,y,z);
    drawCircleAt(curr.x, curr.y, 20, red, transparent);    
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


    //console.log(oh, ov, xh, xv, yh, yv);
    gfx.clearRect(0,0,400,400);
    //drawAxes();
    reDraw();
    
}

function vertPosScreen(arr){
    let vert = arr[0]*xv;
    vert += arr[1]*yv;
    return vert;
}

function xyzToMask(x, y, z){
    //console.log(x, y, z, (1 << (x + (3*y) + 9*(z))));
    return 1 << (x + (3*y) + (9*z));
} 
function drawNums(){
    gfx.text = "30px arial";
    gfx.textAlign = "center";
    gfx.fillText("0", gridCoordsToGFXCoords(0,0,2).x, gridCoordsToGFXCoords(0,0,2).y)
    gfx.fillText("1", gridCoordsToGFXCoords(1,0,2).x, gridCoordsToGFXCoords(1,0,2).y)
    gfx.fillText("2", gridCoordsToGFXCoords(2,0,2).x, gridCoordsToGFXCoords(2,0,2).y)
    gfx.fillText("3", gridCoordsToGFXCoords(0,1,2).x, gridCoordsToGFXCoords(0,1,2).y)
    gfx.fillText("4", gridCoordsToGFXCoords(1,1,2).x, gridCoordsToGFXCoords(1,1,2).y)
    gfx.fillText("5", gridCoordsToGFXCoords(2,1,2).x, gridCoordsToGFXCoords(2,1,2).y)
    gfx.fillText("6", gridCoordsToGFXCoords(0,2,2).x, gridCoordsToGFXCoords(0,2,2).y)
    gfx.fillText("7", gridCoordsToGFXCoords(1,2,2).x, gridCoordsToGFXCoords(1,2,2).y)
    gfx.fillText("8", gridCoordsToGFXCoords(2,2,2).x, gridCoordsToGFXCoords(2,2,2).y)

}
function reDraw(){
    gfx.clearRect(0,0,400,400);    
    drawAxes();
    drawNums();
    //x, y
    let pos = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    pos.sort(vertPosScreen);
    pos.reverse();

    for(let z = 0; z < 3; z++){
	for(let p of pos){
	    let tmpMask = xyzToMask(p[0], p[1],z);
	    //console.log(p);
	    
	    if( maskTaken & tmpMask){
		//draw it,                            maybe in red      not transparent
		gridBallDrawAt(p[0], p[1], z, (maskRed & tmpMask) == 0, false);
	    }
	    else{ //untaken
		if(z == 0){ //                    not red, transparent
		    gridBallDrawAt(p[0], p[1], z, false, true);
		}
		else{ //if the ball spot below is taken, draw this one transparently
		    let checkBelowMask = xyzToMask(p[0], p[1], z-1);
		    if(checkBelowMask & maskTaken){
			gridBallDrawAt(p[0], p[1], z, false, true);
		    }
		}
	    }
	}
    }

    

}

rotate(15);
reDraw();



