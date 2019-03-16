class gamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlay" });
  }

	preload() {
		this.road;
		this.background;
		this.obsticles;
		this.player;
		this.distanceRode;
		this.distance;
		this.actualDistance;
		this.distanceMeter;
		this.load.image('city', 'assets/city.png');
		this.load.image('road', 'assets/ground.png');
		this.load.image('obstacle', 'assets/obstacle.png');
		this.load.spritesheet('lemmy', 'assets/lemmy-spritesheet.png', {
		frameWidth: 40,
		frameHeight: 26
	});
	}

	create() {

	//Background
	this.background = this.add.tileSprite(0, 0, 800, 200, 'city').setOrigin(0);

	//Road
	this.road = this.physics.add.staticGroup();
	this.road.create(0, 165, 'road').setOrigin(0).refreshBody();

	//Score
	distanceMeter = this.add.text(16, 16, '0.0', {
	fontSize: '16px',
	fill: '#000'
	});

	//Obstacle
	var Obstacle = new Phaser.Class({

	Extends: Phaser.GameObjects.Image,

	initialize: function Obstacle(scene) {
	  Phaser.GameObjects.Image.call(this, scene, 0, 0, 'obstacle');
	  this.speed = Phaser.Math.GetSpeed(400, 1);
	},

	generateObstacle: function() {
	  this.setPosition(800, 157);

	  this.setActive(true);
	  this.setVisible(true);

	},

	update: function(time, delta) {
	  this.x -= this.speed * delta;

	  if (this.x < 0) {
	    this.setActive(false);
	    this.setVisible(false);
	  }
	}

	});

	obstacles = this.physics.add.group({
	classType: Obstacle,
	maxSize: 10,
	runChildUpdate: true
	});

	obstacles.children.iterate(function(child) {
	game.physics.enable(obstacle, Phaser.Physics.ARCADE);
	})


	//Player
	this.player = this.physics.add.sprite(100, 150, 'lemmy');
	this.player.setBounce(0.2);
	this.player.setCollideWorldBounds(true);

	//Collision
	this.physics.add.collider(this.player, road, land);
	this.physics.add.collider(road, obstacles);
	this.physics.add.collider(this.player, obstacles, hitObstacle.bind(this));

	// obstacles.setBounce(1);

	this.anims.create({
	key: 'idle',
	frames: this.anims.generateFrameNumbers('lemmy', {
	  start: 0,
	  end: 1
	}),
	frameRate: 10,
	repeat: -1
	});

	cursors = this.input.keyboard.createCursorKeys();

	}

	hitObstacle() {
	// console.log(this);

	// this.scene.pause();
	crash();
	return true;
	}

	land() {
	this.player.setAngularVelocity(0);
	//
	this.player.rotation = this.player.rotation * 0.50;
	if (this.player.rotation < 0.1) {

	}
	//this.player.setAngularAcceleration(800);


	}

	shouldAddObstacle(x) {
	// var distances = [300, 400, 600];
	var distances = [600, 800, 1000];
	var rand = distances[Math.floor(Math.random() * distances.length)];
	return x % rand == 0;
	}

	crash() {
	this.player.setVelocityY(-150);
	this.player.setAngularVelocity(800);
	//this.player.setAngularAcceleration(-800);



	}

	//GAMELOOP
	update() {
	//window.scene = this.scene;
	this.background.tilePositionX += 5;
	this.distanceRode = this.background.tilePositionX * 0.0025;
	this.distanceMeter.setText(distanceRode.toFixed(1) + ' miles');


	if (shouldAddObstacle(this.background.tilePositionX)) {
	var newObstacle = obstacles.get();

	if (newObstacle) {
	  // this.physics.add.collider(newObstacle, this.player);

	  newObstacle.generateObstacle();
	  // newObstacle.setBounce(0.2);
	  // this.physics.add.collider(this.player, newObstacle);

	}
	}

	if (cursors.space.isDown && this.player.body.touching.down) {
	this.player.setVelocityY(-150);
	//this.player.setAngularVelocity(-10);
	} else {
	this.player.setVelocityX(0);
	this.player.anims.play('idle', true);
	}
	}
}
