import Phaser from 'phaser'
import Bullet from '../sprites/Bullet'
import * as Direction from '../constants/Direction'

export default class Player {
  constructor (game) {
    this.game = game
    this.direction = Direction.right
    this.health = 5

    this.bullets = this.game.add.group()

    this.setupSprite()
    this.setupPhysics()
    this.setupCollisions()
    this.setupDirectionalInput()
    this.setupShootButton()
  }

  setupSprite () {
    this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'protektor')
    this.sprite.anchor.set(0.5)
    this.sprite.scale.setTo(2)
  }

  setupPhysics () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.immovable = true
  }

  setupCollisions () {
    this.sprite.body.onCollide = new Phaser.Signal()
    this.sprite.body.onCollide.add((me, other) => {
      other.type = other.type || '' 

      if (other.type === 'enemy') {
        this.health -= other.damage  
        other.health = 0
      }
    }, this.game)
  }

  setupDirectionalInput () {
    this.cursors = this.game.input.keyboard.createCursorKeys()

    this.cursors.left.onDown.dispatch = () => {
      this.sprite.angle = Direction.left
      this.direction = Direction.left
    }

    this.cursors.right.onDown.dispatch = () => {
      this.sprite.angle = Direction.right
      this.direction = Direction.right
    }

    this.cursors.up.onDown.dispatch = () => {
      this.sprite.angle = Direction.up 
      this.direction = Direction.up
    }

    this.cursors.down.onDown.dispatch = () => {
      this.sprite.angle = Direction.down
      this.direction = Direction.down
    }
  }

  setupShootButton () {
    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.shootButton.onDown.dispatch = () => {
      let bullet = new Bullet(this.game, { direction: this.direction })
      this.bullets.add(bullet)
    }
  }
}
