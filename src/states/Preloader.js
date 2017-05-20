import Phaser from 'phaser'

export default class Preloader extends Phaser.State {
  constructor () {
    super()

    this.loader = null
  }

  getAssets (assetType) {
    let jsonText = this.game.cache.getText(assetType)
    return JSON.parse(jsonText)
  }

  loadImages () {
    let imageAssets = this.getAssets('imageAssets')

    imageAssets.forEach((image) => {
      this.load.image(image.id, image.source)
    })
  }

  preload () {
    // These are the assets we loaded in Boot.js
    this.loader = this.add.sprite(this.world.centerX, this.world.centerY, 'loaderBar')
    this.loader.anchor.setTo(0.5)

    // Sets a basic loading bar
    this.load.setPreloadSprite(this.loader)

    // Load any assets for the game here
    this.loadImages()
  }

  create () {
    this.state.start('Title')
  }
}
