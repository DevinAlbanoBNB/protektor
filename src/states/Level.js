import Phaser from 'phaser'
import Player from '../gameObjects/Player'
import Enemy from '../sprites/Enemy'
import * as Direction from '../constants/Direction'

export default class Level extends Phaser.State {
  init () {
    console.log('Level State')
  }

  preload () {
  }

  create () {
    this.player = new Player(this.game)
    this.enemy = new Enemy(this.game, { id: 'ship1', speed: 100, direction: Direction.down })
  }

  update () {
    this.physics.arcade.overlap(this.player.sprite, this.enemy)
    this.physics.arcade.overlap(this.enemy, this.player.bullets)
  }
}
