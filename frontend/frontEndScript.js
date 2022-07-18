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


      
      function testDraw(){
	  gfx.moveTo(oh, ov);
	  gfx.lineTo(10,10);
	  gfx.stroke();
      }

      function gridToView(x, y, z){
	  
      }

      testDraw();

