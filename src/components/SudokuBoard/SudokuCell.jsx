
function SudokuCell({ value, onChange, className }) {
  return (
    <input
      type="text"
      value={value}
      maxLength="1"
      onChange={onChange}
      className={`w-10 h-10 text-center focus:outline-none focus:bg-gray-100 text-xl ${className}`}
    />
  );
}

export default SudokuCell;
