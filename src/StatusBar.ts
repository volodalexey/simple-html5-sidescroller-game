import { Container, Sprite, Text, type Texture } from 'pixi.js'

export interface IStatusBarOptions {
  textures: {
    livesTexture: Texture
  }
}

export class StatusBar extends Container {
  static options = {
    inlinePadding: 10,
    padding: 20,
    textColor: 0xffffff,
    textSize: 24,
    textStroke: 2,
    livesScale: 1,
    backgroundFill: 0x000000,
    initScore: 0
  }

  #_score = StatusBar.options.initScore
  public scoreText!: Text
  public livesIcon!: Sprite

  constructor (options: IStatusBarOptions) {
    super()
    this.setup(options)
  }

  get score (): number {
    return this.#_score
  }

  setup ({ textures: { livesTexture } }: IStatusBarOptions): void {
    const { options: { padding, livesScale, textSize, textColor, textStroke } } = StatusBar

    const livesIcon = new Sprite(livesTexture)
    livesIcon.position.set(padding, padding)
    livesIcon.scale.set(livesScale)
    this.addChild(livesIcon)
    this.livesIcon = livesIcon

    const scoreText = new Text(`Score: ${this.#_score}`, {
      fontSize: textSize,
      fill: textColor,
      stroke: textStroke
    })
    scoreText.position.set(0, padding)
    this.addChild(scoreText)
    this.scoreText = scoreText
  }

  addScore (addScore: number): void {
    this.#_score += Math.round(addScore)
  }

  subScore (subScore: number): void {
    this.#_score -= subScore
  }

  restart (): void {
    this.#_score = StatusBar.options.initScore
    this.scoreText.text = `Score: ${this.#_score}`
  }
}
