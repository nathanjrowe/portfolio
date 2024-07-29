import React from 'react';
import Game from './Game';

import './styles/Header.css';
const Header = (props) => {
    return (
        <div className="Header">
            <Game title={props.json.title}/>
        </div>
    );
}

export default Header;