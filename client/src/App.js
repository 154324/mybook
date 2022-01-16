import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./components/views/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (   
    <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
         </Router>
 
    </div>
  );
}

export default App;
