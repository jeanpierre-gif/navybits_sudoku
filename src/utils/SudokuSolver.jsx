export function solveSudoku(board) {
  const boardCopy = board.map(row => [...row]);
  
  function isSafe(board, row, col, num) {
    //if the number is in the current row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }
  
    //if the number is in the current column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
  
    //if the number is in the current 3x3 subgrid
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
  
    return true; 
  }
  
  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (boardCopy[row][col] === '' || boardCopy[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(boardCopy, row, col, num)) {
              boardCopy[row][col] = num; 
              if (solve()) return true; 
              boardCopy[row][col] = 0; 
            }
          }
          return false;
        }
      }
    }
    return true; 
  };

  const isSolved = solve();
  if (isSolved) {
    return boardCopy; 
  }

  console.log("No solution exists.");
  return null;
}
export function getHint(board, solvedBoard){
  if(!solvedBoard) return null;

  for(let row=0;row<9;row++){
    for(let col=0;col<9;col++){
      if(board[row][col]==='' || board[row][col] !== solvedBoard[row][col]){

        return {row, col ,value:solvedBoard[row][col]};
      }
    }
  }
  return null;
}
