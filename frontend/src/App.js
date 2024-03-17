import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Payform from './components/paymentForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/paymentform" element={<Payform/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
