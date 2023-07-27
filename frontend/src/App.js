import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Routes, Route } from "react-router-dom";
import NoPage from "./Components/NoPage";
import Dashboard from "./Components/Dashboard";




import Home from "./Components/Home";

function App() {
  return (
    
        <div>
          <Routes>
          <Route path="Dashboard" element={<Dashboard />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="Home" element={<Home />}></Route>
            <Route path="Register" element={<Register />}></Route>
            <Route path="Login" element={<Login />}></Route>
            
            

            <Route path="*" element={<NoPage />}></Route>
          </Routes>
         </div>
         );
}

export default App;