import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import AlarmClock from "../../Components/AlarmClock/AlarmClock";

import dring from "../../assets/alarm.mp3";

function Alarm() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [warnings, setWarnings] = useState([]);
  
  let myInput = useRef(null);
  let myMessage = useRef(null);
  

  const formClickHandler = (e) => {
    e.preventDefault();

    
    if (myInput.current.value !== "") {
      if (myMessage.current.value === "") {
        myMessage.current.value = "alarme";
      }
      const newWarning = [...warnings];
      newWarning.push({
        clock: myInput.current.value,
        message: myMessage.current.value,
        expired: false,
        hours: Number(myInput.current.value.slice(0,2)),
        minutes : Number(myInput.current.value.slice(3,5)),
        seconds : ((Number(myInput.current.value.slice(0,2)) * 60) + Number(myInput.current.value.slice(3,5))),
        remaining : '',
      });
      
      setWarnings(newWarning);
    }
  };
 
  const removeClickHandler = (index) => {
    const removeWarning = [...warnings];
    removeWarning.splice(index, 1);
    setWarnings(removeWarning);
    
  };
  useEffect(() => {
    let run = null;
    run = setInterval(() => {
      const newTime = new Date().toLocaleTimeString("fr-FR");
      
      
      setTime(newTime, false);
    }, 1000);
    return () => clearInterval(run);
  })
  
  useEffect(() => {
    
    
    for (const key in warnings) {
      const element = warnings[key];
      const updateStatus = [...warnings];
      updateStatus[key].remaining = Math.abs(((Number(time.slice(0, 2)) * 3600) + Number(time.slice(3,5))*60) + Number(time.slice(6,8)) - ((Number(element.hours * 3600) + Number(element.minutes)*60)));
      setWarnings(updateStatus);
      
      if (element.remaining === 0) {
        toast.success(`Votre réveil : "${element.message}" sonne`);
        updateStatus[key].expired = true;
        setWarnings(updateStatus);
        const ring = new Audio(dring);
        ring.play();
      }
      
      
    }
  }, [time]); // ne pas toucher 
  
  let newWarnings = warnings.map((warning, index) => {
  const remainingDring = new Date(warning.remaining *1000); 
  
    return (
      <AlarmClock
        key={"alarm_" + index}
        isDown={warning.expired}
        message={warning.message}
        dring={warning.clock}
        hours={remainingDring.getHours() -1}
        minutes={remainingDring.getMinutes()}
        seconds={remainingDring.getSeconds()}
        removed={() => removeClickHandler(index)}
      />
    );
  });

  return (
    <>
      <h1 className="my-5">Réveil</h1>
      <div className="mb-3 ">
        <p className="border text-bg-dark d-inline-block p-3 ">
          Heure actuelle
          <span>
            {" "}
            : <b>{time}</b>
          </span>
        </p>
      </div>
      <div >
        <form onSubmit={formClickHandler}>
          <div className="d-flex justify-content-center mx-auto col-11 col-md-8 col-lg-6 gap-2">
            <div className="input-group">
              <label className="input-group-text" htmlFor="text">Nom : </label>
              <input
                className="form-control"
                type="text"
                ref={myMessage}
                maxLength="15"
              />
            </div>
            <div className="">
              <input type="time" ref={myInput} className="form-control " />
            </div>
          </div>
          <button className="btn mt-3 btn-outline-dark">Créer le réveil</button>
        </form>
      </div>
      {newWarnings.length > 0 ?
      <div className="mt-3">
        <hr></hr>
      <h2>Mes alarmes :</h2> 
      {newWarnings} 
      </div> 
      : null
    }
    </>
  );
}

export default Alarm;
