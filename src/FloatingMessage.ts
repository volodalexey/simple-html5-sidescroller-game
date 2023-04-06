import { Container, Text } from 'pixi.js'

export interface IFloatingMessageOptions {
  text: string
  targetX: number
  targetY: number
}

export class FloatingMessage extends Container {
  public timer = 0
  public markedForDeletion = false
  public targetX!: number
  public targetY!: number
  public mainText!: Text
  public shadowText!: Text

  static options = {
    fontFamily: 'Helvetica',
    textColor: 0x000000,
    textColorShadow: 0xffffff,
    textShadowOffset: 1,
    textSize: 30
  }

  constructor ({ text, targetX, targetY }: IFloatingMessageOptions) {
    super()
    this.targetX = targetX
    this.targetY = targetY
    const { textColor, textColorShadow, textShadowOffset, textSize, fontFamily } = FloatingMessage.options

    const scoreTextShadow = new Text(text, {
      fontSize: textSize,
      fontFamily,
      fill: textColorShadow
    })
    this.addChild(scoreTextShadow)
    this.shadowText = scoreTextShadow
    const mainText = new Text(text, {
      fontSize: textSize,
      fontFamily,
      fill: textColor
    })
    mainText.position.set(textShadowOffset, textShadowOffset)
    this.addChild(mainText)
    this.mainText = mainText
  }

  handleUpdate (): void {
    this.x += (this.targetX - this.x) * 0.03
    this.y += (this.targetY - this.y) * 0.03
    this.timer++
    if (this.timer > 100) this.markedForDeletion = true
  }
}
