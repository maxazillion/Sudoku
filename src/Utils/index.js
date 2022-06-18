import _ from "lodash";

const oneToNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function makeBoard(rawBoard){
  let board = [];
  let blockCounterOuter = 0;
  let blockCounterInner = 0;
  rawBoard.forEach((row, index)=>{
    row.forEach((cell, subIndex)=>{
      board.push({
        value: cell,
        row: index,
        col: subIndex,
        block: blockCounterInner + blockCounterOuter,
        poss: [...oneToNine],
      })
      if((subIndex + 1) % 3 === 0){
        blockCounterInner += 1;
      }
    })
    blockCounterInner = 0;
    if((index + 1) % 3 === 0){
      blockCounterOuter += 3
    }

  })
  return board;
}

function fillMoves(board){
  return board.map((cell)=>{
    if(cell.value === 0 && cell.poss.length === 1){
      cell.value = cell.poss[0];
    }
    return cell;
  })
}

function checkComplete(board){
  let ret = 1;
  let canChange = true;

  board.forEach((cell)=>{
    if(cell.value === 0 && canChange){
      ret = 0;
    }
    if(cell.value === 0 && cell.poss.length === 0){
      ret = -1;
      canChange = false;
    }
  })
  return ret;
}

function checkEasyMoves(board){
  let ret = 1;
  let canChange = true;

  board.forEach((cell)=>{
    if(cell.poss.length === 1 && canChange){
      ret = 0;
    }
    if(cell.value === 0 && cell.poss.length === 0){
      ret = -1;
      canChange = false;
    }
  })
  return ret;
}

function fillWhatYouCan(board){

  board = fillMoves(board);
  board = adjustPossible(board)
  let fs = 0;
  while(!checkEasyMoves(board) && fs < 10){
    board = fillMoves(board);
    board = adjustPossible(board)
    fs++;
  }
  return board;
}

function createNewBoards(board){
  let fewestOptions = null;
  let boardQ = [];

  board.forEach((cell)=>{
    if(cell.value ===  0) {
      if(fewestOptions === null){
        fewestOptions = cell;
      }
      if (cell.poss.length < fewestOptions.poss.length) {
        fewestOptions = cell;
      }
    }
  })

  fewestOptions.poss.forEach((num)=>{
    let tempB = _.cloneDeep(board);
    tempB[fewestOptions.index].value = num;
    tempB = fillWhatYouCan(tempB);
    boardQ.push(tempB);
  })

  return boardQ;
}

function adjustPossible(board){
  let vertPoss = [[...oneToNine], [...oneToNine], [...oneToNine],
    [...oneToNine], [...oneToNine], [...oneToNine],
    [...oneToNine], [...oneToNine], [...oneToNine]];
  let horizPoss = [[...oneToNine], [...oneToNine], [...oneToNine],
    [...oneToNine], [...oneToNine], [...oneToNine],
    [...oneToNine], [...oneToNine], [...oneToNine]];
  let blockPoss = [[...oneToNine], [...oneToNine], [...oneToNine],
    [...oneToNine], [...oneToNine], [...oneToNine],
    [...oneToNine], [...oneToNine], [...oneToNine]];

  board.forEach((cell, index)=>{
    if(cell.index === undefined) cell.index = index;
    if(cell.value !== 0){
      if(vertPoss[cell.col].includes(cell.value)){
        vertPoss[cell.col].splice(vertPoss[cell.col].indexOf(cell.value), 1)
      }
      if(horizPoss[cell.row].includes(cell.value)){
        horizPoss[cell.row].splice(horizPoss[cell.row].indexOf(cell.value), 1)
      }
      if(blockPoss[cell.block].includes(cell.value)){
        blockPoss[cell.block].splice(blockPoss[cell.block].indexOf(cell.value), 1)
      }
    }
  })

  board.forEach((cell)=>{
    cell.poss = cell.poss.filter((num)=>{
      return (vertPoss[cell.col].includes(num) &&
        horizPoss[cell.row].includes(num) &&
        blockPoss[cell.block].includes(num));

    })
  })
  return board;
}

export {fillMoves, adjustPossible, fillWhatYouCan, checkEasyMoves, checkComplete, createNewBoards, makeBoard};
