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
            if (board[row][col] === 0) {
                const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
                numbers.sort(() => Math.random() - 0.5); // Shuffle numbers
                for (let num of numbers) {
                    if (isValidPlacement(board, row, col, num)) {
                        board[row][col] = num;
                        if (fillBoard(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
  };
  
  // Remove cells to create a puzzle with a specified number of empty cells
  const removeCells = (board, emptyCells) => {
    let cellsRemoved = 0;
    while (cellsRemoved < emptyCells) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsRemoved++;
        }
    }
  };
  
  // Main function to generate a random puzzle with difficulty levels
  export const generateSudokuPuzzle = (difficulty = 'medium') => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(board);
  
    let emptyCells;
    switch (difficulty) {
        case 'easy':
            emptyCells = 30;
            break;
        case 'medium':
            emptyCells = 40;
            break;
        case 'hard':
            emptyCells = 50;
            break;
        default:
            emptyCells = 40;
    }
  
    removeCells(board, emptyCells);
    const emptyBoard = board.map(row=>row.map(cell=>cell===0 ? '': cell));
    return emptyBoard;
  };
  