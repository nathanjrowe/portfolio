import React, { useEffect } from 'react';

var jsonObject = null;
const Game = (props) => {

    if([props.json]) {
        jsonObject = JSON.parse(props.json);
    }

    useEffect(() => {
        if (jsonObject) {
            draw();
            window.addEventListener('resize', () => {
                handleResize();
            });
        }
    }, [jsonObject]);

    return (
        <canvas id="game">

        </canvas>
    );
}

 function draw() {
    
    const canvas = document.getElementById('game');
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    //Draw the text
    drawText();

    // Add event listener for click
    canvas.addEventListener('click', (event) => {
        //Spawn a bullet at the mouse position
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = rect.bottom;
        new Bullet(x, y, 5);
    });
}

function handleResize() {
    const canvas = document.getElementById('game');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawText();
}

async function drawText() {
    
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    await document.fonts.load('600 8vw Cinzel');
    
    ctx.font = '600 8vw Cinzel';
    ctx.fillStyle = 'white';
    ctx.fillText(jsonObject.title, canvas.width / 2 - ctx.measureText(jsonObject.title).width / 2, canvas.height / 2);
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