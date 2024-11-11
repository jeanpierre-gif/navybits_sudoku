import { solveSudoku, getHint } from '@/utils/sudokuSolver';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent,  DialogTrigger } from "@/components/ui/dialog";

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
        <Button className="w-full md:w-1/2 bg-white text-black hover:bg-white border-black hover:border-blue" onClick={handleHint}>Hint</Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger onClick={checkSolution} className='mt-4 border-black' >     
      Check Solution
     </DialogTrigger>
     <DialogContent >
          <div >
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
