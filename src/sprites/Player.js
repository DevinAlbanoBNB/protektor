import Phaser from 'phaser'
import Bullet from '../sprites/Bullet'
import * as Direction from '../constants/Direction'

export default class Player extends Phaser.Sprite {
  constructor (game) {
    let center = { x: game.world.centerX, y: game.world.centerY }
    super(game, center.x, center.y, 'protektor')

    this._direction = Direction.right
    this.health = 5
    this.maxHealth = 5

    this.bullets = this.game.add.group()

    this.game.stage.addChild(this)

    this.setupSprite()
    this.setupPhysics()
    this.setupCollisions()
    this.setupDirectionalInput()
    this.setupShootButton()
  }

  setupSprite () {
    this.anchor.set(0.5)
    this.scale.setTo(2)
  }

  setupPhysics () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
  }

  setupCollisions () {
    this.body.onOverlap = new Phaser.Signal()
    this.body.onOverlap.add((me, other) => {
      other.type = other.type || '' 

      if (other._type === 'enemy') {
        this.damage(other._damage)
        other.kill()
      }
    }, this.game)
  }

  setupDirectionalInput () {
    this.cursors = this.game.input.keyboard.createCursorKeys()

    this.cursors.left.onDown.dispatch = () => {
      this.angle = Direction.left
      this._direction = Direction.left
    }

    this.cursors.right.onDown.dispatch = () => {
      this.angle = Direction.right
      this._direction = Direction.right
    }

    this.cursors.up.onDown.dispatch = () => {
      this.angle = Direction.up 
      this._direction = Direction.up
    }

    this.cursors.down.onDown.dispatch = () => {
      this.angle = Direction.down
      this._direction = Direction.down
    }
  }

  setupShootButton () {
    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.shootButton.onDown.dispatch = () => {
      if (this.bullets.countLiving() < 3) {
        let bullet = new Bullet(this.game, { direction: this._direction })
        this.bullets.add(bullet)
      } else {
        let bullet = this.bullets.getFirstExists(false)
        if (bullet) {
          bullet.reset(this.x, this.y)
        }
      }
    }
  }

  update () {
    this.bullets.forEach((bullet) => bullet.update())
  }
}
