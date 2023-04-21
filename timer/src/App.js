import React from 'react';
import './App.css';
import routes from './config/routes';
import { Route, Routes } from 'react-router-dom';

import Layout from './hoc/Layout.js/Layout';

import Clock from './Containers/Clock/Clock';
import Timer from './Containers/Timer/Timer';
import Chrono from './Containers/Chrono/Chrono';

import Alarm from './Containers/Alarm/Alarm';

function App() {
  return (
    <div className="App">
      <Layout >

    <Routes>
      
      <Route path={routes.HOME } element={<Clock/>}/>
      <Route path={routes.ALARM } element={<Alarm/>}/>
      <Route path={routes.CHRONO } element={<Chrono/>}/>
    <Route path={routes.TIMER } element={<Timer/>}/>
    </Routes>
    </Layout>
    </div>
  );
}

export default App;
