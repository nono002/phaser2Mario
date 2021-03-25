'use strict';
/** Imports */
import State from './state';

// Webpack will replace these imports with a URLs to images
const skyImage        = require('assets/images/sky.png'); // const skyImage = '/assets/images/sky.png';
const platformImage   = require('assets/images/platform.png');
const starImage       = require('assets/images/star.png');
const bomb       	  = require('assets/images/bomb.png');
const dudeImage       = require('assets/images/dude.png');
const droideImage       = require('assets/images/droid.png');
// load json map
const mapJson		= require('assets/json/level1.json');
const tileImage	= require('assets/json/tiles-1.png');

// The state for loading core resources for the game
export default class PreloaderState extends State {
  preload(): void {
    console.debug('Assets loading started');

    this.game.load.image('sky', skyImage);
    this.game.load.image('platform', platformImage);
    this.game.load.image('star', starImage);
	this.game.load.image('bomb', bomb);
    this.game.load.spritesheet('dude', dudeImage, 32, 48);
	this.game.load.spritesheet('droid', droideImage, 32, 32);	
	//this.game.load.json('map1', mapjson);
	//game.load.tilemap('level1', 'assets/games/starstruck/level1.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tilemap('level1', mapJson, null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles-1', tileImage);	
  }

  create(): void {
    console.debug('Assets loading completed');

    this.game.state.start('main'); // Switch to main game state
  }
}
