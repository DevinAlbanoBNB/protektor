import Phaser from 'phaser'

export default class Bullet extends Phaser.Sprite {
  constructor (game, stats) {
    let center = { x: game.world.centerX, y: game.world.centerY }
    super(game, center.x, center.y, 'bullet')

    this._damage = stats.damage || 1
    this._health = stats.health || 1
    this._speed = stats.speed || 200
    this._direction = stats.direction
    this._type = stats.type || 'weapon'
    
    this.game.stage.addChild(this)

    this.setupSprite()
    this.setupPhysics()
    this.setupCollisions()
  }

  setupSprite () {
    this.anchor.set(0.5)
    this.scale.setTo(2)
    this.events.onKilled.add(() => {
      this.destroy()
    }, this.game)
  }

  setupPhysics () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.game.physics.arcade.velocityFromAngle(this._direction, this._speed, this.body.velocity)
    this.outOfBoundsKill = true
    this.checkWorldBounds = true
  }

  setupCollisions () {
    this.body.onOverlap = new Phaser.Signal()
    this.body.onOverlap.add((me, other) => {
      other.type = other.type || ''

      if (other._type === 'enemy') {
        other.damage(me._damage)
        me.kill()
      }
    }, this.game)
  }
}
