
import { Button } from "@/components/ui/button";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import PropTypes from "prop-types";
const SudokuTutorial = ({StartTutorialCallBack}) =>{
  
    const startTutorial = () => {
    const driverObj=driver({
      showProgress: true,
      steps: [
        {
          element: ".board",
          popover: {
            title:"This is the board",
            description:"You should fill all the empty cells to win the game"
          }
        },
        {
            element: '.HighlightedRow',
            popover: {
              title: "How to play",
              description: "Click on an empty cell in this row and input a number, the number must not already be in the same row, or the same column or the subgrid"
            }
          },
        {
          element: ".DifficultyBtn",
          popover: {
            title: "Select Difficulty",
            description: "Click here to choose the difficulty level for your Sudoku puzzle. Options include Easy, Medium, and Hard."
          }
        },
        {
          element: ".generateNewBoardBtn",
          popover: {
            title: "Generate New Puzzle",
            description: "Click this button to generate a new Sudoku puzzle based on your selected difficulty level."
          }
        },
        {
          element: ".HintBtn",
          popover: {
            title: "Get a Hint",
            description: "Click here to reveal a helpful hint for one of the cells in your puzzle. It will show you the correct number for that cell."
          }
        },
        {
          element: ".solveBoardBtn",
          popover: {
            title: "Solve the Puzzle",
            description: "Click this button to automatically fill in the entire Sudoku board with the correct solution."
          }
        },
        {
          element: ".checkSolutionBtn",
          popover: {
            title: "Check Your Solution",
            description: "Click this button to check if your current Sudoku solution is correct. Incorrect cells will be highlighted."
          }
        },
       
      ]
      
    })
    driverObj.drive();
    
      }
      StartTutorialCallBack();
      return(
        <Button onClick={startTutorial} className="w-full md:w-1/2 bg-white text-black border-black hover:bg-white hover:border-blue">Want a Tour?</Button>
      )
}
SudokuTutorial.propTypes = {
    StartTutorialCallBack: PropTypes.func.isRequired,
}
export default SudokuTutorial;