import indexScene from "./index.js"
import twoScene from "./scene2.js"
import interScene from "./intermediatescene.js"

var config = {
  type: Phaser.AUTO,
  width: 1300,
  height: 1500,
  backgroundColor: 'ffffff',
  autoCenter: true,
    physics: {
    default: 'arcade',
    arcade: {
      debug: false }
}};

const game = new Phaser.Game(config);
game.scene.add('twoScene', twoScene);
game.scene.add('indexScene', indexScene);
game.scene.add('interScene', interScene);
game.scene.start('indexScene');
