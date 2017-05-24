import Enemy from '../sprites/Enemy'

export default class Pattern {
  constructor (stage, patternData) {
    this.stage = stage
    this.game = stage.game
    this.pattern = patternData.pattern
    this.startDelay = patternData.start_delay
    this.loopDelay = patternData.loop_delay
  }

  run () {
    let timer = this.game.time.create(false)

    timer.loop(this.loopDelay, () => {
      let stats = this.pattern.shift()
      let enemy = new Enemy(this.game, stats)

      this.stage.enemies.add(enemy)

      if (this.pattern.length === 0) {
        timer.stop()
      }
    }, this)
    timer.start(this.startDelay)
  }
}
