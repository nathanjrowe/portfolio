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
                <Banner presets="center left-text-img">
                    <Frame frametype="bubble" presets="bubble" color="yellow">
                        <img src={json.about.image} />
                    </Frame>
                    <p>{json.about.description}</p>
                </Banner>
                <Banner presets="center left-text-img">
                    <Frame frametype="bubble" presets="bubble" color="yellow">
                        <img src={json.about.image} />
                    </Frame>
                    <p>{json.about.description}</p>
                </Banner>
                <Banner presets="center left-text-img">
                    <Frame frametype="bubble" presets="bubble" color="yellow">
                        <img src={json.about.image} />
                    </Frame>
                    <p>{json.about.description}</p>
                </Banner>
                <Banner presets="center left-text-img">
                    <Frame frametype="bubble" presets="bubble" color="yellow">
                        <img src={json.about.image} />
                    </Frame>
                    <p>{json.about.description}</p>
                </Banner>
            </section>
            
        </>
    );
}

export default Home;