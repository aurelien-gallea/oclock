import React, { useEffect, useState, useRef } from "react";
import classes from "./Chrono.module.css";
import audioStart from "../../assets/startLuigi.mp3";
import audioStop from "../../assets/stop.mp3";
import audioLap from "../../assets/finallap.mp3";
import audioStartRace from "../../assets/racestart.mp3";

function Chrono() {
  //states
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  
  const [chrono, setChrono] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  let [lap, setLap] = useState(0);
  let myLap = useRef(null);
  const [print, setPrint] = useState([]);
 
  // effect
  useEffect(() => {
    let run = null;
    if (isStarted && !isStopped) {
      run = setInterval(() => {
        setChrono((time) => time + 10);
        
        
      }, 10);
      
    } else {
      clearInterval(run);
    }
    return () => clearInterval(run);
  }, [isStarted, isStopped, chrono, print]);
  
  

  if (chrono === 1000) {
    setChrono(0);
    setSeconds(seconds+1);
  }
  if (seconds === 60) {
    setSeconds(0);
    setMinutes(minutes+1);
  }
  const clickHandlerButton = () => {
    if (!isStarted) {
      const start = new Audio(audioStart);
      start.play();
    } else {
      const stop = new Audio(audioStop);
      stop.play();
    }
    
    console.log("ok");
    setIsStarted(!isStarted);
    setIsStopped(!isStopped);
    
  };
  
  const resetHandlerButton = () => {
    setChrono(0);
    setSeconds(0);
    setMinutes(0);
    setLap(0);
    setPrint([]);
    setIsStarted(false);
    setIsStopped(true);
    const startRace = new Audio(audioStartRace);
    startRace.play();
  };
  
  const printLapHandlerButton = () => {
    setLap(lap += 1);
    let result= `Tour n ° ${lap} = ${minutes} : ${seconds} : ${(chrono/10).toFixed(0)}`;
    const newDiv = [...print,result];
    setPrint(newDiv); 
    const start = new Audio(audioStart);
    start.pause();
    const lapAudio = new Audio(audioLap);
    lapAudio.play();
  };

  let lapTimes = print.map((lap, index) => {
    return (
      
      
      <div className={classes.result + " mb-3 fs-3 text-white"} key={"tour_" + index+1}>{lap}</div>
    )
  });
  
  let milliseconds = (chrono /10).toFixed(0);

  return (
    <div >
      <h1 className={classes.title}>Chronomètre</h1>
      
      <div className="bg-dark text-white fs-1 mb-5 col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto rounded-3 py-2" ref={myLap}>
        {minutes< 10 ? "0" + minutes : minutes} : {seconds<10 ? "0" + seconds : seconds} : <span style={{ color : "red"}}>{milliseconds <10 ? "0" + milliseconds : milliseconds}</span>
      </div>
      <div className="d-flex justify-content-center gap-3">
        <button onClick={clickHandlerButton} className="btn btn-outline-dark">
          {isStarted ? "STOP" : "GO"}
        </button>
        <button onClick={printLapHandlerButton} className="btn btn-outline-warning" >TOUR</button>
        <button onClick={resetHandlerButton} className="btn btn-outline-danger">
          RESET
        </button>
      </div>
      <div className="mt-5">{lapTimes}</div>
    </div>
  );
}

export default Chrono;
