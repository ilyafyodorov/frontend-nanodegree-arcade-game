// Render function shows objects (enemy or player) on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset function puts player into the initial position
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 390;
}

// Enemy bug object
var Enemy = function(x,y) {
    // The image for enemies
    this.sprite = 'images/enemy-bug.png';
    //Coordinates
    this.x = x;
    this.y = y;
    //movement speed (random)
    this.speed = Math.floor((Math.random() * 300) + 50);
};

// Update the enemy position
Enemy.prototype.update = function(dt) {
    //if the enemy leaves canvas, reset its position. Otherwise, update its coordinates.
    if(this.x <= 550){
        this.x += this.speed * dt;
    }else{
        //after bug leaves the screen, its speed is recomputed
        this.speed = Math.floor((Math.random() * 300) + 50);
        this.x = -2;
    }
    //If the player comes within 60px of an enemy, reset
    if(player.x >= this.x - 60 && player.x <= this.x + 60 && player.y >= this.y - 60 && player.y <= this.y + 60){
        this.reset();
    }
}

// Player object and initial x and y coordinates
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
};

//Update player position depending on key pressed
Player.prototype.update = function(){
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 100;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 100;
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 83;
    }else if (this.ctlKey === 'down' && this.y != 390){
        this.y = this.y + 83;
    }
    this.ctlKey = null;
    //If water is reached, show message and reset
    if(this.y < 25){
        alert('Success!');
        this.reset();
    }
}

//Input handler for player as requires by the game engine
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
}

// Instantiate all objects
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 145));
    allEnemies.push(new Enemy(-2,225));
}());

var player = new Player();

// this listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
