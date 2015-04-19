// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=0;
    this.y=y* 83;
    this.gridx=0;
    this.gridy=y;
    this.v=y%2+1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}
Enemy.prototype.isCollision=function(x,y){

    if(this.gridx==x&&this.gridy==y){

        return true;
    }

    else return false;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x=(this.x<505)?this.x+(dt)*101*this.v:0;
    this.gridx=Math.floor(this.x/101);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.x=0;
    this.y=0;
    this.gridx=2;
    this.gridy=5;

    this.sprite = 'images/char-boy.png';
}


player.prototype.update = function(dt) {
    this.x=(this.gridx)*101;
    this.y=(this.gridy)*83;
}


player.prototype.handleInput = function(dir) {
    switch(dir){
        case 'left':this.gridx=(this.gridx-1+5)%5; break;
        case 'right':this.gridx=(this.gridx+1+5)%5; break;
        case 'up':this.gridy=(this.gridy-1+6)%6; break;
        case 'down':this.gridy=(this.gridy+1+6)%6; break;
    }

}
player.prototype.reset=function(){
    this.gridx=2;
    this.gridy=5;
}
var allEnemies=[new Enemy(1),new Enemy(2),new Enemy(3),new Enemy(4)]
// Draw the enemy on the screen, required method for game
player.prototype.render = function() {
    var isOccupied=false;
    var gridx=this.gridx;
    var gridy=this.gridy;
    allEnemies.forEach(function(enemy) {
        isOccupied=isOccupied||enemy.isCollision(gridx,gridy);
    });
    if(isOccupied||this.gridy==0)
        this.reset();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player=new player();


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
