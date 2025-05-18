let player;
let walls;
let cursors;
let speed = 80;

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
    //graphics.lineStyle(5, 0xff00ff, 1.0);
    graphics.fillStyle(0x009900, 1);
    graphics.fillRect(0, 0, 50, 320);
    graphics.generateTexture("wall", 50, 320);

    walls = this.physics.add.group();

    woll = walls.create(1200, 60, "wall");
    woll.setVelocityX(-speed);
    woll = walls.create(1200, 540, "wall");
    woll.setVelocityX(-speed);

    wallTimer = this.time.addEvent({delay: 3500, callback: makeWalls, callbackScope: this, loop: true});

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, walls);
}

function update() {
    player.anims.play("fly", true);
    
    if (cursors.space.isDown) {
        player.setVelocityY(-150);
        player.setAngle(-45);
    } else {
        player.setAngle(0);
    }

    walls.children.iterate(function (child){
        if (child.x < 0) {
            child.disableBody(true, true);
        }
    })
}

function makeWalls() {
    let y = Phaser.Math.Between(-90, 90)
    woll = walls.create(1220, 60+y, "wall");
    woll.setVelocityX(-speed);
    woll = walls.create(1220, 540+y, "wall");
    woll.setVelocityX(-speed);
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