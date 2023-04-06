import { type Application, Container } from 'pixi.js'
import { type IScene } from './SceneManager'
import { Game, type IGameOptions } from './Game'
import { Dust, Fire, Splash } from './Particle'

interface IMainSceneOptions {
  app: Application
  viewWidth: number
  viewHeight: number
  textures: IGameOptions['textures']
}

export class MainScene extends Container implements IScene {
  public gravity = 0.7
  public gameEnded = false

  public game!: Game

  constructor (options: IMainSceneOptions) {
    super()

    this.prepareTextures(options)
    this.setup(options)
  }

  setup ({ viewWidth, viewHeight, textures }: IMainSceneOptions): void {
    const game = new Game({
      viewWidth,
      viewHeight,
      textures
    })
    this.addChild(game)
    this.game = game
  }

  handleResize (options: {
    viewWidth: number
    viewHeight: number
  }): void {
    this.game.handleResize(options)
  }

  handleUpdate (deltaMS: number): void {
    this.game.handleUpdate(deltaMS)
  }

  prepareTextures (options: IMainSceneOptions): void {
    const graphics = Dust.prepareGraphics()
    Dust.texturesCache = options.app.renderer.generateTexture(graphics)

    Splash.texturesCache = options.textures.fireTexture
    Fire.texturesCache = options.textures.fireTexture
  }
}
