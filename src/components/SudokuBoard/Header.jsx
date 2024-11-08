import { useState, useEffect } from "react";
import PauseIcon from '../../assets/pauseIcon.svg';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
function Header({ DifficultyLevel }) {
    const [seconds, setSeconds] = useState(0); // Track elapsed time in seconds
    const [paused,setPaused]=useState(false);
    const handlePauseButton =()=>{
      setPaused(true);
    }
    const handleResumeButton =()=>{
      setPaused(false);
    }
    useEffect(() => {
      if(paused){
        return;
      }
        // Start timer on component mount
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [paused]);

    // Convert seconds to minutes and seconds
    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="flex flex-row justify-between p-1 mb-1 items-center">
            <p>Difficulty: {DifficultyLevel}</p>
            <div className="flex gap-2 items-center"> 
                        <p>{formatTime()}</p>
                        <Dialog open={paused} onOpenChange={setPaused}>
                        <DialogTrigger onClick={handlePauseButton} className="hover:opacity-30 cursor-pointer">
      <img src={PauseIcon}  alt="Pause Icon" width={24} height={24}  />
      </DialogTrigger>
      <DialogContent className="justify-center">
        <DialogHeader>
          <DialogTitle className="flex justify-center">Paused</DialogTitle>
        </DialogHeader>
        <DialogFooter >
        <Button type="submit" onClick={handleResumeButton}>Resume</Button>

        </DialogFooter>
      </DialogContent>

    </Dialog>
    </div>            

        </div>
    );
}

export default Header;
