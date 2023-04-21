import React, { useEffect, useState } from "react";
import classes from "./Clock.module.css";

function Clock() {

    const [myTime, setMyTime] = useState(new Date().toLocaleTimeString());

    
    useEffect(() => {

        setInterval(() => {
            const hour = new Date().toLocaleTimeString();
            setMyTime(hour);
        },1000);
    }, []);
        
    return ( 
        <>
        <h1 className={classes.title}>Horloge</h1>
        <div className={classes.Clock + " col-10 col-md-6 mx-auto d-flex justify-content-center align-items-center"}>{myTime}</div>
        </>

     );
}

export default Clock;