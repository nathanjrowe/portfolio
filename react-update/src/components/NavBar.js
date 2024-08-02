import React from 'react';
import './styles/NavBar.css';
import { Link, NavLink } from 'react-router-dom';

function NavBar({ json }) {
  const data = JSON.parse(json);

  return (
    <nav className="NavBar">
      <ul>
        {data.nav.map((item, index) => (
          <li key={index}>
            <NavLink to={item.url}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;