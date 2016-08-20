//constants - tile sizes
var TILE_WIDTH = 101,
      TILE_HEIGHT = 83;

//Class for all Characters    
function Character() {}
//Function and properties shared by all instances of Characters
Character.prototype.init=function(x,y,sprite){
    // The image for enemies
    this.sprite = sprite;
    //Coordinates
    this.x = x;
    this.y = y;
};
// Render function shows objects (enemy or player) on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Reset function puts player into the initial position
Character.prototype.reset = function() {
    player.x = 200;
    player.y = 390;
};

// Enemy bug object
function Enemy (x,y,sprite) {
    this.init(x,y,sprite);
    //movement speed (random)
    this.speed = Math.floor((Math.random() * 300) + 50);
}
Enemy.prototype=new Character();
// Update the enemy position functon
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
};

// Player object
function Player (x,y,sprite) {
    this.init(x,y,sprite);
}
Player.prototype=new Character();

//Update player position depending on key pressed
Player.prototype.update = function(){
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - TILE_WIDTH;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + TILE_WIDTH;
    }else if(this.ctlKey === 'up'){
        this.y = this.y - TILE_HEIGHT;
    }else if (this.ctlKey === 'down' && this.y != 390){
        this.y = this.y + TILE_HEIGHT;
    }
    this.ctlKey = null;
    //If water is reached, show message and reset
    if(this.y < 25){
        alert('Success!');
        this.reset();
    }
};

//Input handler for player as requires by the game engine
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

// Create all objects
// Player instance
var player = new Player(200,390,'images/char-boy.png');

// Instantiate all objects
var allEnemies = [];
allEnemies.push(new Enemy(-2, 60, 'images/enemy-bug.png'));
allEnemies.push(new Enemy(-2, 145, 'images/enemy-bug.png'));
allEnemies.push(new Enemy(-2,225, 'images/enemy-bug.png'));

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