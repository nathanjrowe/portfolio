import React, { Children, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./styles/Timeline.css";

const Timeline = ({ children }) => {

    const ref = useRef(null);
    const timelineRef = useRef(null);
    const [ballY, setBallY] = useState(0);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = refs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setBallY(entry.target.offsetTop);
                        }
                    }
                });
            },
            { threshold: 0.9 }
        );

        refs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            refs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

   

    return (
        <div className="Timeline" ref={timelineRef}>


<motion.svg
   width="10.089462mm"
   height="10.089462mm"
   viewBox={`0 0 10.089462 10.089462`}
   className="bullet-small"
   animate={{ y: ballY }}
   transition={{ duration: 0.5 }}
>
    <defs>
        <linearGradient id="Gradient1">
            <stop offset="0%" stop-color="rgb(245, 204, 160)" stop-opacity="1"/>
            <stop offset="25%" stop-color="rgb(228, 143, 69)" stop-opacity="1"/>
            <stop offset="75%" stop-color="rgb(153, 77, 28)" stop-opacity="1"/>
            <stop offset="100%" stop-color="rgb(107, 36, 12)" stop-opacity="1"/>
        </linearGradient>
    </defs>
    <motion.circle
       transform="translate(-73.504272,-76.653651)"
    style={{ fill: 'url(#Gradient1)' }}
       id="path1"
       cx="80.369003"
       cy="79.638382"
       r="3.0447311"
       className="indicator" />
</motion.svg>
        <ul ref={ref}>
            {Children.map(children, (child, index) => (
                <li key={index} ref={(el) => (refs.current[index] = el)}>
                    <svg className="bullet-hollow">
                        <defs>
                            <linearGradient id="Gradient1">
                                <stop offset="0%" stop-color="rgb(245, 204, 160)" stop-opacity="1"/>
                                <stop offset="25%" stop-color="rgb(228, 143, 69)" stop-opacity="1"/>
                                <stop offset="75%" stop-color="rgb(153, 77, 28)" stop-opacity="1"/>
                                <stop offset="100%" stop-color="rgb(107, 36, 12)" stop-opacity="1"/>
                            </linearGradient>
                        </defs>
                        <circle cx="14" cy="14" r="11"  fill="#F8EDE3" stroke="url(#Gradient1)" strokeWidth="4"></circle>
                    </svg>
                    {child}
                </li>
            ))}
        </ul>
        </div>
    );
};

export default Timeline;