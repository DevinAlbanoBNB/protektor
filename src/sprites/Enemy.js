import Phaser from 'phaser'
import * as Direction from '../constants/Direction'

export default class Enemy extends Phaser.Sprite {
  constructor (game, stats) {
    let coordinates = Enemy.getCoordinates(game, stats.direction)
    super(game, coordinates.x, coordinates.y, stats.id)

    this.setStats(stats)

    this.game.stage.addChild(this)

    this.setupSprite()
    this.setupPhysics()
  }

  static getCoordinates (game, direction) {
    let center = { x: game.world.centerX, y: game.world.centerY }
    let spawnCoordinates = { x: center.x, y: center.y * 2 }

    if (direction === Direction.up) {
      spawnCoordinates = { x: center.x, y: center.y * 2 }
    }
    if (direction === Direction.down) {
      spawnCoordinates = { x: center.x, y: 0 }
    }
    if (direction === Direction.right) {
      spawnCoordinates = { x: 0, y: center.y }
    }
    if (direction === Direction.left) {
      spawnCoordinates = { x: center.x * 2, y: center.y }
    }

    return spawnCoordinates
  }

  setStats (stats) {
    this._damage = stats.damage || 1
    this._health = stats.health || 1
    this.health = stats.health || 1
    this.maxHealth = stats.health || 1
    this._speed = stats.speed || 200
    this._direction = stats.direction
    this._type = stats.type || 'enemy'
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
  }
}
