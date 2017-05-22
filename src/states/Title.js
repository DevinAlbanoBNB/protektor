import Phaser from 'phaser'

export default class Title extends Phaser.State {
  init () {
  }

  preload () {
    this.titleStyle = {
      font: 'bold 50pt courier',
      fill: 'white'
    }

    this.optionStyle = {
      font: 'bold 12pt courier',
      fill: 'white'
    }
  }

  centerX () {
    return this.game.world.centerX
  }

  centerY () {
    return this.game.world.centerY
  }

  create () {
    this.game.add.text(this.centerX(), this.centerY(), 
      'PROTEKTOR', 
      this.titleStyle)
      .anchor.set(0.5)

    this.game.add.text(this.centerX(), this.centerY() + 64, 
      'Press Space to Start', 
      this.optionStyle)
      .anchor.set(0.5)

    this.startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.startButton.onDown.dispatch = () => {
      this.state.start('LevelSelect')
    }
  }
}
