import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Minigame1 = () => {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    let background, firstdish, droppedTubesText;
    let tubes = [];
    let droppedtubes = [];

    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 380,
      parent: gameContainerRef.current,
      scene: {
        preload: function () {
            this.load.image('fume_hood', 'fume_hood.jpg');
            this.load.image('dish1', 'dish_white.png');
            this.load.image('dish2', 'dish_blue.png');
            this.load.image('dish3', 'dish_green.png');
            this.load.image('dish_success', 'dish_success.png');
            this.load.image('dish_fail', 'dish_fail.png');
            this.load.image('DBL', 'tube_darkb-removebg-preview.png');
            this.load.image('LBL', 'tube_lightb-removebg-preview.png');
            this.load.image('YLLW', 'tube_yellow-removebg-preview.png');
        },
        create: function () {
            // Add the background
            background = this.add.image(310, 190, 'fume_hood').setOrigin(0.5, 0.5);

            // Add the dish in the center
            firstdish = this.add.image(400, 200, 'dish1').setOrigin(0.5, 0.5);

            // Create tubes and enable drag
            createtubes.call(this);

            droppedTubesText = this.add.text(10, 10, 'Factors Added: []', { font: '16px Arial', fill: '#fff' });

            const restartButton = this.add.text(10, 350, 'Restart', { font: '16px Arial', fill: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', restartGame.bind(this)); // Bind context
        },
        update: function () {
          // Update logic here
        }
      }
    };

    const game = new Phaser.Game(config);

    function createtubes() {
        const tubesImages = ['DBL', 'LBL', 'YLLW'];
        
        tubesImages.forEach((tubeImage, index) => {
            const tube = this.add.image(100, 100 + index * 100, tubeImage).setInteractive();
            tube.setScale(0.3);
            tubes.push(tube);

            let isDragging = false;

            // Enable dragging
            tube.on('pointerdown', function (pointer) {
                isDragging = true;
                this.setScale(0.7);
            });

            tube.on('pointerup', function (pointer) {
                this.setScale(0.4);
                isDragging = false;
                if (pointer.x >= 300 && pointer.x <= 500 && pointer.y >= 100 && pointer.y <= 300) {
                    droppedtubes.push(this.texture.key);
                    this.destroy();
                    changeDishImage.call(this.scene);
                }
                droppedTubesText.setText('Factors Added: ' + droppedtubes.join(', '));
            });

            tube.on('pointermove', function (pointer) {
                if (isDragging) {
                    this.x = pointer.x;
                    this.y = pointer.y;
                }
            });
        });
    }

    function changeDishImage() {
        if (droppedtubes.length > 0) {
            // Check the order of the dropped tubes
            if (droppedtubes.length === 1 && droppedtubes[0] === 'DBL') {
                firstdish.setTexture('dish2'); // Change to dish2 if DBL is dropped first        
            } else if (droppedtubes.length === 2) {
                // Example condition if LBL is dropped second
                if (droppedtubes[1] === 'LBL') {
                    firstdish.setTexture('dish3'); // Change to dish3 if LBL is second
                } else {
                    firstdish.setTexture('dish_fail'); // Reset or keep as dish1 for any other order
                }
            } else if (droppedtubes.length === 3) {
                // Additional logic for handling 3 dropped tubes
                if (droppedtubes[2] === 'YLLW') {
                    firstdish.setTexture('dish_success'); // Change to dish_success if YLLW is dropped third
                } else {
                    firstdish.setTexture('dish_fail'); // Reset or keep as dish_fail for any other order
                }
            } else if (droppedtubes[0] === 'LBL' || droppedtubes[0] === 'YLLW') {
                firstdish.setTexture('dish_fail'); // Fail if the first dropped tube is LBL or YLLW
            }
        }
    }

    function restartGame() {
        droppedtubes = [];
        droppedTubesText.setText('Dropped Tubes: []');
    
        tubes.forEach(tube => tube.destroy());
        tubes = [];
    
        firstdish.setTexture('dish1');
    
        createtubes.call(this);
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} />;
};

export default Minigame1;
