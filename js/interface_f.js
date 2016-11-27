'use strict';

/*  exports in the returned object: 
      (classes: )
       
*/

var fifteenAppModule = (function(){
  var a = {  };
  a.debugOn = true;
  // a.debugOn = false;
  
  fifteenModelModule.debugOn = a.debugOn;

  // a.debugState = 'choiceSize';
  // a.debugState = 'stateGame';


class FifteenApp {

  constructor(viewer, model) {
    this.viewer = viewer;
    this.model = model;
    this.viewer.init();

    this.SIZEMAX = 20;
    this.SIZEMIN = 2;

    this.RUNGAME = 'runGame';
    this.CHOICESIZE = 'choiceSize';
    this.CREATEFIELDGAME = 'createFieldGame';
    this.DESTROYFIELDGAME = 'destroyFieldGame';
    this.state = this.CHOICESIZE;

    this.draw();
  }

  get state() { return this._state;}
  set state(newState) { this._state = newState;}

  init(rowSize, colSize) {
    if (rowSize >= this.SIZEMIN && rowSize <= this.SIZEMAX &&
        colSize >= this.SIZEMIN && colSize <= this.SIZEMAX) {
      

      this.rowSize = rowSize;
      this.colSize = colSize;

      this.model.init(rowSize, colSize);
      this.state = this.CREATEFIELDGAME;

      this.draw();//?

      this.state = this.RUNGAME;
      this.draw();
    }
  }

  reset() {
    this.state = this.DESTROYFIELDGAME;
    this.rowSize = undefined;
    this.colSize = undefined;

    this.draw(); //?

    this.state = this.CHOICESIZE;
    this.draw();

  }


  draw() {
    if (a.debugOn) console.log(this.state);
    switch (this.state) {
      case this.RUNGAME: this.viewer.gameShow();
      break;
      case this.CHOICESIZE: this.viewer.choiceSizeShow();
      break;
      case this.CREATEFIELDGAME: this.viewer.createFieldGame(this.rowSize, this.colSize);
      break;
      case this.DESTROYFIELDGAME: this.viewer.destroyFieldGame();
      break;
    }
  }


  setSize(){
    let rowSize = +document.getElementById('txtSizeVertical').value;
    let colSize = +document.getElementById('txtSizeHorizontal').value;

    if (a.debugOn) console.log(rowSize, colSize);
    
    this.init(rowSize, colSize);
    
  }

  touchCell(event) {
    if (a.debugOn) console.log(event.target.id);

    // let num =  +event.target.textContent;     //if "cell" touch
    // if ( !isNaN(num) ) {                      // 
    //   console.log(num);
    //   fifteen.moveNumber(num);
    //   draw();
    // }


  }

}



class Views {
  static init() {
    this.inputSizeDiv = document.getElementById('inputSize');
    this.gameDiv = document.getElementById('game');
    this.fieldGameBoxDiv = document.getElementById('fieldGameBox');
    this.fieldGameDiv = undefined;    //created dynamically

    /*this.primarySizes = {
      // small: 10,
      // big: 20,
      rowSwitchSize: 8,
      colSwitchSize: 13,
      // shapefactor: 1.1
    };*/

    this.baseSize = undefined;      //calculated dynamically
    this.cellSize = 3;
    this.gap = 0.08;
    this.borderRadius = 0.3;
    this.fontSize = 1.5;

  }

  static choiceSizeShow() {
    this.inputSizeDiv.hidden = false;
    this.gameDiv.hidden = true;
    

  }
  static gameShow() {
    this.inputSizeDiv.hidden = true;
    this.gameDiv.hidden = false; 

  }

  static _calcSize(rowSize, colSize) {
    // console.log(this.fieldGameBoxDiv.style);height
      let divWidth = +(getComputedStyle(this.fieldGameBoxDiv).width.slice(0,-2));
      let divHeight = +(getComputedStyle(this.fieldGameBoxDiv).height.slice(0,-2));
      let baseSizeWidth = divWidth/(colSize*(this.cellSize + this.gap) + 1);
      let baseSizeHeight = divHeight/(rowSize*(this.cellSize + this.gap) + 1);

      console.log(baseSizeWidth, baseSizeHeight);

      // return baseSize;

  }


  static createFieldGame(rowSize, colSize) {

    this._calcSize(rowSize, colSize);
    return;



    if (rowSize <= this.primarySizes.rowSwitchSize && colSize <= this.primarySizes.colSwitchSize) {
      this.baseSize = this.primarySizes.big;
    } else {
      this.baseSize = this.primarySizes.small;
    }

    let baseSize = this.baseSize;
    let cellSize = this.cellSize;
    let gap = this.gap;
    let borderRadius = this.borderRadius;
    let fontSize = this.fontSize;


    let tempFieldGameDiv = document.createElement('div');
    tempFieldGameDiv.id = 'fieldGame';

    tempFieldGameDiv.style.width = colSize*(cellSize*baseSize + gap*baseSize) + gap*baseSize + 'px';
    tempFieldGameDiv.style.height = rowSize*(cellSize*baseSize + gap*baseSize) + gap*baseSize + 'px';



    let tempHTML = '';
    for (let i = 0; i < rowSize; i++) {
      for (let j = 0; j < colSize; j++) {
        tempHTML += '<div class = "cell" style = "';
        tempHTML += 'left: ' + (gap*baseSize + j*(cellSize*baseSize + gap*baseSize)) + 'px; ';
        tempHTML += 'top: ' + (gap*baseSize + i*(cellSize*baseSize + gap*baseSize)) + 'px; ';
        tempHTML +=  'width: ' + cellSize*baseSize + 'px; height: ' + cellSize*baseSize + 'px; ';
        tempHTML += '"';

        tempHTML += ' id = "c' + i + j + '"> ' + /*i + j +*/ ' </div>';
      }
    }

    tempFieldGameDiv.innerHTML = tempHTML;

    let cellsCollection = tempFieldGameDiv.getElementsByClassName('cell');
    [].forEach.call(cellsCollection, function(cell) {
      cell.style.borderRadius = borderRadius*baseSize + 'px';
      let tempP = document.createElement('p');
      tempP.id = 'p' + cell.id.slice(1);
      tempP.className = 'p';
      tempP.style.fontSize = fontSize*baseSize + 'px';
      tempP.innerText = cell.id.slice(1);
      cell.appendChild(tempP);
    });



    this.fieldGameDiv = this.fieldGameBoxDiv.appendChild(tempFieldGameDiv);

    this.inputSizeDiv.hidden = true;
    this.gameDiv.hidden = false; 
  }

  static destroyFieldGame() {
    this.fieldGameBoxDiv.removeChild(this.fieldGameDiv);

    this.inputSizeDiv.hidden = true;
    this.gameDiv.hidden = true; 
  }

  // static draw() {

  // }
}



// var fifteen; 

// var fieldBox = [];
// onload = function() {

//   fieldBox[0] = document.getElementsByClassName('text 0');
//   fieldBox[1] = document.getElementsByClassName('text 1');
//   fieldBox[2] = document.getElementsByClassName('text 2');
//   fieldBox[3] = document.getElementsByClassName('text 3');
//   // console.log(fieldBox);

//   // fifteen = new FifteenGraphic();
//   // draw();

//   // fifteen = new FifteenGraphicAnyFieldSize();
//   // fifteen.init(5, 5);
//   // console.log(fifteen.toString());

// };

// field.onclick = function(event) {
//   // console.log(+event.target.textContent);
//   let num =  +event.target.textContent;     //if "cell" touch
//   if ( !isNaN(num) ) {                      // 
//     console.log(num);
//     fifteen.moveNumber(num);
//     draw();
//   }
// };

// function draw() {
//   for (let row = 0; row <= 3; row++) {
//     for (let col = 0; col <= 3; col++) {
//       if (fifteen.field[row][col]) {
//         fieldBox[row][col].parentElement.className = 'cell';
//         fieldBox[row][col].textContent = fifteen.field[row][col];
//       } else {
//         fieldBox[row][col].parentElement.className = 'hole';
//         // fieldBox[row][col].parentElement.className;
//         fieldBox[row][col].textContent = '';

//       }
      
//     }
//   }


  
// }

  a.fApp = new FifteenApp(Views, new fifteenModelModule.FifteenGraphicAnyFieldSize());


  choiceSizeButton.onclick = a.fApp.setSize.bind(a.fApp);
  resetButton.onclick = a.fApp.reset.bind(a.fApp);
  game.onclick = a.fApp.touchCell.bind(a.fApp);


  
  return a;
})();