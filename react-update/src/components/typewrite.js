import React, { useEffect, useRef } from 'react';

const TypeText = ({ text, className }) => {
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!hasAnimated.current) {
            animateText(text);
            hasAnimated.current = true;
        }
    }, [text]);

    return (
        <div className={`${className}`}>
            <span id="typed-text"></span>
        </div>
    );
};

const animateText = (text) => {
    let i = 0;
    const delta = 10;
    const textElement = document.getElementById("typed-text");
    const textLength = text.length;

   
    let typeWriter = () => {
        if (i < textLength) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, delta);
        }
    };
    typeWriter();
};

export default TypeText;