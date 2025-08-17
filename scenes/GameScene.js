// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class GameScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
  }

  create() {
    // create game objects
    this.pala = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.height - 100, 120, 20,  0x00ff00 
    );
  this.physics.add.existing(this.pala, true); 

  this.cursors = this.input.keyboard.createCursorKeys();

    this.ball = this.add.circle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      11, 0xff0000 
    );
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1);
    this.ball.body.setVelocity(300, -300);

    this.physics.add.collider(this.ball, this.pala);

    this.brick = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      100, 
      20,  
      0x0000ff 
    );



    this.physics.add.existing(this.brick, true); 
    this.physics.add.collider(this.ball, this.brick, () => {
      this.brick.destroy();
    }, null, this);
  }
 
  update() {
    if (this.cursors.left.isDown) {
      this.pala.x -= 8;
    } else if (this.cursors.right.isDown) {
      this.pala.x += 8;
    }
    this.pala.x = Phaser.Math.Clamp(this.pala.x, 60, this.cameras.main.width - 60);
    this.pala.body.updateFromGameObject();
  }
}
