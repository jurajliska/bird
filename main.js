let player

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.spritesheet("bird", "assets/bird.png", {frameWidth: 32, frameHeight: 32});
}

function create() {
    let bg = this.add.image(600, 300, "sky");
    bg.displayWidth = 1200;

    player = this.physics.add.sprite(300, 300, "bird").setScale(1.5);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird", {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });
}

function update() {
    //player.anims.play("fly", true);
}

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100},
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