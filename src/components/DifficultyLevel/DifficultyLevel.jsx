import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

 function DropdownMenuDemo({ setDifficulty }) {
  const navigate = useNavigate();

  const handleSelect = (difficulty) => {
    setDifficulty(difficulty);
    navigate(`/sudoku/${difficulty}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Difficulty</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleSelect('easy')}>
            Easy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('medium')}>
            Medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('hard')}>
            Hard
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
DropdownMenuDemo.propTypes = {
  setDifficulty:PropTypes.func.isRequired
};
export default DropdownMenuDemo;
