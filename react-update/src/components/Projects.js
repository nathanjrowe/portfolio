import React from 'react';
import Card from './Card';
import './styles/Project.css';

const Projects = ({ json }) => {
    //Print each project in the json file
    return (
        <div className="Projects">
            <div className="inner">
                {json.projects.map((project, index) => <Card className="item" key={index} info={project} />)}
            </div>
        </div>
    );
}

export default Projects;
