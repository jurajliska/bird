let player;
let walls;
let cursors;

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.spritesheet("bird", "assets/bird.png", {frameWidth: 32, frameHeight: 24});
}

function create() {
    let bg = this.add.image(600, 300, "sky");
    bg.displayWidth = 1200;

    player = this.physics.add.sprite(300, 400, "bird").setScale(2);
    player.setCollideWorldBounds(true);
    player.setGravity(0, 200);

    this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird", {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    let graphics = this.make.graphics();
    //graphics.lineStyle(5, 0xff00ff, 1.0);
    graphics.fillStyle(0x00aa00, 1);
    graphics.fillRect(0, 0, 50, 300);
    graphics.generateTexture("wall", 50, 300);

    walls = this.physics.add.group();
    woll = walls.create(800, 0, "wall");
    //woll.setCollideWorldBounds(true);
    woll.setVelocityX(-50);

    woll = walls.create(800, 600, "wall");
    //woll.setCollideWorldBounds(true);
    //woll.setVelocityX(-50);

    let wall = this.add.image(600, 150, "wall");

    this.physics.add.collider(player, walls);
}

function update() {
    player.anims.play("fly", true);
    
    if (cursors.space.isDown) {
        player.setVelocityY(-100);
        player.setAngle(-45);
    } else {
        player.setAngle(0);
    }
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