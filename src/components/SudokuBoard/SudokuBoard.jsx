import { useState, useEffect } from 'react';
import SudokuCell from './SudokuCell';
import { Button } from '../ui/button';
import { generateSudokuPuzzle } from '@/utils/SudokuGenerator';
import Header from './Header';
import DifficultyLevel from '../DifficultyLevel/DifficultyLevel';
function SudokuBoard() {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill('')));
  const [lockedCells, setLockedCells] = useState([]);
  const [errors, setErrors] = useState([]); // Tracks cells with conflicts

  const handleChange = (row, col, value) => {
    if (lockedCells.some(([r, c]) => r === row && c === col)) return;

    if (/^[1-9]?$/.test(value)) {
      const updatedBoard = board.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell))
      );
      setBoard(updatedBoard);
    }
  };

  const validateBoard = () => {
    let newErrors = [];

    // Row and column validation
    for (let i = 0; i < 9; i++) {
      let rowSet = new Set();
      let colSet = new Set();
      for (let j = 0; j < 9; j++) {
        if (board[i][j] && rowSet.has(board[i][j])) newErrors.push([i, j]);
        rowSet.add(board[i][j]);

        if (board[j][i] && colSet.has(board[j][i])) newErrors.push([j, i]);
        colSet.add(board[j][i]);
      }
    }

    // Sub-grid validation
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        let boxSet = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let row = 3 * boxRow + i;
            let col = 3 * boxCol + j;
            if (board[row][col] && boxSet.has(board[row][col])) newErrors.push([row, col]);
            boxSet.add(board[row][col]);
          }
        }
      }
    }

    setErrors(newErrors);
  };
useEffect(()=>{
generatePuzzle();
},[]);
  useEffect(() => {
    validateBoard();
  }, [board]);

  const isErrorCell = (row, col) => errors.some(([r, c]) => r === row && c === col);

  const getBorderClasses = (rowIndex, colIndex) => {
    let borderClasses = "border border-gray-300";
    if (rowIndex % 3 === 0 && rowIndex !== 0) borderClasses += " border-t-4 ";
    if (colIndex % 3 === 0 && colIndex !== 0) borderClasses += " border-l-4 ";
    return borderClasses;
  };

  const generatePuzzle = () => {
    const newBoard = generateSudokuPuzzle(40);
    setBoard(newBoard);
    
    // Set locked cells based on generated puzzle
    const newLockedCells = [];
    newBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) newLockedCells.push([rowIndex, colIndex]);
      });
    });
    setLockedCells(newLockedCells);
  };

  return (
    <div className='flex w-full justify-center items-center p-4'>
    <div className='flex flex-col'>
      <Header DifficultyLevel="easy"/>
      <div className="grid grid-cols-9 p-4 bg-gray-100 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className={`${getBorderClasses(rowIndex, colIndex)} 
                          ${isErrorCell(rowIndex, colIndex) ? 'bg-red-200' : ''}
                          ${lockedCells.some(([r, c]) => r === rowIndex && c === colIndex) ? 'bg-gray-200' : ''}`} // Highlight locked cells
              disabled={lockedCells.some(([r, c]) => r === rowIndex && c === colIndex)}
            />
          ))
        )}
      </div>
      <DifficultyLevel />
      <Button onClick={generatePuzzle}>Generate puzzle</Button>
    </div>
    </div>
  );
}

export default SudokuBoard;
