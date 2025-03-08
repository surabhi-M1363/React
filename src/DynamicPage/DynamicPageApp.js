import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";  // ✅ Ensure correct path
import Home from "./Home"; 
import About from "./About"; 
import Contact from "./Contact"; 
import Post from "./Post"; 
import NotFound from "./NotFound"; 
import "./DynamicPageApp.css"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;