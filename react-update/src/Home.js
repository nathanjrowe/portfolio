import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { useInView, motion } from 'framer-motion';
import Banner from './components/Banner';
import Game from './components/Game';
import Frame from './components/Frame';
import Projects from './components/Projects';
import { animateInnerHTML, parseInnerHTML } from './components/scripts/typewrite';
import Toast from './components/Toast';
import Contact from './components/Contact';

const Home = ({ json }) => {
    const hasAnimated = useRef(false);
    const viewRef = useRef(false);
    const inView = useInView(viewRef, { once: true, amount: 0.8 });

    const [toastContent, setToastContent] = useState(null);
    var x = window.matchMedia("(max-width: 850px)");
    
    useEffect(() => {
        
        json.about.sections.forEach((item, index) => {
            if(!x.matches) {
                if (!hasAnimated.current) {
                    if(inView) {
                        animateInnerHTML(`about-text-${index}`, item.description).then(() => { handleToast(); });
                        hasAnimated.current = true;
                    }
                }      
            } else {
                if (!hasAnimated.current) {
                    parseInnerHTML(`about-text-${index}`, item.description).then(() => { handleToast(); });
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
            <Banner  presets="seperator">
                <motion.h2 
                    initial={{ textShadow: "8px 8px 5px rgba(0, 0, 0, 1), 0vw 0px 0px rgba(153, 77, 28, 0.5), 0vw 0px 0px rgba(228, 143, 69, 0.5)"}}
                    whileInView={{ textShadow: "8px 8px 5px rgba(0, 0, 0, 1), -15vw 0px 0px  rgba(153, 77, 28, 0.8), 15vw 0px 0px rgba(228, 143, 69, 0.8)"}}
                    transition={{ duration: 1 }}
                >
                    Projects
                </motion.h2>
            </Banner>
            <Projects json={json.projects}/>
            {toastContent && (
                <Portal node={document.querySelector('.contact-toast')}>
                    <Toast text={toastContent} component={<Contact />} />
                </Portal>
            )}
        </>
    );
}

export default Home;