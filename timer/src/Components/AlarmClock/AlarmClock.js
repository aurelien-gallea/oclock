import React from "react";
import classes from "./AlarmClock.module.css";

function AlarmClock(props) {
  
  return (
    <div
      className={
        props.isDown
          ? classes.result + " " + classes.unset
          : classes.result + " " + classes.set
      }
    >
      <div className={classes.message + " fs-5"}>
        {props.isDown ? (
          <strike>
            {props.message} : {props.dring}
          </strike>
        ) : (
          <>
          <div>
            {props.message} : {props.dring} 
            </div>
            <div>
               reste {props.hours !== 0 ? props.hours + " h" : null } {props.minutes} m {props.seconds} s
          </div>
          </>
        )}
      </div>
      <div onClick={props.removed} style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </div>
  );
}

export default AlarmClock;
