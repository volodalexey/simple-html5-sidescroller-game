import { Container, type Texture } from 'pixi.js'
import { type Game } from './Game'
import { Layer } from './Layer'

export interface IBackgroundOptions {
  game: Game
  textures: {
    layer1Texture: Texture
    layer2Texture: Texture
    layer3Texture: Texture
    layer4Texture: Texture
    layer5Texture: Texture
  }
}

export class Background extends Container<Layer> {
  public game!: Game
  public bgWidth = 1667
  public bgHeight = 500
  public layer1!: Layer
  public layer2!: Layer
  public layer3!: Layer
  public layer4!: Layer
  public layer5!: Layer
  constructor (options: IBackgroundOptions) {
    super()
    this.game = options.game

    this.setup(options)

    this.interactive = true
  }

  setup ({
    textures: {
      layer1Texture,
      layer2Texture,
      layer3Texture,
      layer4Texture,
      layer5Texture
    }
  }: IBackgroundOptions): void {
    this.layer1 = new Layer({
      game: this.game,
      layerWidth: this.bgWidth,
      layerHeight: this.bgHeight,
      speedModifier: 0,
      texture: layer1Texture
    })
    this.addChild(this.layer1)
    this.layer2 = new Layer({
      game: this.game,
      layerWidth: this.bgWidth,
      layerHeight: this.bgHeight,
      speedModifier: 0.2,
      texture: layer2Texture
    })
    this.addChild(this.layer2)
    this.layer3 = new Layer({
      game: this.game,
      layerWidth: this.bgWidth,
      layerHeight: this.bgHeight,
      speedModifier: 0.21,
      texture: layer3Texture
    })
    this.addChild(this.layer3)
    this.layer4 = new Layer({
      game: this.game,
      layerWidth: this.bgWidth,
      layerHeight: this.bgHeight,
      speedModifier: 0.7,
      texture: layer4Texture
    })
    this.addChild(this.layer4)
    this.layer5 = new Layer({
      game: this.game,
      layerWidth: this.bgWidth,
      layerHeight: this.bgHeight,
      speedModifier: 1,
      texture: layer5Texture
    })
    this.addChild(this.layer5)
  }

  handleUpdate (): void {
    this.children.forEach(layer => {
      layer.handleUpdate()
    })
  }
}
