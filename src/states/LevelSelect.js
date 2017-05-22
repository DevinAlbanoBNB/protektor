import Phaser from 'phaser'

export default class LevelSelect extends Phaser.State {
  init () {
  }

  preload () {
  }

  create () {
    this.state.start('Level')
  }
}
