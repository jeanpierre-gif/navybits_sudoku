import { useState, useEffect } from 'react';
import SudokuCell from './SudokuCell';
import { Button } from '../ui/button';
import { generateSudokuPuzzle } from '@/utils/SudokuGenerator';
import Header from './Header';
import { useParams } from 'react-router-dom';
import DifficultyLevel from '../DifficultyLevel/DifficultyLevel';
import SudokuSolver from './SudokuSolver';
function SudokuBoard() {
  const { Difficulty } = useParams();
  const [difficulty, setDifficulty] = useState(Difficulty || 'medium');
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill('')));
  const [generateNew, setgenerateNew] = useState(false);
  const [lockedCells, setLockedCells] = useState([]);
  const [errors, setErrors] = useState([]); 
  const generatePuzzle = (difficultyLevel) => {
    setgenerateNew(!generateNew);
    const newBoard = generateSudokuPuzzle(difficultyLevel);
    setBoard(newBoard);

    //set locked cells based on the generated puzzle
    const newLockedCells = [];
    newBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) newLockedCells.push([rowIndex, colIndex]);
      });
    });
    setLockedCells(newLockedCells);
    setErrors([]); //reset errors when generating a new puzzle
  };

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

    //row and col validation
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

    //subgrid validation
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        let boxSet = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let row = 3 * boxRow + i;
            let col = 3 * boxCol + j;
            if (board[row][col] && boxSet.has(board[row][col]))
              newErrors.push([row, col]);
            boxSet.add(board[row][col]);
          }
        }
      }
    }

    setErrors(newErrors);
  };

  //generate a puzzle based on difficulty change
  useEffect(() => {
    console.log(difficulty);
    generatePuzzle(difficulty);
  }, [difficulty]);

  //validate the board whenever it changes
  useEffect(() => {
    validateBoard();
  }, [board]);

  const isErrorCell = (row, col) => errors.some(([r, c]) => r === row && c === col);

  const getBorderClasses = (rowIndex, colIndex) => {
    let borderClasses = 'border border-gray-300';
    if (rowIndex % 3 === 0 && rowIndex !== 0) borderClasses += ' border-t-4 ';
    if (colIndex % 3 === 0 && colIndex !== 0) borderClasses += ' border-l-4 ';
    return borderClasses;
  };

  return (
    <div className='flex w-full justify-center items-center p-4'>
      <div className='flex flex-col'>
        <Header DifficultyLevel={difficulty} generateNew={generateNew} />
        <div className='grid grid-cols-9 p-4 bg-gray-100 rounded-lg'>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className={`${getBorderClasses(rowIndex, colIndex)} 
                            ${isErrorCell(rowIndex, colIndex) ? 'bg-red-200' : ''}
                            ${
                              lockedCells.some(
                                ([r, c]) => r === rowIndex && c === colIndex
                              )
                                ? 'bg-gray-200'
                                : ''
                            }`}
                disabled={lockedCells.some(([r, c]) => r === rowIndex && c === colIndex)}
              />
            ))
          )}
        </div>
        <div className='flex mt-4 gap-2 flex-col md:flex-row'>
  <DifficultyLevel setDifficulty={setDifficulty} />
  <Button onClick={() => generatePuzzle(difficulty)} className="w-full md:w-1/2">Generate new board</Button>
</div>
<SudokuSolver generatedBoard={board} setBoard={setBoard} />
       
      </div>
    </div>
  );
}

export default SudokuBoard;
