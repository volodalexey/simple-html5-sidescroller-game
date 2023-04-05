import { Container, Sprite, Text, type Texture } from 'pixi.js'

export interface IStatusBarOptions {
  textures: {
    livesTexture: Texture
  }
}

export class StatusBar extends Container {
  static options = {
    inlinePadding: 5,
    padding: 20,
    textColor: 0x000000,
    textColorShadow: 0xffffff,
    textShadowOffset: 1,
    textSize: 30,
    livesScale: 0.4,
    backgroundFill: 0x000000,
    initScore: 0,
    maxLives: 5
  }

  #_score = StatusBar.options.initScore
  public scoreText!: Text
  public scoreTextShadow!: Text
  public timeText!: Text
  public timeTextShadow!: Text
  public livesContainer!: Container

  constructor (options: IStatusBarOptions) {
    super()
    this.setup(options)
  }

  get score (): number {
    return this.#_score
  }

  setup ({ textures: { livesTexture } }: IStatusBarOptions): void {
    const {
      options: {
        padding, inlinePadding, maxLives,
        livesScale, textSize, textColor, textShadowOffset, textColorShadow
      }
    } = StatusBar

    const scoreTextShadow = new Text(`Score: ${this.#_score}`, {
      fontSize: textSize,
      fill: textColorShadow
    })
    scoreTextShadow.position.set(padding, padding)
    this.addChild(scoreTextShadow)
    this.scoreTextShadow = scoreTextShadow
    const scoreText = new Text(`Score: ${this.#_score}`, {
      fontSize: textSize,
      fill: textColor
    })
    scoreText.position.set(padding + textShadowOffset, padding + textShadowOffset)
    this.addChild(scoreText)
    this.scoreText = scoreText

    const timeTextShadow = new Text('Time: 0.0', {
      fontSize: textSize * 0.8,
      fill: textColorShadow
    })
    timeTextShadow.position.set(scoreTextShadow.x, scoreTextShadow.y + scoreTextShadow.height)
    this.addChild(timeTextShadow)
    this.timeTextShadow = timeTextShadow
    const timeText = new Text('Time: 0.0', {
      fontSize: textSize * 0.8,
      fill: textColor
    })
    timeText.position.set(scoreText.x, scoreText.y + scoreText.height)
    this.addChild(timeText)
    this.timeText = timeText

    const livesContainer = new Container()
    livesContainer.position.set(timeText.x, timeText.y + timeText.height)
    this.addChild(livesContainer)
    this.livesContainer = livesContainer

    for (let i = 0; i < maxLives; i++) {
      const livesIcon = new Sprite(livesTexture)
      livesIcon.position.set(i * (inlinePadding + livesTexture.width * livesScale), 0)
      livesIcon.scale.set(livesScale)
      livesContainer.addChild(livesIcon)
    }
  }

  addScore (addScore: number): void {
    this.#_score += Math.round(addScore)
    this.updateScore()
  }

  subScore (subScore: number): void {
    this.#_score -= subScore
    this.updateScore()
  }

  private updateScore (): void {
    this.scoreText.text = `Score: ${this.#_score}`
    this.scoreTextShadow.text = `Score: ${this.#_score}`
  }

  updateTime (time: number): void {
    const timeTxt = (time * 0.001).toFixed(1)
    this.timeText.text = `Time: ${timeTxt}`
    this.timeTextShadow.text = `Time: ${timeTxt}`
  }

  updateLives (lives: number): void {
    this.livesContainer.children.forEach((icon, i) => {
      icon.visible = i < lives
    })
  }

  restart (): void {
    this.#_score = StatusBar.options.initScore
    this.updateScore()
    this.updateTime(0)
    this.updateLives(StatusBar.options.maxLives)
  }
}
