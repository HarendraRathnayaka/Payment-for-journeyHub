import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
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
