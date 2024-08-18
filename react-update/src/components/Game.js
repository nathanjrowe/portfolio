import React, { useEffect } from 'react';

var jsonObject = null;
let ship;

const Game = (props) => {
    if([props.json]) {
        jsonObject = JSON.parse(props.json);
    }
    //Redraw the canvas when the window is resized
    useEffect(() => {
        if (jsonObject) {
            draw();
            window.addEventListener('resize', handleResize);
        }
        //Remove event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //Initialize the game
    useEffect(() => {
        const canvas = document.getElementById('game');
        addEventListeners();
        //Remove event listeners and clear the canvas when the component is unmounted
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
    
    const canvas = document.getElementById('game');
    //Set the canvas height to 15vh on small screens
    const x = window.matchMedia('(max-width: 768px)');
    canvas.style.height = x.matches ? "15vh" : "500px";
    //Set the canvas size to the size of the parent element
    canvas.style.width = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    canvas.style.backgroundColor = "#291511";
    

    //Draw the text
    drawText();
    //Initialize ship on canvas
    if (!ship) {
        ship = new Ship(canvas.width / 2, canvas.height - 20);
        ship.start();
    } 
}





/*
*----------------------------------------------------
*
*               GAME OBJECTS
*
*----------------------------------------------------
*/

//Draws the text on the canvas
async function drawText() {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Avoids text overlapping
    //Load the font
    await document.fonts.load('600 8vw Cinzel');
    ctx.font = '600 8vw Cinzel';
    ctx.fillStyle = 'white';
    //Render the text
    ctx.fillText(jsonObject.title, canvas.width / 2 - ctx.measureText(jsonObject.title).width / 2, canvas.height / 2);
}

/**
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} speed
 * 
 */
function Bullet(x, y, speed) {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.collided = false;
    this.speed = speed;

    //Method to draw the bullet on the canvas
    this.draw = () => {
        //Stores the last position of the bullet
        const ls = {
            x: this.x,
            y: this.y
        };
        ctx.clearRect(ls.x - 2, ls.y - 1, 4, 15); //Clear the last position of the bullet
        this.y -= this.speed; //Move the bullet up
        //Render the bullet at the new position
        ctx.beginPath();
        ctx.strokeStyle = '#D0B8A8';
        ctx.lineWidth = 3;
        ctx.moveTo(ls.x, ls.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();

    };

    //Method to check if the bullet is collinding with text on the canvas
    this.checkCollision = () => {
        let hit = false;
        let imgData = ctx.getImageData(this.x - 2, this.y - 2, 4, 4).data; //Get the canvas state surrounding the bullet
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
        //Set the collided property to true if the bullet has collided
        if(!this.collided) {
            this.collided = hit;
        }
        return hit;
    };
    //Method to update the bullet position
    this.update = () => {
        this.checkCollision();
        if (this.collided) {
            //Clear the bullet and surroundings from the canvas
            ctx.clearRect(this.x - 5, this.y - 2, 10, 15);
        } else {
            this.draw();
        }
    };

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
}

/**
 * 
 * @param {int} x
 * @param {int} y
 */
class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 20;
        this.speed = 2;
        this.animations = [];
        //Boolean to pause the ship
        this.isPaused = false;
        //Ship sprite
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

/*
*----------------------------------------------------
*
*               EVENT HANDLERS
*
*----------------------------------------------------
*/
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

const handleResize = () => {
    const canvas = document.getElementById('game');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawText();
}

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

