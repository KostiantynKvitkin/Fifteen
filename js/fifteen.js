'use strict';

/*  exports in the returned object: 
      (classes: FifteenConsole, FifteenGraphic, FifteenGraphicAnyFieldSize;)
      debugOn 
*/


var fifteenModelModule = (function(){
  var f = {  };
  f.debugOn = true;
  // f.debugOn = false;

  function FifteenConsole() {
    this._field = [[1, 2, 3, 4],              //start fill field 
                   [5, 6, 7, 8], 
                   [9, 10, 11, 12],
                   [13, 14, 15, 0]];
    // this.mix();                            //field mixing
  }

  FifteenConsole.prototype.draw = function() {
    if (f.debugOn) {
      console.log(this._field[0], '\n', 
                  this._field[1], '\n', 
                  this._field[2], '\n', 
                  this._field[3]);
    }
  };

    //exchange cell numbers
  FifteenConsole.prototype._exchangeCells = function(row1, col1, row2, col2) {
    let temp =  this._field[row1][col1];                          
    this._field[row1][col1] = this._field[row2][col2];
    this._field[row2][col2] = temp;
  };

    //find cell with number
  FifteenConsole.prototype._findNumber = function(num) {
    for (let row = 0; row <= 3; row++) {
      for (let col = 0; col <= 3; col++) {
        if (this._field[row][col] == num) return [row, col]; //!!return array
      }
    }
  };
    
    //generate random number [min, max]
  FifteenConsole.prototype._getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

    //field mixing
  FifteenConsole.prototype.mix = function() {

    if (f.debugOn) {
      console.log('%cExchanges cells', 
        "color: yellow; font-size: 2em; font-style: bold; background-color: blue; padding: 2px;");
    }

      //field mixing
    let rowTemp1, colTemp1, rowTemp2, colTemp2;
    for (let i = 0; i < 100; i++) {
      rowTemp1 = this._getRandomInt(0, 4);
      colTemp1 = this._getRandomInt(0, 4);
      rowTemp2 = this._getRandomInt(0, 4);
      colTemp2 = this._getRandomInt(0, 4);

      if (f.debugOn) {
        console.log('cell1: ' + rowTemp1 + ', ' + colTemp1 + '  cell2: ' + rowTemp2 + ', ' + colTemp2);
        this._exchangeCells(rowTemp1, colTemp1, rowTemp2, colTemp2);
      }
    }
    this.draw();
  };

    //exchange a cell with number and an hole cell
  FifteenConsole.prototype.moveNumber = function(num) {
    let rowNum, colNum, tempNum;
    let rowZero, colZero, tempZero;
    tempNum = this._findNumber(num);
    rowNum = tempNum[0]; colNum = tempNum[1];

    tempZero = this._findNumber(0);
    rowZero = tempZero[0]; colZero = tempZero[1];


    if ( ((rowNum == rowZero) && ( ((colNum - colZero) == 1) || ((colZero - colNum) == 1) )) ||
         ((colNum == colZero) && ( ((rowNum - rowZero) == 1) || ((rowZero - rowNum) == 1) ))
      ) {

      this._exchangeCells(rowNum, colNum, rowZero, colZero);
      this.draw();
   } else { if (f.debugOn) { console.log ('Error'); } }
  };

  /*          New Class                   */

  function FifteenGraphic() { //extends FifteenConsole
    FifteenConsole.apply(this, arguments);
    this.field = this._field;
  }

  FifteenGraphic.prototype = Object.create(FifteenConsole.prototype);
  FifteenGraphic.prototype.constructor = FifteenGraphic;

  class FifteenGraphicAnyFieldSize extends FifteenGraphic{
    constructor(){
      super();
      delete this.field;
      delete this._field;
  }

    init(rowSize, colSize){
      rowSize = rowSize || 4;
      colSize = colSize || 4;

      let field = [];
      let num = 0;
      for (let i = 0; i < rowSize; i++) {
        field[i] = [];
        for (let j = 0; j < colSize; j++) {
          field[i][j] = num++;
        } 
      }

      this.field = field;
      this._field = this.field;
      this.rowSize = rowSize;
      this.colSize = colSize;

      this.mix();
      this.draw();
    }

    toString() {
      let field = this.field;
      let str ='';
      for (let i = 0; i < this.rowSize; i++) {
        for (let j = 0; j < this.colSize; j++) {
          str += this.field[i][j] + ' ';
        } 

        str += '\n';
      }
      return str;
    }

    _findNumber(num) {
      for (let row = 0; row < this.rowSize; row++) {
        for (let col = 0; col < this.colSize; col++) {
          if (this._field[row][col] == num) return [row, col]; //!!return array
        }
      }
    }

    mix() {

      if (f.debugOn) {
        console.log('%cExchanges cells', 
          "color: yellow; font-size: 2em; font-style: bold; background-color: blue; padding: 2px;");
      }

        //field mixing
      let rowTemp1, colTemp1, rowTemp2, colTemp2;
      for (let i = 0; i < this.rowSize*this.colSize*6; i++) {
        rowTemp1 = this._getRandomInt(0, this.rowSize);
        colTemp1 = this._getRandomInt(0, this.colSize);
        rowTemp2 = this._getRandomInt(0, this.rowSize);
        colTemp2 = this._getRandomInt(0, this.colSize);

        if (f.debugOn) {
          console.log('cell1: ' + rowTemp1 + ', ' + colTemp1 + '  cell2: ' + rowTemp2 + ', ' + colTemp2);
          this._exchangeCells(rowTemp1, colTemp1, rowTemp2, colTemp2);
        }
      }
      this.draw();
    }

    draw() {
      if (f.debugOn) {
        console.log(this.toString());
      }
    }
  }

  f.FifteenConsole = FifteenConsole;
  f.FifteenGraphic = FifteenGraphic;
  f.FifteenGraphicAnyFieldSize = FifteenGraphicAnyFieldSize;
  
  return f;
})();

