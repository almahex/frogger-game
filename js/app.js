var pauseGame = false;
var resetGame = false;

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -500*Math.random();
    this.y = y;
    this.speed = (300*Math.random()) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x < (player.x + 2) && this.x > (player.x - 50) && this.y === (player.y + 9)) {
        player.collision();
    } else if (this.x >= 505) {
        this.x = -500*Math.random();
        this.speed = (300*Math.random()) + 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(image, x, y) {
    this.sprite = image;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lifes = 3;
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.resetPlayer();
};

var doMovement = function(keyCode) { 
    switch (keyCode) {
        case 'up':
            if (this.y < 51) {
                break;
            } else {
                this.y -= 83;
                break;
            }
        case 'down':
            if (this.y > 300) {
                break;
            } else {
                this.y += 83;
                break;
            }
        case 'right':
            if (this.x > 301) {
                break;
            } else {
                this.x += 101;
                break;
            }
        case 'left':
            if (this.x < 99) {
                break;
            } else {
                this.x -= 101;
                break;
            }
    }
}

Player.prototype.handleInput = function(keyCode) {
    doMovement.call(this, keyCode);
};

Player.prototype.resetPlayer = function() {
    if (this.y === -32) {
        this.score += 500;
        this.x = 200;
        this.y = 383;
    }
};

Player.prototype.collision = function() {
    this.lifes -= 1;
    this.x = 200;
    this.y = 383;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player('images/char-boy.png', 200, 383);
var enemyOne = new Enemy(60);
var enemyTwo = new Enemy(143);
var enemyThree = new Enemy(226);
var enemyFour = new Enemy(60);
var enemyFive = new Enemy(143);
var enemySix = new Enemy(226);
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix];

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

document.addEventListener('keypress', function(e) {
    switch (e.key) {
        case " ":
            if (pauseGame === false) {
                pauseGame = true;
            } else {
                pauseGame = false;
            }
          break;
        case "Enter":
            resetGame = true;
            break;
        default:
          return;
    }

});
