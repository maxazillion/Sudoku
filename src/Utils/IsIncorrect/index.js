function isIncorrect(puzzle){
  let isWrong = false;
  let checkedCol = [[],[],[],[],[],[],[],[],[]]
  puzzle.forEach((row)=>{
    let checkedRow = [];
    row.forEach((cell, index)=>{
      if(cell !== 0) {
        if (checkedRow.includes(cell)) isWrong = true;
        checkedRow.push(cell);
        if (checkedCol[index].includes(cell)) isWrong = true;
        checkedCol[index].push(cell)
      }
    })
  })
  return isWrong;
}

export default isIncorrect;
