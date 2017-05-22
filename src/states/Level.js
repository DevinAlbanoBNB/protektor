import Phaser from 'phaser'
import Player from '../gameObjects/Player'
import Enemy from '../gameObjects/Enemy'

export default class Level extends Phaser.State {
  init () {
    console.log('Level State')
  }

  preload () {
  }

  create () {
    this.player = new Player(this.game)
    this.enemy = new Enemy(this.game)
  }

  update () {
    this.physics.arcade.overlap(this.player.sprite, this.enemy.sprite)
    this.physics.arcade.overlap(this.enemy.sprite, this.player.bullets)
  }
}
