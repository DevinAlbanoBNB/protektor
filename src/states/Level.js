import Phaser from 'phaser'
import Player from '../sprites/Player'
import Enemy from '../sprites/Enemy'

export default class Level extends Phaser.State {
  init () {
    console.log('Level State')
  }

  preload () {
  }

  create () {
    this.player = new Player(this.game)
    this.enemies = this.game.add.group()

    this.pattern = [
      {
        'id': 'ship1',
        'speed': 100,
        'direction': 'down'
      },
      {
        'id': 'ship1',
        'speed': 200,
        'direction': 'left'
      },
      {
        'id': 'ship2',
        'speed': 100,
        'health': 2,
        'direction': 'down'
      },
      {
        'id': 'ship1',
        'speed': 200,
        'direction': 'up'
      },
      {
        'id': 'ship1',
        'speed': 100,
        'direction': 'down'
      },
      {
        'id': 'ship3',
        'speed': 100,
        'health': 3,
        'direction': 'left'
      }
    ]

    this.timer = this.game.time.create(false)
    this.timer.loop(2000, () => {
      let stats = this.pattern.shift()
      let enemy = new Enemy(this.game, stats)

      this.enemies.add(enemy)

      if (this.pattern.length === 0) {
        this.timer.stop()
      }
    }, this)
    this.timer.start()
  }

  update () {
    this.physics.arcade.overlap(this.player, this.enemies)
    this.physics.arcade.overlap(this.player.bullets, this.enemies)
  }
}
