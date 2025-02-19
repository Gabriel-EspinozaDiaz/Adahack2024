let cheese1Visible = false;
let cheese2Visible = false;
class indexScene extends Phaser.Scene {
  constructor() {
    super({ key: 'indexScene' });
    this.timerText;
    this.startTime;
    this.timerRunning = false;
    this.moving = false;
}
  preload() {
    console.log('preloading scene...');
    this.load.image('mouse', 'hero2.png');
    this.load.image('maze', 'radial_arm_max.png')
    this.load.image('tiles', 'platformPack_tilesheet.png');
    this.load.tilemapTiledJSON('tilemap', 'map_fr.json');
    this.load.image('cheese','cheese.png')
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' })
    console.log('Tilemap:', map);
    const tileset = map.addTilesetImage('tileset', 'tiles')
    const radialarmmaze = map.createLayer('Tile Layer 1', tileset);
    radialarmmaze.setScale(1.5)
    radialarmmaze.setCollisionByExclusion(-1, true);
    //let maze = this.add.image(600, 600, 'maze'); 
    //maze.setScale(0.4);
    this.player = this.physics.add.sprite(600, 600, 'mouse');
    this.player.setScale(0.12)
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.playerSpeed = 300;
    this.physics.add.collider(this.player, radialarmmaze);
    this.area1 = new Phaser.Geom.Rectangle(200, 200, 100, 100);
    this.area2 = new Phaser.Geom.Rectangle(700, 1100, 200, 300);
    this.cheese1 = this.add.image(230,260,'cheese').setScale(0.02)
    this.cheese2 = this.add.image(720,1200,'cheese').setScale(0.02)
    this.cheese1.setVisible(false);
    this.cheese2.setVisible(false);
    this.timerText = this.add.text(20, 20, 'Timer: 0', { font: '20px Arial', fill: '#000' });
}

  update() {
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keyUpObj = this.input.keyboard.addKey('UP');
    const keyDownObj = this.input.keyboard.addKey('DOWN');
    const keyW = this.input.keyboard.addKey('W'); 
    const keyS = this.input.keyboard.addKey('S');
    const keyA = this.input.keyboard.addKey('A'); 
    const keyD = this.input.keyboard.addKey('D');
    if ((keyA.isDown || keyD.isDown || keyS.isDown || keyW.isDown || keyRightObj.isDown || keyLeftObj.isDown) && this.timerRunning==false) {
        this.startTime = new Date;
        this.timerRunning = true; }
    if (keyA.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (keyD.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0); 
    }

    if (keyW.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (keyS.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    } else {
      this.player.setVelocityY(0); 
    }
    if (keyLeftObj.isDown) {
      this.player.angle -= 3;
    } else if (keyRightObj.isDown) {
      this.player.angle += 3;
    }
    if (Phaser.Geom.Rectangle.Contains(this.area1, this.player.x, this.player.y)) {
      this.cheese1.setVisible(true); 
      cheese1Visible = true;
    } 
    if (Phaser.Geom.Rectangle.Contains(this.area2, this.player.x, this.player.y)) {
      this.cheese2.setVisible(true); 
      cheese2Visible = true;
    } 
    if (cheese1Visible == true && cheese2Visible == true) {
      this.scene.switch("interScene");
    }
    if (this.timerRunning == true) {
      const currentTime = new Date();
      const elapsedTime = (currentTime - this.startTime) / 1000; 
      this.timerText.setText('Timer: ' + elapsedTime.toFixed(2));
    }
}
}
export default indexScene;


