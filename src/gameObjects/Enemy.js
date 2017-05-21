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
    this.sprite.health = 1
  }

  setupPhysics () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.velocity.y = 100
  }

  setupCollisions () {
    this.sprite.body.onCollide = new Phaser.Signal()
    this.sprite.body.onCollide.add((me, other) => {
      other.type = other.type || ''

      if (other.type === 'weapon') {
        me.health -= other.damage
        other.health = 0
      }

      if (me.health <= 0) {
        me.destroy()
      }
    }, this.game)
  }
}
