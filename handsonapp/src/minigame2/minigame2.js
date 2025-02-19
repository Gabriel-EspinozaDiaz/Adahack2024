import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Minigame2 = () => {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainerRef.current,
      scene: {
        preload: function () {
          this.load.image('sky', 'sky.png');
        },
        create: function () {
          this.add.image(400, 300, 'sky');
        },
        update: function () {
          // Update logic here
        }
      }
    };

    const game = new Phaser.Game(config);

    // Cleanup Phaser instance on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} />;
};

export default Minigame2;