import Phaser from 'phaser'

export default class Bullet {
  constructor (game, direction, speed, type) {
    this.game = game
    this.direction = direction
    this.speed = speed
    this.type = type
    this.damage = 1

    this.setupSprite()
    this.setupPhysics()
  }

  setupSprite () {
    this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bullet')
    this.sprite.anchor.set(0.5)
    this.sprite.scale.setTo(2)
    this.sprite.events.onKilled.add(() => {
      this.sprite.destroy()
    }, this.game)
  }

  setupPhysics () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.game.physics.arcade.velocityFromAngle(this.direction, this.speed, this.sprite.body.velocity)
    this.sprite.outOfBoundsKill = true
    this.sprite.checkWorldBounds = true
  }
}
