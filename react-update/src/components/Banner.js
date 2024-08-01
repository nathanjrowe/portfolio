import React from 'react';
import './styles/Banner.css';


const Banner = ({color = 'transparent', children, presets}) => {
    return (
        <section className={`Banner ${presets}`} style={{backgroundColor: color}}>
            {children}
        </section>
    );
}

export default Banner;