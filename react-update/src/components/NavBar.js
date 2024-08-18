import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/NavBar.css';


function NavBar({ json }) {
  // Add a useEffect hook to handle the mobile menu
  useEffect(() => {
    const handleMobileMenu = () => {
      const burger = document.querySelector('.burger');
      const nav = document.querySelector('.nav-menu');
      const navLinks = document.querySelectorAll('.nav-menu li a');
      const toggleMenu = () => {
        burger.classList.toggle("active");
        nav.classList.toggle("active");
      };

      burger.addEventListener("click", toggleMenu);
      navLinks.forEach(link => { link.addEventListener("click", toggleMenu); });
      // Cleanup function to remove the event listener
      return () => {
        burger.removeEventListener("click", toggleMenu);
        navLinks.forEach(link => { link.removeEventListener("click", toggleMenu); });
      };
    };

    const cleanup = handleMobileMenu();
    return cleanup;
  }, []);

  // NavBar items
  const data = JSON.parse(json);

  return (
    <nav className="NavBar">
      <ul className="nav-menu">
        {data.nav.map((item, index) => (
          <li key={index}>
            <NavLink to={item.url}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="burger">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default NavBar;