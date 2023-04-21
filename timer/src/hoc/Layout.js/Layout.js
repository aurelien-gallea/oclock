import React from "react";
import Header from "../../Components/Header/Header";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer} from 'react-toastify';

function Layout(props) {
    return ( 
        <>
        <Header user={props.user}/>
        {props.children}
        <ToastContainer autoClose="2000" position="top-right" theme="dark"/>
        </>
     );
}

export default Layout;