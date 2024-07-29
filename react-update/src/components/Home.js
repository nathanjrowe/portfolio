import React from 'react';
import Header from './Header';

const Home = ({ json }) => {
    return (
        <div>
            <Header json={json.header} />
        </div>
    );
}