import { AnimatedSprite, type Texture } from 'pixi.js'
import { type Game } from './Game'

export interface IBoomOptions {
  game: Game
  textures: Texture[]
}

export class Boom extends AnimatedSprite {
  public markedForDeletion = false
  public frameTimer = 0

  public fps = 20
  public frameInterval!: number
  public game!: Game
  constructor ({ game, textures }: IBoomOptions) {
    super(textures)
    this.game = game
    this.fps = Math.random() * 10 + 5
    this.frameInterval = 1000 / this.fps
  }

  handleUpdate (deltaMS: number): void {
    this.x -= this.game.speed
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.currentFrame < this.totalFrames - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    } else {
      this.frameTimer += deltaMS
    }

    if (this.currentFrame >= this.totalFrames - 1) {
      this.markedForDeletion = true
    }
  }
}
