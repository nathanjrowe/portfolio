import React, { useEffect } from 'react';
import { autoPlay } from './scripts/autoplay';
import './styles/Card.css';

const Card = ({info = '', children}) => {
    let card;

    //Add event listener to autoplay videos card mounts to DOM
    useEffect(() => {
        const videos = document.querySelectorAll('.card-video');
        if(videos) {
            autoPlay(videos, '.ImageCard');
        }
    }, []);

    //Determine if the card should be an image card or text card
    /*Takes info prop as an object with the following properties:
    name: string
    description: string
    thumbnail: object
        type: string
        url: string
        alt: string
    url: string
    */
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
            {info ? Object.keys(info).map((key, index) => { /* If info prop is passed, display key value pairs*/
                return (
                <div key={index}>
                    <h3>{key}</h3>
                    <p>{info[key]}</p>
                </div>)
            }): children /* If no info prop is passed, display children */}
        </div>
    );

    card = info ? (info.thumbnail ? imageCard : textCard) : textCard;

    return card;
}


export default Card;