import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CollapsibleSideMenu.css'; // Your CSS file

const CollapsibleSideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
      <button className="menu-toggle-button" onClick={toggleMenu}>
        Toggle Menu
      </button>
      <ul className="menu-items">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default CollapsibleSideMenu;