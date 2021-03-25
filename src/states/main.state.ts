'use strict';
/** Imports */
import State from './state';

//var score;
//var scoreText;

// The main state of the game
export default class MainState extends State {
  sky: Phaser.Sprite; // Reference to background sprite
  dude: Phaser.Sprite;
  player: Phaser.Sprite;
  droid: Phaser.Sprite;
  platforms: Phaser.Group; // Reference to the group of platform's sprites
  stars: Phaser.Group;
  bombs: Phaser.Group;
  cursors: Phaser.CursorKeys;
 
	scoreText;
	score;
	sideDroid;
	
	 // ssome variable for score 
	//score: Phaser.Char;
	//scoreText: Phaser.Char; 	
	
  create(): void {

	this.sideDroid = true;

    // Phaser supports some physical engines (p2, box2d, ninja and arcate).
    // For our game, we don't need a strong physical simulation, so we'll choose
    // `arcade` model.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	//this.game.physics.startSystem(Phaser.Physics.P2JS);
	//this.game.physics.p2.gravity.y = 100;
    //this.game.physics.p2.restitution = 0.8;

	//const boxMaterial = this.game.physics.p2.createMaterial('worldMaterial');

    // Add a simple background
    this.sky = this.game.add.sprite(0, 0, 'sky');

    // Also we create a group for platforms
    this.platforms = this.game.add.group();

    // and enable physics for any object that is created in this group
    this.platforms.enableBody = true;


    // Create the ground
    const ground = this.platforms.create(
      0,
      this.game.world.height - 64,
      'platform'
    );

    // and scale it to fit the width of the game (the original sprite
    // size - 400x32, width of the game - 800)
    ground.scale.setTo(2, 2);

    // And make it immovable (Otherwise it will fall when we jump on it).
    ground.body.immovable = true;

    // Also add two ledges
    const ledge1 = this.platforms.create(400, 400, 'platform');
	//ledge1.setScale(2).refreshBody();
    ledge1.body.immovable = true;
	//this.game.physics.p2.enable(ledge1);
    ledge1.body.mass = 6;
    ledge1.body.static = true;
    //ledge1.body.setMaterial(boxMaterial);
		
    const ledge2 = this.platforms.create(-150, 250, 'platform');
    ledge2.body.immovable = true;
	//this.game.physics.p2.enable(ledge1);
    ledge2.body.mass = 6;
    ledge2.body.static = true;
    //ledge2.body.setMaterial(boxMaterial);
	
	// add sprites
	//const map = ['X'].map((line) => line.split('')); // Разбиваем линии на отдельные символы

    // Обход всех линий и символов
    //map.forEach((line, y) => line.forEach((char, x) => {
    //  if (char !== 'X') {
    //    return;
    //  }

      // Если символ соответствует `X`, нарисуем вместо него звезду.
      // 24 - ширина изображения.
      // 22 - высота.
    //  this.game.add.sprite(x * 24, y * 22, 'star');
    //}));
	
	//const player = this.physics.add.sprite(100, 450, 'dude');
	//this.dude = this.game.add.sprite(10, 10, 'dude');
	//this.game.physics.p2.enable(this.dude);
	//this.dude.setCollideWorldBounds(true);
	//this.game.physics.p2.add.collider(this.dude, ground);
	//this.game.physics.p2.add.collider(this.dude, ledge1);
	//this.game.physics.p2.add.collider(this.dude, ledge2);
	
	// ADD player
	//const player = this.game.add.sprite(100, 450, 'dude');
	
    // The player and its settings
    this.player = this.game.add.sprite(32, this.game.world.height - 130, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	//this.player.animations.add('destroy', [5], 5, true);

    this.droid = this.game.add.sprite(0, 0, 'droid'); //this.game.world.height - 130, 'droid');
	this.game.physics.arcade.enable(this.droid);
    this.droid.body.bounce.y = 0.2;
    this.droid.body.gravity.y = 300;
    this.droid.body.collideWorldBounds = true;
    this.droid.animations.add('left', [0, 1, 2, 3], 10, true);
    this.droid.animations.add('right', [3, 2, 1, 0], 10, true);


	// some STARS
    this.stars = this.game.add.group();

    this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 136;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }	

	// some random bombs
    this.bombs = this.game.add.group();

    this.bombs.enableBody = true;
    for (var i = 2; i < 4; i++)
    {
        //  Create a star inside of the 'stars' group
        var bomb = this.bombs.create(i * 190, 0, 'bomb');

        //  Let gravity do its thing
        bomb.body.gravity.y = 136;

        //  This just gives each star a slightly random bounce value
        bomb.body.bounce.y = 0.7 + Math.random() * 0.2;
    }	

	//this.game.physics.arcade.collide(this.stars, this.platforms);
	//this.game.physics.arcade.collide(this.bombs, this.platforms);

	this.scoreText = this.game.add.text(16, 16, 'Score: 0$', { fontSize: '32px', fill: '#000' });
	this.score = 0;
	
	// keys controll
	this.cursors = this.game.input.keyboard.createCursorKeys();

  }
  
	update(): void {
		//bmd.context.fillStyle = '#ffff00';
		//bmd.context.fillRect(sprite.x, sprite.y, 2, 2);
		var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
		var hitPlatform2 = this.game.physics.arcade.collide(this.stars, this.platforms);
		var hitPlatform3 = this.game.physics.arcade.collide(this.bombs, this.platforms);
		var hitPlatform4 = this.game.physics.arcade.collide(this.droid, this.platforms);
		
		// use collides
		this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
		this.game.physics.arcade.overlap(this.player, this.bombs, this.findBomb, null, this);
		
		
		if(this.sideDroid == true){
			this.droid.x += 2;
			this.droid.animations.play('right');
			if(this.droid.x >= (this.game.world.width-32)){
				this.sideDroid = false;
			} 
		}else{
			this.droid.x -= 2;
			this.droid.animations.play('left');
			if(this.droid.x <= 0){
				this.sideDroid = true;
			} 
		}

		//  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if (this.cursors.left.isDown)
		{
			//  Move to the left
			this.player.body.velocity.x = -150;
			this.player.animations.play('left');
		}
		else if (this.cursors.right.isDown)
		{
			//  Move to the right
			this.player.body.velocity.x = 150;
			this.player.animations.play('right');
		}
		else
		{
			//  Stand still
			this.player.animations.stop();
			this.player.frame = 4;
		}

		//  Allow the player to jump if they are touching the ground.
		if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
		{
			this.player.body.velocity.y = -350;
		}		
		
	}
	
	launch(): void {
		
	}
	
	collectStar(player, star): void {
		// Removes the star from the screen
		star.kill();
		
		//  Add and update the score
		this.score += 10;
		this.scoreText.text = 'Score: ' + this.score + "$";

	}
	
	findBomb(player, bomb):void{
	// Removes player
			
		
		//alert("You lose!");
		//this.game.lockRender = true;

		//this.create();	
		
		//this.game.lockRender = false;
		//this.player.body.velocity.x = 0;	
		//this.player.body.velocity.y = 0;
		//this.player.animations.stop();
		//this.destroy();
		this.create();	
		//player.body.velocity.setTo(0,0);
		//this.player.body.x = 0;	
		//this.player.body.y = 0;
	}
	
}
