import React, { useEffect,  useState } from "react";
import { toast } from "react-toastify";
import classes from "./Timer.module.css";

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const [validate, setValidate] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes((m) => m + 1);
    }

    if (seconds < 0 && minutes > 0) {
      setSeconds(59);
      setMinutes((m) => m - 1);
    }

    if ((seconds < 0 && minutes === 0) || minutes < 0) {
      toast.error("Le voyage dans le temps est interdit !");
      setSeconds(0);
      setMinutes(0);
    }
  }, [seconds, minutes]);
  
  useEffect(() => {
    let run = null;
    if (validate && !isStopped) {
      run = setInterval(() => {
        
        setSeconds((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(run)
    }
    if (minutes === 0 && seconds === 0 && validate) {
      toast.warning("Temps écoulé !");
      clearInterval(run);
      setValidate(false);
    }
    return () => clearInterval(run);
  }, [minutes, seconds, validate, isStopped]);

  
  const submitFormHandler = (e) => {
    e.preventDefault();
  };
  
  const confirmFormHandler = () => {
    if (isNaN(seconds)) {
      setSeconds(0);
    }
    if (isNaN(minutes)) {
      setMinutes(0);
    }

    if (seconds === 0 && minutes === 0 ){
      toast.error("merci de remplir les champs");
      
    } else {

      setValidate(true);
    }
  };

  const resetClickedHandler = () => {
    setMinutes(0);
    setSeconds(0);
    setIsStopped(false);
  }
  
  const toggleClickedHandler = () => {
    if (!isStopped) {
      toast.info("Compte à rebours Arrêté !");
    } else {
      toast.success("Compte à rebours Actif !");
    }
    setIsStopped(!isStopped);
    
  }
 
  return (
    <>
      <h1 className={classes.title}>Minuteur</h1>
      <div>
        <form onSubmit={submitFormHandler}>
          {!validate ? (
            <>
              <div>
                <div className="col-11 mx-auto col-sm-6 col-md-4 col-xl-3 mb-3">
                  <div className="input-group">
                    <button
                      className="btn btn-dark fs-4 me-1"
                      onClick={() => setMinutes((m) => m + 1)}
                    >
                      &#8613;
                    </button>
                    <button
                      className="btn btn-dark fs-4 me-1"
                      onClick={() => setMinutes((m) => m - 1)}
                    >
                      ↧
                    </button>
                    <input
                      className="form-control d-inline fs-4"
                      id="minutes"
                      type="number"
                      value={minutes}
                      
                      onChange={(e) => setMinutes(e.target.value)}
                      // onFocus={(e) => setMinutes(e.target.value)}
                    />
                    <label className="input-group-text fs-4" htmlFor="minutes">
                      minutes
                    </label>
                  </div>
                </div>
                <div className="col-11 mx-auto col-sm-6 col-md-4 col-xl-3 mb-3">
                  <div className="input-group">
                    <button
                      className="btn btn-dark fs-4 me-1"
                      onClick={() => setSeconds((s) => s + 10)}
                    >
                      &#8613;
                    </button>
                    <button
                      className="btn btn-dark fs-4 me-1"
                      onClick={() => setSeconds((s) => s - 10)}
                    >
                      ↧
                    </button>
                    <input
                      className="form-control d-inline fs-4"
                      id="secondes"
                      type="number"
                      onChange={(e) => setSeconds(e.target.value)}
                      value={seconds}
                      // onFocus={(e) => setSeconds(e.target.value)}
                    />
                    <label className="input-group-text fs-4" htmlFor="secondes">secondes</label>
                  </div>
                </div>
              </div>

              <div className={classes.flexBtn}>
                <button onClick={confirmFormHandler} className="btn btn-outline-dark fs-4 rounded-pill px-4 py-2">
                  Start
                </button>
              </div>
            </>
          ) : (
            <>
            <div className="fs-1 d-inline-block  bg-dark text-light py-5 px-4 rounded-circle mt-2">
              {minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds}  
            </div>
            <div>
            <button onClick={() => {
              toggleClickedHandler()
            }} className="btn btn-danger mt-4 me-2">{validate ? "Stop" : "Go"}  </button>
            <button onClick={() => {
              resetClickedHandler()
            }} className="btn btn-outline-danger mt-4">Annuler</button>
            </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default Timer;
