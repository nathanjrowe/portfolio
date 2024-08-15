import React from 'react';
import './styles/Card.css';
const Card = (props) => {
    let card;
    const imageCard = (
        <div className="ImageCard">
          {props.info.thumbnail ? (props.info.thumbnail.type === "video" ? <video><source src={props.info.thumbnail.url} type="video/mp4"/></video> : <img src={props.info.thumbnail.url} alt={props.info.thumbnail.alt} />) : null}
            <div className="front">
                <h2>{props.info.name}</h2>
                <p>{props.info.description}</p>
                {props.info.url ? <button onClick={() => window.open(props.info.url)}>Learn More</button> : null}
            </div>
        </div>
    );

    const textCard = (
        <div className="InfoCard">
            {Object.keys(props.info).map((key, index) => {
                return (
                <div key={index}>
                    <h3>{key}</h3>
                    <p>{props.info[key]}</p>
                </div>)
            })}
        </div>
    );

    card = props.info.thumbnail ? imageCard : textCard;

    return card;
}

export default Card;