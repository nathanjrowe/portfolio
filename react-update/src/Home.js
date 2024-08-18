import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { useInView } from 'framer-motion';
import { animateInnerHTML, parseInnerHTML } from './components/scripts/typewrite';

/* Components */
import Banner from './components/Banner';
import Game from './components/Game';
import Frame from './components/Frame';
import Projects from './components/Projects';
import Toast from './components/Toast';
import Contact from './components/Contact';
import GoToTop from './components/GoToTop'



/*
* json: Nested object of json objects containing the data for the Home page
*/
const Home = ({ json }) => {
    // Refs needed to animate about section
    const hasAnimated = useRef(false); // Prevents duplicate animations
    const viewRef = useRef(false);
    const inView = useInView(viewRef, { once: true, amount: 0.6 });
    // State to hold the content of the toast
    const [toastContent, setToastContent] = useState(null);
    
    //On mount, determine if the about section should be animated
    useEffect(() => {
        // Media query to determine if the screen is mobile
        var x = window.matchMedia("(max-width: 799px)");
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

    // Function to insert toast elements into the DOM at runtime
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
            <Projects json={json.projects}/>
            {toastContent && (
                <Portal node={document.querySelector('.contact-toast')}>
                    <Toast text={toastContent} component={<Contact />} />
                </Portal>
            )}
            <GoToTop />
        </>
    );
}

export default Home;