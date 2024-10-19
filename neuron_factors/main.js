const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 380,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let tubes = [];
let firstdish;
let droppedtubes = [];
let droppedTubesText;

function preload() { // Loading images!
    this.load.image('fume_hood', 'assets/fume_hood.jpg');
    this.load.image('dish1', 'assets/dish_white.png');
    this.load.image('dish2', 'assets/dish_blue.png');
    this.load.image('dish3', 'assets/dish_green.png');
    this.load.image('dish_success', 'assets/dish_success.png')
    this.load.image('dish_fail', 'assets/dish_fail.png')
    this.load.image('DBL', 'assets/tube_darkb-removebg-preview.png');
    this.load.image('LBL', 'assets/tube_lightb-removebg-preview.png');
    this.load.image('YLLW', 'assets/tube_yellow-removebg-preview.png');

}

function create() {
    // Add the background
    background = this.add.image(310, 190, 'fume_hood').setOrigin(0.5, 0.5);

    // Add the dish in the center
    firstdish = this.add.image(400, 200, 'dish1').setOrigin(0.5, 0.5);

    // Create tubes and enable drag
    createtubes.call(this);
    //currenttube = this.add.image(100, 100, 'DBL').setOrigin(0.5, 0.5);

    // Set event for dropping tubes
    //firstdish.on('pointerdown', () => {
    //    firstdish.setTexture('dish2');
    //});
    droppedTubesText = this.add.text(10, 10, 'Factors Added: []', { font: '16px Arial', fill: '#fff' });

    const restartButton = this.add.text(10, 350, 'Restart', { font: '16px Arial', fill: '#fff', backgroundColor: '#000' })
        .setInteractive()
        .on('pointerdown', restartGame.bind(this)); // Bind context
}


function update() {
    // Game loop logic (if needed)
}

function createtubes() {
    const tubesImages = ['DBL', 'LBL', 'YLLW'];

    //tubes.forEach(tube => tube.destroy());
    //tubes = []; // These two would delete my tubes after dropping one!
    
    tubesImages.forEach((tubeImage, index) => {
        const tube = this.add.image(100, 100 + index * 100, tubeImage).setInteractive();
        tube.setScale(0.3);
        tubes.push(tube);

        // Creating a variable to keep track of whether it is being dragged
        let isDragging = false;

        // Enable dragging
        tube.on('pointerdown', function (pointer) {
            isDragging = true;
            this.setScale(0.7); // Slightly scale down the tube when picked up
            // this.emit('picked', pointer);
        });

        tube.on('pointerup', function (pointer) {
            this.setScale(0.4); // Reset scale
            isDragging = false;
            if (pointer.x >= 300 && pointer.x <= 500 && pointer.y >= 100 && pointer.y <= 300) {
                droppedtubes.push(this.texture.key); // Track the dropped tube
                this.destroy(); // Remove tube from scene
                //createtubes.call(this.scene); // Create new tubes
                changeDishImage.call(this.scene); // Update the dish image
            }
            droppedTubesText.setText('Factors Added: ' + droppedtubes.join(', ')); // Update displayed text
        });

        tube.on('pointermove', function (pointer) {
            if (isDragging) {
                this.x = pointer.x;
                this.y = pointer.y;
            }
            
        });
    });
}

// Function to change dish image based on dropped tubes
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
            // You can implement further logic if all three tubes are dropped
            if (droppedtubes[2] === 'YLLW') {
                firstdish.setTexture('dish_success'); // Change to dish3 if LBL is second
            } else {
                firstdish.setTexture('dish_fail'); // Reset or keep as dish1 for any other order
            }
        } else if (droppedtubes[0] === 'LBL' || droppedtubes[0] === 'YLLW') {
            firstdish.setTexture('dish_fail')
        }
    }
}

// Function to restart the game
function restartGame() {
    // Reset game variables
    droppedtubes = []; // Clear dropped tubes
    droppedTubesText.setText('Dropped Tubes: []'); // Reset displayed text

    // Remove existing tubes from the scene
    tubes.forEach(tube => tube.destroy());
    tubes = []; // Clear the tubes array

    // Reset dish image
    firstdish.setTexture('dish1');

    // Create new tubes
    createtubes.call(this);
}