import React from 'react';
import Banner from './Banner';
import Game from './Game';
import Frame from './Frame';
import Projects from './Projects';
import TypeText from './typewrite';
const Home = ({ json }) => {
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
                                <Frame className="image" frametype="bubble" presets="bubble" color="yellow" img={item.image} />
                                <TypeText className="desc" text={item.description} />
                            </Banner>
                        );
                    })
                }
            </section>
            <Banner presets="seperator">
                <h2>Projects</h2>
            </Banner>
            <Projects json={json.projects} />
            
        </>
    );
}

export default Home;