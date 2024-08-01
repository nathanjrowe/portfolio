import React from 'react';
import Banner from './Banner';
import Game from './Game';
import Frame from './Frame';
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
                            <Banner key={index} presets="center left-text-img">
                                <Frame frametype="bubble" presets="bubble" color="yellow">
                                    <img src={item.image} />
                                </Frame>
                                <p>{item.description}</p>
                            </Banner>
                        );
                    })
                }
            </section>
            
        </>
    );
}

export default Home;