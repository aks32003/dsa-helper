import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import Gemeni from "./Components/Gemeni/Gemeni";
import Beautify from "./Components/Beautify/Beautify";
import CodeConverter from "./Components/Convert/Convert"; // Import the CodeConverter component

export const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<><Hero /><Gemeni /></>} />
        <Route path="/beautify-code" element={<Beautify />} />
        <Route path="/code-converter" element={<CodeConverter />} /> 
      </Routes>
    </Router>
  );
}

export default App;
