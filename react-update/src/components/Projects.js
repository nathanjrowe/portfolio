import React from 'react';
import Card from './Card';
import './styles/Project.css';

const Projects = ({ json }) => {
    //Print each project in the json file
    return (
        <div className="Projects">
            {json.projects.map((project, index) => <Card key={index} info={project} />)}
        </div>
    );
}

export default Projects;
