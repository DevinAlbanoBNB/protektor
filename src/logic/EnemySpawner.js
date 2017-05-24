import Pattern from './Pattern'

/**
 * Reads level data from a JSON file and creates patterns.
 **/
export default class EnemySpawner {
  constructor (stage, levelId) {
    console.log(levelId)
    this.stage = stage
    this.game = stage.game

    let jsonText = this.game.cache.getText(levelId)
    this.levelData = JSON.parse(jsonText)

    this.createPatterns()
  }

  createPatterns () {
    this.levelData.forEach((patternData) => {
      let pattern = new Pattern(this.stage, patternData)
      pattern.run()
    })
  }
}
