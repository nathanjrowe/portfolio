import React, { useEffect } from 'react';
import './styles/NavBar.css';
import { Link, NavLink } from 'react-router-dom';

function NavBar({ json }) {
  useEffect(() => {
    const handleMobileMenu = () => {
      const burger = document.querySelector('.burger');
      const nav = document.querySelector('.nav-menu');
      const navLinks = document.querySelectorAll('.nav-menu li a');
      const toggleMenu = () => {
        //console.log("Before toggle:", burger.classList, nav.classList);
        burger.classList.toggle("active");
        nav.classList.toggle("active");
        //console.log("After toggle:", burger.classList, nav.classList);
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