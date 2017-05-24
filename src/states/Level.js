import Phaser from 'phaser'
import Player from '../sprites/Player'
import EnemySpawner from '../logic/EnemySpawner'

export default class Level extends Phaser.State {
  init () {
  }

  preload () {
  }

  create () {
    this.player = new Player(this.game)
    this.enemies = this.game.add.group()

    this.enemySpawner = new EnemySpawner(this, 'level1')
  }

  update () {
    this.physics.arcade.overlap(this.player, this.enemies)
    this.physics.arcade.overlap(this.player.bullets, this.enemies)

    this.player.update()
    this.enemies.forEach((enemy) => enemy.update())
  }
}
