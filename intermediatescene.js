let cheese1Visible = false;
let cheese2Visible = false;
class interScene extends Phaser.Scene {
  constructor() {
    super({ key: 'interScene' });}
    preload() {

    }

    create(){
    let centerX = this.cameras.main.width / 2;
    let centerY = this.cameras.main.height / 2;
    this.cameras.main.setBackgroundColor('#000000');
    this.add.text(centerX, centerY - 60, 'Congrats on completing the test phase!', {
        fontSize: '48px',
        color: '#fff'
    }).setOrigin(0.5); 

    this.add.text(centerX, centerY, 'Now we move on to the training phase...', {
        fontSize: '48px',
        color: '#fff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 60, 'Can you remember where the rewards were?', {
        fontSize: '48px',
        color: '#fff'
    }).setOrigin(0.5);
}
    update(){
        const keyLeftObj = this.input.keyboard.addKey('LEFT');
        const keyRightObj = this.input.keyboard.addKey('RIGHT');
        const keyUpObj = this.input.keyboard.addKey('UP');
        const keyDownObj = this.input.keyboard.addKey('DOWN');
        const keyW = this.input.keyboard.addKey('W'); 
         const keyS = this.input.keyboard.addKey('S');
         const keyA = this.input.keyboard.addKey('A'); 
          const keyD = this.input.keyboard.addKey('D');
          if (keyA.isDown || keyD.isDown || keyS.isDown || keyW.isDown || keyRightObj.isDown || keyLeftObj.isDown) {
            this.scene.switch("twoScene")
          }

    }
  }
export default interScene;