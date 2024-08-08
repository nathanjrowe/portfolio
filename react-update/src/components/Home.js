import React, { useEffect, useRef, useState } from 'react';
import  { createRoot } from 'react-dom/client';
import { Portal } from 'react-portal';
import Banner from './Banner';
import Game from './Game';
import Frame from './Frame';
import Projects from './Projects';
import { animateText } from './typewrite';
import Toast from './Toast';
import Contact from './Contact';

const Home = ({ json }) => {
    const hasAnimated = useRef(false);
    const [toastContent, setToastContent] = useState(null);
    
    useEffect(() => {
        
        json.about.sections.forEach((item, index) => {
            if (!hasAnimated.current) {
                animateText(`about-text-${index}`, item.description).then(() => {
                    handleToast();
                });
                hasAnimated.current = true;
            }
        });

        
    }, [json]);

    const handleToast = () => {
        document.querySelectorAll('.contact-toast').forEach(toast => {
            setToastContent(toast.innerHTML);
            toast.innerHTML = '';
        });
    };
    return (
        <>
            <Banner color="black" presets="center pop"> 
                <Game json={json.header} />
            </Banner>
            <section id="about">

                {json.about &&
                    json.about.sections.map((item, index) => {
                        return (
                            <Banner key={index} presets="center cover">
                                <Frame className="image" frametype="comic" presets="comic" color="yellow" img={item.image} />
                                <span className="desc" id={`about-text-${index}`}></span>
                            </Banner>
                        );
                    })
                }
            </section>
            <Banner presets="seperator">
                <h2>Projects</h2>
            </Banner>
            <Projects json={json.projects} />
            {toastContent && (
                <Portal node={document.querySelector('.contact-toast')}>
                    <Toast text={toastContent} component={<Contact />} />
                </Portal>
            )}
        </>
    );
}

export default Home;