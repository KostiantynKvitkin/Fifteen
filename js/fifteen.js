'use strict';

function FifteenConsole() {
  this._field = [[1, 2, 3, 4], 
                 [5, 6, 7, 8], 
                 [9, 10, 11, 12],
                 [13, 14, 15, 0]];
  this.mix();
}

FifteenConsole.prototype.draw = function() {
  console.log(this._field[0], '\n', 
              this._field[1], '\n', 
              this._field[2], '\n', 
              this._field[3]);
};

FifteenConsole.prototype._exchangeCells = function(row1, col1, row2, col2) {
  let temp;
  temp =  this._field[row1][col1];
  this._field[row1][col1] = this._field[row2][col2];
  this._field[row2][col2] = temp;
};

FifteenConsole.prototype._findNumber = function(num) {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (this._field[row][col] == num) return [row, col];
    }
  }
};


FifteenConsole.prototype.mix = function() {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  console.log('%cExchanges cells', 
    "color: yellow; font-size: 2em; font-style: bold; background-color: blue; padding: 2px;");

  let rowTemp1, colTemp1, rowTemp2, colTemp2;
  for (let i = 0; i < 100; i++) {
    rowTemp1 = getRandomInt(0, 4);
    colTemp1 = getRandomInt(0, 4);
    rowTemp2 = getRandomInt(0, 4);
    colTemp2 = getRandomInt(0, 4);

    console.log('cell1: ' + rowTemp1 + ', ' + colTemp1 + '  cell2: ' + rowTemp2 + ', ' + colTemp2);
    this._exchangeCells(rowTemp1, colTemp1, rowTemp2, colTemp2);
  }
  this.draw();
};


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
 } else { console.log ('Error');}
};

/*          New Class                   */

function FifteenGraphic() {
  FifteenConsole.apply(this, arguments);
  this.field = this._field;
}

FifteenGraphic.prototype = Object.create(FifteenConsole.prototype);
FifteenGraphic.prototype.constructor = FifteenGraphic;

FifteenGraphic.prototype.winField1 = [[1, 2, 3, 4], 
                                      [5, 6, 7, 8], 
                                      [9, 10, 11, 12],
                                      [13, 14, 15, 0]];
FifteenGraphic.prototype.winField2 = [[1, 2, 3, 4], 
                                      [5, 6, 7, 8], 
                                      [9, 10, 11, 12],
                                      [13, 14, 15, 0]];

/*FifteenGraphic.prototype.isWin = function() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
}*/


