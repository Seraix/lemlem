//Create game config
var config = {
type: Phaser.AUTO,
width: 800,
height: 200,
backgroundColor: '#F8F8F8',
physics: {
default: 'arcade',
arcade: {
  gravity: {
    y: 300
  },
  // debug: true
}
},
scene: [
	mainMenu,
	gamePlay
],
pixelArt: true
};
//Instantiate game
var game = new Phaser.Game(config);
