import { solveSudoku } from '@/utils/sudokuSolver';
import { Button } from '../ui/button';

function SudokuSolver({ generatedBoard, setBoard }) {
  const handleSolve = () => {
    const boardCopy = generatedBoard.map(row => [...row]); 
    const solvedBoard = solveSudoku(boardCopy);

    if (solvedBoard) {
        console.log(solvedBoard);
      setBoard(solvedBoard);
    } else {
      alert("No solution exists for this board!");
    }
  };

  return (
    <div className='flex mt-4 gap-2'>
      <Button onClick={handleSolve} className="w-full md:w-1/2">Solve Board</Button>
    </div>
  );
}

export default SudokuSolver;
