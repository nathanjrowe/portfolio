import React from "react";
import Card from "./components/Card";
import Timeline from "./components/Timeline";
import Banner from "./components/Banner";
import StickyButton from "./components/StickyButton";
import { motion } from "framer-motion";

const Resume = ({ json }) => {


    return (
        <div className="resume center-items">
            <StickyButton className="link-button" href="/data/rowe_n_resume.pdf" download="rowe_nathan_resume.pdf" target="_blank">Download Resume as PDF</StickyButton>
            {json &&
                Object.keys(json).map(key => (
                    <section id={key} key={key} style={{ width: "100%"}}>
                        <Banner  presets="seperator">
                            <motion.h2
                                initial={{ textShadow: "8px 8px 5px rgba(0, 0, 0, 1), 0vw 0px 0px rgba(153, 77, 28, 0.5), 0vw 0px 0px rgba(228, 143, 69, 0.5)"}}
                                whileInView={{ textShadow: "8px 8px 5px rgba(0, 0, 0, 1), -15vw 0px 0px  rgba(153, 77, 28, 0.8), 15vw 0px 0px rgba(228, 143, 69, 0.8)"}}
                                transition={{ duration: 1 }}
                            >
                                {key}
                            </motion.h2>
                        </Banner>
                        
                        <Timeline>
                            {json[key].map((item, index) => (
                                <Card key={index} info={item} />
                            ))}
                        </Timeline>
                    </section>
                ))}
        </div>
    );
};

export default Resume;