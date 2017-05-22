import 'pixi'
import 'p2'
import Phaser from 'phaser'

import Boot from './states/Boot'
import Preloader from './states/Preloader'
import Play from './states/Play'
import Title from './states/Title'
import LevelSelect from './states/LevelSelect'
import Level from './states/Level'

class Game extends Phaser.Game {
  constructor () {
    super(512, 512, Phaser.AUTO, 'game', null, false, false)

    this.state.add('Boot', Boot)
    this.state.add('Preloader', Preloader)
    this.state.add('Play', Play)
    this.state.add('Title', Title)
    this.state.add('LevelSelect', LevelSelect)
    this.state.add('Level', Level)

    this.state.start('Boot')
  }
}

window.game = new Game()
