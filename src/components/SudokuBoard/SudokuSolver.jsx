import { solveSudoku, getHint } from '@/utils/sudokuSolver';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@radix-ui/react-dialog';

function SudokuSolver({ generatedBoard, setBoard, originalBoard }) {
  const [solvedBoard, setSolvedBoard] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    if (originalBoard) {
      const boardCopy = originalBoard.map(row => [...row]);
      const solution = solveSudoku(boardCopy);
      setSolvedBoard(solution);
    }
  }, [originalBoard]);

  const handleSolve = () => {
    if (solvedBoard) {
      setBoard(solvedBoard);
    } else {
      setDialogMessage("No solution exists for this board!");
      setIsDialogOpen(true);
    }
  };

  const handleHint = () => {
    if (solvedBoard) {
      const hint = getHint(generatedBoard, solvedBoard);
      if (hint) {
        const { row, col, value } = hint;
        const updatedBoard = generatedBoard.map((r, i) =>
          r.map((cell, j) => (row === i && col === j ? value : cell))
        );
        setBoard(updatedBoard);
      }
    }
  };

  const checkSolution = () => {
    const convertedBoard = generatedBoard.map(row => row.map(cell => (cell === '' ? '' : parseInt(cell))));
    let isCorrect = true;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (convertedBoard[row][col] !== solvedBoard[row][col]) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) break;
    }

    if (isCorrect) {
      setDialogMessage("Congratulations! The solution is correct.");
    } else {
      setDialogMessage("There are errors in your solution.");
    }
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className='flex mt-4 gap-2'>
        <Button onClick={handleSolve} className="w-full md:w-1/2">Solve Board</Button>
        <Button className="w-full md:w-1/2 bg-white text-black hover:bg-white hover:border-black" onClick={handleHint}>Hint</Button>
      </div>
      <div className='flex mt-4 w-full'>
        <Button className="w-full" onClick={checkSolution}>Check Solution</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30" />
        <DialogContent className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>{dialogMessage}</p>
            <div className="mt-4 text-right">
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SudokuSolver;
