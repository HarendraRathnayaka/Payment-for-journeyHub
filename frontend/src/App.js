import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import ApplyDiscount from './applydiscount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/discount/:clientId" element={<ApplyDiscount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
