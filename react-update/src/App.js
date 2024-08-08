import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Home from './components/Home';

const jsonPath = '/data/';
const headerPath = jsonPath + 'header.json';
const projectsPath = jsonPath + 'projects.json';
const aboutPath = jsonPath + 'about.json';

function App() {
  const [headerData, setHeaderData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [aboutData, setAboutData] = useState(null);


  useEffect(() => {
    fetch(projectsPath)
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error('Error fetching projects data:', error));

      fetch(headerPath)
      .then(response => response.json())
      .then(data => setHeaderData(JSON.stringify(data)))
      .catch(error => console.error('Error fetching header data:', error));

      fetch(aboutPath)
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error('Error fetching about data:', error));
  }, []);
  const homeObject = {
    header: headerData, 
    about: aboutData,
    projects: projectsData
  };

  return (
    <Router>
      <div className="App">
        <img id="logo" src="./logo.svg" alt="logo" />
        {headerData && <NavBar json={headerData} />}
        <Routes>
          <Route exact path="/" element={headerData && aboutData && <Home json={homeObject} />} />
          <Route exact path="/projects" element={projectsData && <Projects json={projectsData} />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;