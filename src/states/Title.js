import Phaser from 'phaser'

export default class Title extends Phaser.State {
  init () {
  }

  preload () {

  }

  create () {
    this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'PROTEKTOR', {
      font: 'bold 50pt courier',
      fill: 'white'
    }).anchor.set(0.5)

    this.game.add.text(this.game.world.centerX, this.game.world.centerY + 48, 'Press Space to Start', {
      font: 'bold 12pt courier',
      fill: 'white'
    }).anchor.set(0.5)
  }
}
