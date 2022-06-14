
function fillMove(board, poss) {
  let count = -1;
  board = board.map((row) => {
    return row.map((cube) => {
      count++
      if (poss[count].length === 1 && cube === 0) {
        return poss[count][0]
      }
      return cube;
    })
  })
  return board
}

export default fillMove;
