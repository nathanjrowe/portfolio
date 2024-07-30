import React, { useEffect } from 'react';
import './styles/Game.css';



let text = "";
const Game = (props) => {
    useEffect(() => {
        if (props.json) {
            draw(props.json);
        }
    }, [props.json]);

    return (
        <canvas id="game">

        </canvas>
    );
}

 function draw(json) {
    const jsonObject = JSON.parse(json);
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.font = '600 6rem Playfair Display';
    //Uppercase the title
    jsonObject.title = jsonObject.title.toUpperCase();
    ctx.fillStyle = 'white';
    ctx.fillText(jsonObject.title, canvas.width / 2 - ctx.measureText(jsonObject.title).width / 2, canvas.height / 2);

    // Add event listener for click
    canvas.addEventListener('click', (event) => {
        //Spawn a bullet at the mouse position
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = rect.bottom;
        new Bullet(x, y, 5);
    });
}

function Bullet(x, y, speed) {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.speed = speed;

    //Start the update loop
    let nIntervalId = setInterval(() => {
        this.update();
    }, 1000 / 60);

    this.draw = () => {
        const ls = {
            x: this.x,
            y: this.y
        };
        ctx.clearRect(ls.x - 2, ls.y - 1, 4, 15);
        this.y -= this.speed;
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.moveTo(ls.x, ls.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();

    };

    this.checkCollision = () => {
        let hit = false;
        let imgData = ctx.getImageData(this.x - 2, this.y - 2, 4, 4).data;
        //Check if the bullet is out of bounds
        if (this.y < 0) {
            hit = true;
        }
        //Check if the bullet is collinding with text on the canvas
        for (let i = 0; i < imgData.length; i += 4) {
            if (imgData[i] === 255 && imgData[i + 1] === 255 && imgData[i + 2] === 255 && imgData[i + 3] === 255) {
                hit = true;
                break;
            }
        }

        return hit;
    };

    this.update = () => {
        
        if (this.checkCollision()) {
            clearInterval(nIntervalId);
            nIntervalId = null;
            ctx.clearRect(this.x - 5, this.y - 2, 10, 15);
            ctx.save();
        } else {
            this.draw();
        }
    };
}
export default Game;