import Enemy from '../sprites/Enemy'

export default class Pattern {
  constructor (stage) {
    this.stage = stage
    this.game = stage.game
  }

  getPattern () {
    return [
      {
        'id': 'ship1',
        'speed': 100,
        'direction': 'down'
      },
      {
        'id': 'sine_ship',
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
        'id': 'sine_ship',
        'speed': 200,
        'direction': 'right'
      },
      {
        'id': 'ship1',
        'speed': 200,
        'direction': 'up'
      },
      {
        'id': 'ship1',
        'speed': 100,
        'direction': 'right'
      },
      {
        'id': 'ship3',
        'speed': 100,
        'health': 3,
        'direction': 'left'
      }
    ]
  }

  run (startDelay, loopDelay) {
    let pattern = this.getPattern()

    let timer = this.game.time.create(false)
    timer.loop(loopDelay, () => {
      let stats = pattern.shift()
      let enemy = new Enemy(this.game, stats)

      this.stage.enemies.add(enemy)

      if (pattern.length === 0) {
        timer.stop()
      }
    }, this)
    timer.start(startDelay)
  }
}
