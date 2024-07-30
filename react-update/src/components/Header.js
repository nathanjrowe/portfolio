import React from 'react';
import Game from './Game';

import './styles/Header.css';
const Header = ({ json }) => {
    return (
        <div className="Header">
            <Game json={json}/>
        </div>
    );
}

export default Header;