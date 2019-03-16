class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }
  create() {	
	this.scene.start("GamePlay");
  }
}
