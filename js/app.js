var pauseGame = false;
var resetGame = false;
var countResetPlayer = 0;
var speedLevel = 150;
var message = "GAME OVER!";

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -500*Math.random();
    this.y = y;
    this.speed = (speedLevel*Math.random()) + 20;
    console.log(this.speed);
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
        this.speed = (speedLevel*Math.random()) + 20;
        while (this.speed > 200) {
            this.speed -= 100;
        }
        console.log(this.speed);
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
    this.level = 0;
};

Player.prototype.update = function() {
    upgradeLevel.call(this,this.score);
    if (IsPowerOf(countResetPlayer,3)) {
        heart.x = 315;
        heart.y = 268;
    }
    if (IsPowerOf(countResetPlayer,2) && countResetPlayer > 2) {
        diamondOne.x = 116;
        diamondOne.y = 92;
    }
    if (IsPowerOf(countResetPlayer,4) && countResetPlayer > 2) {
        diamondTwo.x = 217;
        diamondTwo.y = 175;
    }
    if (IsPowerOf(countResetPlayer,5) && countResetPlayer > 2) {
        diamondThree.x = 15;
        diamondThree.y = 258;
    }
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

var upgradeLevel = function(score) { 
    if (score >= 20000 && score < 40000) {
        this.level = 1;
        speedLevel += 10;
    } else if (score >= 40000 && score < 60000) {
        this.level = 2;
        speedLevel += 30;
    } else if (score >= 60000 && score < 80000) {
        this.level = 3;
        speedLevel += 30;
    } else if (score >= 80000) {
        this.lifes = 0;
        message = "   YOU WON!";
    }
}

Player.prototype.handleInput = function(keyCode) {
    doMovement.call(this, keyCode);
};

function IsPowerOf(x,y) {
    return (Math.log(x)/Math.log(y)) % 1 === 0;
}

function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}

Player.prototype.resetPlayer = function() {
    if (this.y === -32) {
        this.score += 500;
        this.x = 200;
        this.y = 383;
        countResetPlayer += 1;
    }
};

Player.prototype.collision = function() {
    this.lifes -= 1;
    this.x = 200;
    this.y = 383;
    countResetPlayer += 1;
};

var Diamond = function(image, x, y, points) {
    this.x = x;
    this.y = y;
    this.sprite = image;
    this.points = points;
};

Diamond.prototype.update = function() {
    if (this.x === (player.x + 17) && this.y === (player.y + 41)) {
        countResetPlayer += 1;
        this.x = -1000;
        this.y = -1000;
        player.score += this.points;
    }
};

Diamond.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function(image, x, y, lifes) {
    this.x = x;
    this.y = y;
    this.sprite = image;
    this.lifes = lifes;
};

Heart.prototype.update = function() {
    if (this.x === (player.x + 14) && this.y === (player.y + 51)) {
        this.x = -1000;
        this.y = -1000;
        countResetPlayer += 1;
        player.lifes += this.lifes;
    }
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
var diamondOne = new Diamond('images/gem-orange.png', -1000, -1000, 1000);
var diamondTwo = new Diamond('images/gem-green.png', -1000, -1000, 2500);
var diamondThree = new Diamond('images/gem-blue.png', -1000, -1000, 5000);
var allDiamonds = [diamondOne, diamondTwo, diamondThree];
var heart = new Heart('images/heart.png', -1000, -1000, 1);

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
