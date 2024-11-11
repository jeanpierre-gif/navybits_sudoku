import './App.css';
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';
import MenuLayout from './components/Layout/MenuLayout';
function App() {
        const navigate=useNavigate();
        const handleNavRoute=(difficultyLevel)=>{
    navigate(`/Sudoku/${difficultyLevel}`)
        }
  return (
        <MenuLayout>
    
<div className='w-max'>
<h1 className='font-bold text-white text-[4rem]' > Play Sudoku</h1>
<Button className="mt-6 w-[80%] h-11 bg-green-500 text-lg rounded-3xl " onClick={()=>handleNavRoute('easy')}>Easy</Button>
<Button className="mt-5 w-[80%] h-11 bg-yellow-500 text-lg rounded-3xl" onClick={()=>handleNavRoute('medium')}>Medium</Button>
<Button className="mt-5 w-[80%] h-11 bg-red-500 text-lg rounded-3xl" onClick={()=>handleNavRoute('hard')}>Hard</Button>

</div>
</MenuLayout>

  );
}

export default App;
