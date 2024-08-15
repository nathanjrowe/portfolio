import React, { forwardRef } from 'react';
import './styles/Banner.css';


const Banner = forwardRef((props, ref) => (
        <section ref={ref} className={`Banner ${props.presets}`} style={{backgroundColor: props.color}}>
            {props.children}
        </section>
));

export default Banner;