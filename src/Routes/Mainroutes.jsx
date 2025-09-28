import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Navbar from '../Components/Navbar';
import Home from '../Components/Home';
import Contact from '../Components/Contact';
import School  from '../Components/School';
import Background from '../Components/Background';



const Mainroutes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar onMenuToggle={setIsMenuOpen} />
      <div className={`transition-filter duration-300 ${isMenuOpen ? 'blur-sm' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/school" element={<School />} />
          <Route path="/background" element={<Background />} />
          

        </Routes>
      </div>
    </div>
  );
};

export default Mainroutes;