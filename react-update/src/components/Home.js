import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { useInView } from 'framer-motion';
import Banner from './Banner';
import Game from './Game';
import Frame from './Frame';
import Projects from './Projects';
import { animateText } from './scripts/typewrite';
import Toast from './Toast';
import Contact from './Contact';

const Home = ({ json }) => {
    const hasAnimated = useRef(false);
    const viewRef = useRef(false);
    const inView = useInView(viewRef, { once: true, amount: 0.8 });
    const [toastContent, setToastContent] = useState(null);
    
    useEffect(() => {
        
        json.about.sections.forEach((item, index) => {
            if (!hasAnimated.current) {
                if(inView) {
                    animateText(`about-text-${index}`, item.description).then(() => { handleToast(); });
                    hasAnimated.current = true;
                }
            }
        });

        
    }, [json, inView]);

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
                                <span ref={viewRef} className="desc" id={`about-text-${index}`}></span>
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