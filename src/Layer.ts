import { type Texture, TilingSprite } from 'pixi.js'
import { type Game } from './Game'

export interface ILayerOptions {
  game: Game
  speedModifier: number
  layerWidth: number
  layerHeight: number
  texture: Texture
}

export class Layer extends TilingSprite {
  public game!: Game
  public speedModifier!: number
  constructor ({ game, texture, layerWidth, layerHeight, speedModifier }: ILayerOptions) {
    super(texture, layerWidth, layerHeight)
    this.game = game
    this.speedModifier = speedModifier
  }

  handleUpdate (): void {
    if (this.tilePosition.x < -this.width) {
      this.tilePosition.x = 0
    } else {
      this.tilePosition.x -= this.game.speed * this.speedModifier
    }
  }
}
