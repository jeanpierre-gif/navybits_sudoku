/* eslint-disable react/prop-types */
import SudokuCell from './SudokuCell';

const SudokuGrid = ({ board, handleChange, getBorderClasses, isErrorCell, lockedCells, highlightedRow,highlightedCol }) => (
  <div className='grid-cols-9 p-4 bg-gray-100 rounded-lg board'>
    {board.map((row, rowIndex) => (
      <div 
        key={rowIndex} 
        className={` ${rowIndex === highlightedRow ? 'HighlightedRow' : ''}`} 
        data-row={rowIndex}
      >
        {row.map((cell, colIndex) => (
          
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            className={`${getBorderClasses(rowIndex, colIndex)} 
                        ${isErrorCell(rowIndex, colIndex) ? 'bg-red-200' : ''} 
                        ${lockedCells.some(([r, c]) => r === rowIndex && c === colIndex) ? 'bg-gray-200' : ''} 
                                                ${colIndex === highlightedCol ? 'highlightedCol' : ''}

             `} 
            disabled={lockedCells.some(([r, c]) => r === rowIndex && c === colIndex)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SudokuGrid;
