// Enemies our player must avoid
var Enemy = function() {
    //Player moves up and down a row by changing 83y. Bugs are created so they lineup evenly with the player's potential positions.
    var randomSpeed = ( Math.random() * 150 ) + 100;
    var randomColumn = Math.floor( Math.random() * 500 );
    var randomRow = ( Math.floor( ( Math.random() * 3 ) ) * 83 ) + 43;  
    this.x = randomColumn;
    this.y = randomRow;
    this.randomSpeed = randomSpeed;
    
    this.sprite = 'images/enemy-bug.png';   
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += dt * this.randomSpeed;
    
    //if bug reaches the end of the canvas, have it loop back around.
    if(this.x >= 505) {
        this.x = -120;
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Adds a new bug to the game
Enemy.prototype.addBug = function() {
    var enemy = new Enemy();
    allEnemies.push(enemy);
};

Enemy.prototype.checkCollisions = function() {
    //if the bug hits a player, reset the player's position
    if(player.x - this.x <= 77 && player.x - this.x >= -74 && player.y === this.y) {
        player.startPosition();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.startPosition();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.startPosition = function() {
    this.x = 202;
    this.y = 375;
};

Player.prototype.update = function(dt) {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    //If player reaches the water, reset his position to start, and add a bug.
    if(this.y === -40) {
        this.startPosition();
        Enemy.prototype.addBug();
    }
};

Player.prototype.handleInput = function(input) {
    if (input === 'left' && this.x >= 101) {
        this.x -= 101;
    }
    if (input === 'right' && this.x < 404) {
        this.x += 101;
    }
    if (input === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (input === 'down' && this.y < 375) {
        this.y += 83;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});