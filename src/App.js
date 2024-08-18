import React, { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import { motion } from "framer-motion";
import './App.css';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Home from './Home';
import Resume from './Resume';
import Footer from './components/Footer';

const jsonPath = process.env.PUBLIC_URL + '/data/';
const headerPath = jsonPath + 'header.json';
const projectsPath = jsonPath + 'projects.json';
const aboutPath = jsonPath + 'about.json';
const resumePath = jsonPath + 'resume.json';

function App() {

  /*
   * States to hold the JSON data for the header, projects, about, and resume sections
  */
  const [headerData, setHeaderData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    fetch(projectsPath)
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error(`Error fetching projects data: ${error}, ${projectsPath}`));

      fetch(headerPath)
      .then(response => response.json())
      .then(data => setHeaderData(JSON.stringify(data)))
      .catch(error => console.error('Error fetching header data:', error));

      fetch(aboutPath)
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error('Error fetching about data:', error));

      fetch(resumePath)
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error fetching about data:', error));
  }, []);

  // Framer Motion Variants for the loading animation
  const variants = {
    load: {
      y: 0, 
      scale: 1,
      transition: {duration: 2, delay: 3}
    },
    rotate: {
      rotate: "360deg",
      transition: {duration: 5}
    }
  }


  //Object to send to Home component
  const homeObject = {
    header: headerData, 
    about: aboutData,
    projects: projectsData
  };

  return (
      <div className="App" >
        <motion.div id="cover"
          initial={{
            backgroundColor: "rgba(248, 237, 227, 1)",
          }}
          animate={{
            backgroundColor: "rgba(248, 237, 227, 0)",
          }}
          transition={{
            duration: 2,
            delay: 3
          }}
          onAnimationComplete={() => document.getElementById("cover").style.height = "0"}
          style={{
            position: "fixed",
            width: "100%",
            zIndex: "12",
            height: window.innerHeight,
          }}
        ></motion.div>
        <motion.div id="logo">
          <motion.img  src="./initial.svg" alt="logo"
            variants={variants}
            initial={{y: window.innerHeight / 2, scale: 3}}
            animate="load"
          />
          <motion.img  className="background" src="./circle.svg" alt="logo"
            variants={variants}
            initial={{y: window.innerHeight / 2, scale: 3}}
            animate={["rotate", "load"]}
          />
        </motion.div>
        {headerData && <NavBar json={headerData}/>}
        <Routes>
          <Route exact path="/" element={headerData && aboutData && projectsData && <Home json={homeObject} />} />
          <Route path="/projects" element={projectsData && <Projects json={projectsData} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={ resumeData && <Resume json={resumeData}/>} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;