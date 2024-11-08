// Utility function to check if placing a number is valid
const isValidPlacement = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };
  
  // Backtracking algorithm to fill the board
  const fillBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '') {
          const numbers = Array.from({ length: 9 }, (_, i) => (i + 1).toString());
          numbers.sort(() => Math.random() - 0.5); // Shuffle numbers
          for (let num of numbers) {
            if (isValidPlacement(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = '';
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  
  // Remove cells to create a puzzle with a specified number of empty cells
  const removeCells = (board, emptyCells = 40) => {
    let cellsRemoved = 0;
    while (cellsRemoved < emptyCells) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== '') {
        board[row][col] = '';
        cellsRemoved++;
      }
    }
  };
  
  // Main function to generate a random puzzle
  export const generateSudokuPuzzle = (emptyCells = 40) => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(''));
    fillBoard(board);       // Generate a full, valid Sudoku board
    removeCells(board, emptyCells); // Remove cells to create the puzzle
    return board;
  };
  