import React from 'react';
import Card from './Card';
import Banner from './Banner';
import { motion } from "framer-motion";
import './styles/Project.css';

const Projects = ({ json }) => {
    //Print each project in the json file
    return (
        <div className="Projects">
            <Banner presets="seperator">
                <motion.h2
                    initial={{ textShadow: "8px 8px 5px rgba(0, 0, 0, 1), 0vw 0px 0px rgba(153, 77, 28, 0.5), 0vw 0px 0px rgba(228, 143, 69, 0.5)"}}
                    whileInView={{ textShadow: "8px 8px 5px rgba(0, 0, 0, 1), -15vw 0px 0px  rgba(153, 77, 28, 0.8), 15vw 0px 0px rgba(228, 143, 69, 0.8)"}}
                    transition={{ duration: 1 }}
                >
                    Projects
                </motion.h2>
            </Banner>
            <div className="center-items" id="git-card">
                <Card>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3>Find more on GitHub</h3>
                        <button onClick={() => window.open("https://github.com/nathanjrowe")}><img src="https://myportfoliobucketnater.s3.us-east-2.amazonaws.com/images/github.svg" alt="GitHub" style={{width: '2.4em'}}/></button>
                        
                    </div>
                </Card>
            </div>
            <div className="inner">
                {json.projects.map((project, index) => <Card className="item" key={index} info={project} />)}
            </div>
        </div>
    );
}

export default Projects;
