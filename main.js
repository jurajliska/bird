let player;
let walls;
let cursors;
let speed = 80;
let speedText;
let gameOver = false;
let gameOverText;

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.spritesheet("bird", "assets/bird.png", {frameWidth: 32, frameHeight: 24});
}

function create() {
    let bg = this.add.image(600, 300, "sky");
    bg.displayWidth = 1200;

    player = this.physics.add.sprite(300, 300, "bird").setScale(2);
    player.setCollideWorldBounds(true);
    player.setGravity(0, 300);

    this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird", {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });

    let graphics = this.make.graphics();
    graphics.fillStyle(0x009900, 1);
    graphics.fillRect(0, 0, 50, 320);
    graphics.generateTexture("wall", 50, 320);

    walls = this.physics.add.group();

    woll = walls.create(1200, 60, "wall");
    //woll.setVelocityX(-speed);
    woll = walls.create(1200, 540, "wall");
    //woll.setVelocityX(-speed);

    wallTimer = this.time.addEvent({delay: 3500, callback: makeWalls, callbackScope: this, loop: true});

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, walls, hitWall, null, this);

    speedText = this.add.text(8, 8, "Speed: " + speed, {fontSize: "16px", fill: "#000"});
    speedText.setDepth(1);
    gameOverText = this.add.text(500, 250, "Game over", {fontSize: "64px", fill: "#000"});
    gameOverText.setVisible(false);
    gameOverText.setDepth(1);
}

function update() {
    if (gameOver){
        player.anims.play("fly", false);
    } else
    player.anims.play("fly", true);
    
    if (cursors.space.isDown) {
        player.setVelocityY(-150);
        player.setAngle(-45);
        if (gameOver) {
            resetGame(this.physics);
        }
    } else {
        player.setAngle(0);
    }

    walls.getChildren().forEach(element => {
        element.setVelocityX(-speed);
        if (element.x < 0) {
            speed += 5;
            speedText.setText("Speed: " + speed);
            wallTimer.timeScale += 0.03;
            walls.remove(element, true);
        }
    });
}

function makeWalls() {
    let y = Phaser.Math.Between(-90, 90)
    woll = walls.create(1220, 60+y, "wall");
    //woll.setVelocityX(-speed);
    woll = walls.create(1220, 540+y, "wall");
    //woll.setVelocityX(-speed);
}

function hitWall() {
    gameOver = true;
    this.physics.pause();
    wallTimer.paused = true;
    gameOverText.setVisible(true);
}

function resetGame(physics) {
    walls.clear(true, true);
    physics.resume();
    wallTimer.paused = false;
    wallTimer.timeScale = 1;
    gameOverText.setVisible(false);
    player.setPosition(300, 300);
    player.setVelocityX(0);
    speed = 80;
    gameOver = false;
}

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let game = new Phaser.Game(config);