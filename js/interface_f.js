'use strict';

var fifteen; 
var fieldBox = [];
onload = function() {

  fieldBox[0] = document.getElementsByClassName('text 0');
  fieldBox[1] = document.getElementsByClassName('text 1');
  fieldBox[2] = document.getElementsByClassName('text 2');
  fieldBox[3] = document.getElementsByClassName('text 3');
  // console.log(fieldBox);

  fifteen =new FifteenGraphic();
  draw();
};

field.onclick = function(event) {
  // console.log(+event.target.textContent);
  let num =  +event.target.textContent;     //if "cell" touch
  if ( !isNaN(num) ) {                      // 
    console.log(num);
    fifteen.moveNumber(num);
    draw();
  }
};

function draw() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (fifteen.field[row][col]) {
        fieldBox[row][col].parentElement.className = 'cell';
        fieldBox[row][col].textContent = fifteen.field[row][col];
      } else {
        fieldBox[row][col].parentElement.className = 'hole';
        fieldBox[row][col].parentElement.className
        fieldBox[row][col].textContent = '';

      }
      
    }
  }


  
}

// document.getElementById('field 15').onclick=function(){
//   console.log(15);
// };

// document.getElementById('fieldBox').onclick = function() {
//   console.log('fieldBox');
// };

