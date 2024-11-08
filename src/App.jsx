import './App.css';
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';
function App() {
        const navigate=useNavigate();
        const handleNavRoute=(difficultyLevel)=>{
        console.log(difficultyLevel);
    navigate(`/Sudoku/${difficultyLevel}`)
        }
  return (
    <div className="relative w-full h-screen bg-[#1E1E1E]">
     
     <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <path fill="#FAB440" d="M34.7,-49.3C47.4,-38.5,61.9,-31.7,68.9,-20C76,-8.4,75.6,8,69.4,21.1C63.2,34.2,51.1,44,38.6,53.4C26,62.8,13,71.7,-3.3,76.3C-19.6,80.8,-39.2,80.8,-52.9,71.8C-66.6,62.8,-74.5,44.8,-70.9,29.3C-67.4,13.8,-52.5,0.8,-46.3,-14C-40.1,-28.9,-42.6,-45.5,-36.4,-58.4C-30.1,-71.2,-15,-80.3,-2,-77.5C11,-74.7,22,-60,34.7,-49.3Z"  />
</svg>
      
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200" className='fixed bottom-0 ' style={{ transform: 'rotateX(180deg)' }}>
        <path fill="#4E47C6" d="M34.7,-49.3C47.4,-38.5,61.9,-31.7,68.9,-20C76,-8.4,75.6,8,69.4,21.1C63.2,34.2,51.1,44,38.6,53.4C26,62.8,13,71.7,-3.3,76.3C-19.6,80.8,-39.2,80.8,-52.9,71.8C-66.6,62.8,-74.5,44.8,-70.9,29.3C-67.4,13.8,-52.5,0.8,-46.3,-14C-40.1,-28.9,-42.6,-45.5,-36.4,-58.4C-30.1,-71.2,-15,-80.3,-2,-77.5C11,-74.7,22,-60,34.7,-49.3Z"  />
</svg>
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200" className='fixed bottom-0 right-0 ' style={{ transform: 'rotateY(180deg) rotateX(180deg)' }}>
        <path fill="#fffd82" d="M34.7,-49.3C47.4,-38.5,61.9,-31.7,68.9,-20C76,-8.4,75.6,8,69.4,21.1C63.2,34.2,51.1,44,38.6,53.4C26,62.8,13,71.7,-3.3,76.3C-19.6,80.8,-39.2,80.8,-52.9,71.8C-66.6,62.8,-74.5,44.8,-70.9,29.3C-67.4,13.8,-52.5,0.8,-46.3,-14C-40.1,-28.9,-42.6,-45.5,-36.4,-58.4C-30.1,-71.2,-15,-80.3,-2,-77.5C11,-74.7,22,-60,34.7,-49.3Z"  />
</svg>
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200" className='fixed top-0 right-0 '  style={{ transform: 'rotateY(180deg)' }}>
        <path fill="#cc4bc2" d="M34.7,-49.3C47.4,-38.5,61.9,-31.7,68.9,-20C76,-8.4,75.6,8,69.4,21.1C63.2,34.2,51.1,44,38.6,53.4C26,62.8,13,71.7,-3.3,76.3C-19.6,80.8,-39.2,80.8,-52.9,71.8C-66.6,62.8,-74.5,44.8,-70.9,29.3C-67.4,13.8,-52.5,0.8,-46.3,-14C-40.1,-28.9,-42.6,-45.5,-36.4,-58.4C-30.1,-71.2,-15,-80.3,-2,-77.5C11,-74.7,22,-60,34.7,-49.3Z"  />
</svg>
<div className='flex justify-center items-center'>
<div className='w-max '>
<h1 className='font-bold text-white text-[4rem]' > Play Sudoku</h1>
<Button className="mt-6 w-[80%] h-11 bg-green-500 text-lg rounded-3xl " onClick={()=>handleNavRoute('easy')}>Easy</Button>
<Button className="mt-5 w-[80%] h-11 bg-yellow-500 text-lg rounded-3xl" onClick={()=>handleNavRoute('medium')}>Medium</Button>
<Button className="mt-5 w-[80%] h-11 bg-red-500 text-lg rounded-3xl" onClick={()=>handleNavRoute('hard')}>Hard</Button>

</div>
</div>

     
    </div>
  );
}

export default App;
