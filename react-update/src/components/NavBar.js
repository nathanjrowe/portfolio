import React from 'react';

const NavBar = (json) => {
    const obj = JSON.parse(json);
    return (
        <nav>
            <h1>{obj.title}</h1>
            <ul>
                {obj.nav.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </nav>
    );
}

export default NavBar;