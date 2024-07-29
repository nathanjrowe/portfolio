import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import { drawText } from './components/Game';
import './App.css';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Header from './components/Header';

const jsonPath = '/data/';
const headerPath = jsonPath + 'header.json';
const projectsPath = jsonPath + 'projects.json';

function App() {
  const [headerData, setHeaderData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    fetch(headerPath)
      .then(response => response.json())
      .then(data => setHeaderData(JSON.stringify(data)))
      .catch(error => console.error('Error fetching header data:', error));
  }, []);
  useEffect(() => {
    fetch(projectsPath)
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error('Error fetching projects data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        {headerData && <NavBar json={headerData} />}
        <Routes>
          <Route exact path="/" element={headerData && <Header json={headerData}/>} />
          <Route exact path="/projects" element={projectsData && <Projects json={projectsData}/>} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;