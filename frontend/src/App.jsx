import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Navbar/Nav";
import EditorOut from "./components/Editors/EditorOut";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllProjects from "./pages/projects/AllProjects";
import YourProjects from "./pages/projects/YourProjects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-editor" element={<EditorOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/yourprojects" element={<YourProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
