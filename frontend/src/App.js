import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import ApplyDiscount from './applydiscount';
import Home from './home';

function App() {
  // Define the base URL dynamically
  //const baseUrl = window.location.origin;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Use the base URL to construct route paths */}
          <Route path="/discount/:clientId" element={<ApplyDiscount />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
