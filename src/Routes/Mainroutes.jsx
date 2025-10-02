import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Navbar from '../Components/Navbar';
import Home from '../Components/Home';
import ContactSimple from '../Components/ContactSimple';
// import School  from '../Components/School'; // Temporarily disabled to fix build
// import Background from '../Components/Background'; // Temporarily disabled - uses WebGL



const Mainroutes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar onMenuToggle={setIsMenuOpen} />
      <div className={`transition-filter duration-300 ${isMenuOpen ? 'blur-sm' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactSimple />} />
          {/* <Route path="/school" element={<School />} /> */}
          {/* <Route path="/background" element={<Background />} /> */}
          

        </Routes>
      </div>
    </div>
  );
};

export default Mainroutes;