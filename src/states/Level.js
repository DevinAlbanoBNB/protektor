import Phaser from 'phaser'
import Player from '../sprites/Player'
import Pattern from '../logic/Pattern'

export default class Level extends Phaser.State {
  init () {
    console.log('Level State')
  }

  preload () {
  }

  create () {
    this.player = new Player(this.game)
    this.enemies = this.game.add.group()

    this.pattern = new Pattern(this)

    this.pattern.run(100, 2000)
    this.pattern.run(200, 1000)
    this.pattern.run(300, 500)
  }

  update () {
    this.physics.arcade.overlap(this.player, this.enemies)
    this.physics.arcade.overlap(this.player.bullets, this.enemies)

    this.player.update()
    this.enemies.forEach((enemy) => enemy.update())
  }
}
