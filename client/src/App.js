import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/views/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'
function App() {

  //리액트 라우터 돔 v6에서는 새로 변수를 지정해서 컴포넌트를 집어 넣어주자

  const NewLandingPage = Auth(LandingPage,null)
  const NewLoginPage =Auth(LoginPage,false)
  const NewLRegisterPage =Auth(RegisterPage,false)


  return (   
    <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<NewLandingPage/>} />
          <Route path="/login" element={<NewLoginPage/>} />
          <Route path="/register" element={<NewLRegisterPage/>} />
        </Routes>
         </Router>
 
    </div>
  );
}

export default App;
