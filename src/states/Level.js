import Phaser from 'phaser'
import Player from '../sprites/Player'
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
    this.enemies = this.game.add.group()

    this.timer = this.game.time.create(false)
    this.timer.loop(2000, () => {
      let enemy = new Enemy(this.game, { id: 'ship1', speed: 100, direction: Direction.down })
      this.enemies.add(enemy)
    }, this)
    this.timer.start()
  }

  update () {
    this.physics.arcade.overlap(this.player, this.enemies)
    this.physics.arcade.overlap(this.player.bullets, this.enemies)
  }
}
