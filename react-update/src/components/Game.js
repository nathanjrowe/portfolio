import React, { useEffect, useState } from 'react';

var jsonObject = null;
let ship;

const Game = (props) => {

    if([props.json]) {
        jsonObject = JSON.parse(props.json);
    }
    useEffect(() => {
        if (jsonObject) {
            draw();
            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [jsonObject]);

    useEffect(() => {
        const canvas = document.getElementById('game');
        addEventListeners();

        return () => {
            if(!document.getElementById('game')) {
                removeEventListeners(canvas);
                ship.end();
                ship = null;
            }
        }
    }, []);

    return (
        <canvas id="game"></canvas>
    );
}

 function draw() {
    var x = window.matchMedia('(max-width: 850px)');

    const canvas = document.getElementById('game');
    canvas.style.width = "100%";
    canvas.style.height = x.matches ? "15vh" : "500px";
    canvas.style.backgroundColor = "#291511";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    //Draw the text
    drawText();
    //Initialize ship on canvas
   
    if (!ship) {
        ship = new Ship(canvas.width / 2, canvas.height - 20);
        ship.start();
    } 
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
    this.collided = false;
    this.speed = speed;

    //Start the update loop
    const gameLoop = () => {
        if (!canvas) {
            return;
        }
        this.update();
        if(!this.collided) {
            requestAnimationFrame(gameLoop);
        }
    };
    requestAnimationFrame(gameLoop);
    this.draw = () => {
        const ls = {
            x: this.x,
            y: this.y
        };
        ctx.clearRect(ls.x - 2, ls.y - 1, 4, 15);
        this.y -= this.speed;
        ctx.beginPath();
        ctx.strokeStyle = '#D0B8A8';
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
        if(!this.collided) {
            this.collided = hit;
        }
        return hit;
    };

    this.update = () => {
        this.checkCollision();
        if (this.collided) {
            ctx.clearRect(this.x - 5, this.y - 2, 10, 15);
        } else {
            this.draw();
        }
    };
}

class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 20;
        this.speed = 2;
        this.animations = [];
        this.isPaused = false;
        this.img = new Image();
        this.img.src = "./ship.png";
        this.canvas = document.getElementById('game');
    }

    move() {
        this.x += this.speed;
        if (this.x > this.canvas.width || this.x < 0) {
            this.speed = -this.speed; // Reverse direction when hitting canvas edges
        }
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, this.y, this.canvas.width, this.height);
        ctx.drawImage(this.img, this.x, this.y);
    }

    fire() {
        new Bullet(this.x + this.width / 2, this.y, 5);
    }

    gameLoop () {
        if (this.isPaused) {
            return;
        }
        this.move();
        this.draw(this.canvas);
        requestAnimationFrame(() => this.gameLoop());
            
    }

    start() {
        requestAnimationFrame(() => this.gameLoop());

        this.animations.push(setInterval(() => {
            if(!this.isPaused) {
                this.fire();
            }
        }, 2000));
    }

    end() {
        this.animations.forEach(clearInterval);
        this.animations = [];
    }
}

const handleCanvasClick = (event) => {
    new Bullet(ship.x, ship.y, 5);
};

const handleCanvasMouseOver = (event) => {
    const canvas = document.getElementById('game');
    const rect = canvas.getBoundingClientRect();
    ship.isPaused = true;
    ship.x = event.clientX - rect.left;
    ship.draw();
};

const handleCanvasMouseLeave = () => {
    ship.isPaused = false;
    requestAnimationFrame(() => ship.gameLoop());
};

const handleWindowBlur = () => {
    ship.isPaused = true;
};

const handleVisibilityChange = () => {
    if(document.visibilityState === "hidden") {
        ship.isPaused = true;
    }
}

const handleWindowFocus = () => {
    ship.isPaused = false;
    requestAnimationFrame(() => ship.gameLoop());
};

const addEventListeners = () => {
        const canvas = document.getElementById('game');
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('mousemove', handleCanvasMouseOver);
        canvas.addEventListener('mouseleave', handleCanvasMouseLeave);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);
}

const removeEventListeners = (canvas) => {
        canvas.removeEventListener('click', handleCanvasClick);
        canvas.removeEventListener('mousemove', handleCanvasMouseOver);
        canvas.removeEventListener('mouseleave', handleCanvasMouseLeave);
        window.removeEventListener('blur', handleWindowBlur);
        window.removeEventListener('focus', handleWindowFocus);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
}
export default Game;

