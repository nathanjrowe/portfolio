import React, { useEffect } from 'react';
import './styles/Card.css';
import { autoPlay } from './scripts/autoplay';

const Card = ({info = '', children}) => {
    let card;

    useEffect(() => {
        const videos = document.querySelectorAll('.card-video');
        if(videos) {
            autoPlay(videos, '.ImageCard');
        }
    }, []);


    const imageCard = (
        <div className="ImageCard">
          {info.thumbnail ? (info.thumbnail.type === "video" ? <video muted loop className="card-video"><source src={info.thumbnail.url} type="video/mp4"/></video> : <img src={info.thumbnail.url} alt={info.thumbnail.alt} />) : null}
            <div className="front">
                <h2>{info.name}</h2>
                <p>{info.description}</p>
                {info.url ? <button onClick={() => window.open(info.url)}>Learn More</button> : null}
            </div>
        </div>
    );

    const textCard = (
        <div className="InfoCard">
            
            {info ? Object.keys(info).map((key, index) => {
                return (
                <div key={index}>
                    <h3>{key}</h3>
                    <p>{info[key]}</p>
                </div>)
            }): children}
        </div>
    );

    card = info ? (info.thumbnail ? imageCard : textCard) : textCard;

    return card;
}


export default Card;