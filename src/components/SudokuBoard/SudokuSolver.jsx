import { solveSudoku,getHint } from '@/utils/sudokuSolver';
import { Button } from '../ui/button';

function SudokuSolver({ generatedBoard, setBoard }) {
  const boardCopy = generatedBoard.map(row => [...row]); 
  const solvedBoard = solveSudoku(boardCopy);

  const handleSolve = () => {
  
    if (solvedBoard) {
        console.log(solvedBoard);
      setBoard(solvedBoard);
    } else {
      alert("No solution exists for this board!");
    }
  };
   const handleHint = ()=>{
    if(solvedBoard){
      const hint=getHint(boardCopy,solvedBoard);
      console.log(hint);
      if(hint){
        const {row,col,value} = hint;
        const updatedBoard = generatedBoard.map((r,i )=>
          r.map((cell,j)=>{
            if(row === i && col ===j){
              return value;
            }
            else{
              return cell;
            }
          })
        )
        setBoard(updatedBoard);
      } 

    }

  }
  return (
    <div className='flex mt-4 gap-2'>
      <Button onClick={handleSolve} className="w-full md:w-1/2">Solve Board</Button>
      <Button className="w-full md:w-1/2 bg-white text-black hover:bg-white hover:border-black" onClick={handleHint}>Hint</Button>
    </div>
  );
}

export default SudokuSolver;
