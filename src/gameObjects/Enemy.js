import Phaser from 'phaser'

export default class Enemy {
  constructor (game) {
    this.game = game

    this.setupSprite()
    this.setupPhysics()
    this.setupCollisions()
  }

  setupSprite () {
    this.sprite = this.game.add.sprite(this.game.world.centerX, 0, 'ship1')
    this.sprite.anchor.set(0.5)
    this.sprite.scale.setTo(2)

    this.sprite.type = 'enemy'
    this.sprite.damage = 1
    this.sprite.health = 2
  }

  setupPhysics () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.velocity.y = 100
    this.sprite.body.maxVelocity.y = 100
    this.sprite.body.acceleration.y = 50
    this.sprite.body.bounce = 0.5 
  }

  setupCollisions () {
    this.sprite.body.onOverlap = new Phaser.Signal()
    this.sprite.body.onOverlap.add((me, other) => {
      other.type = other.type || ''

      if (other._type === 'weapon') {
        me.health -= other._damage
        other.kill()
      }

      if (me.health <= 0) {
        me.destroy()
      }
    }, this.game)
  }
}
