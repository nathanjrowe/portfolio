import React, { forwardRef } from 'react';
import './styles/Banner.css';


const Banner = forwardRef((props, ref) => (
        //Presets: serperator, left-text-img, right-text-img, cover
        <section ref={ref} className={`Banner ${props.presets}`} style={{backgroundColor: props.color}}>
            {props.children}
        </section>
));

export default Banner;