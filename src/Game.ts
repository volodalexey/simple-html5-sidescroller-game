import { Container, type Texture } from 'pixi.js'
import { Background, type IBackgroundOptions } from './Background'
import { type IPlayerOptions, Player } from './Player'
import { StatusBar } from './StatusBar'
import { StartModal } from './StartModal'
import { InputHandler } from './InputHandler'
import { EPlayerState } from './playerStates'

export interface IGameOptions {
  viewWidth: number
  viewHeight: number
  textures: {
    cityTextures: IBackgroundOptions['textures']
    forestTextures: IBackgroundOptions['textures']
    playerTextures: IPlayerOptions['textures']
    enemyTextures: {
      flyTextures: Texture[]
      plantTextures: Texture[]
      spiderTextures: Texture[]
    }
    boomTextures: Texture[]
    fireTexture: Texture
    livesTexture: Texture
  }
}

export class Game extends Container {
  public gameEnded = false
  public speed = 0
  public time = 0

  public levelWidth = 100
  static options = {
    maxSpeed: 2,
    maxTime: 20000,
    levelHeight: 500,
    groundMargin: 82
  }

  public player!: Player
  public inputHandler!: InputHandler
  public cityBackground!: Background
  public forestBackground!: Background
  public statusBar!: StatusBar
  public startModal!: StartModal
  constructor (options: IGameOptions) {
    super()

    this.setup(options)

    this.player.setState(EPlayerState.SITTING)
  }

  setup ({
    viewWidth,
    viewHeight,
    textures: {
      cityTextures,
      forestTextures,
      livesTexture,
      playerTextures
    }
  }: IGameOptions): void {
    const cityBackground = new Background({
      game: this,
      textures: cityTextures
    })
    this.addChild(cityBackground)
    this.cityBackground = cityBackground

    const forestBackground = new Background({
      game: this,
      textures: forestTextures
    })
    forestBackground.visible = false
    this.addChild(forestBackground)
    this.forestBackground = forestBackground

    this.statusBar = new StatusBar({
      textures: { livesTexture }
    })
    this.addChild(this.statusBar)

    this.player = new Player({ game: this, textures: playerTextures })
    this.addChild(this.player)

    this.startModal = new StartModal({ viewWidth, viewHeight })
    this.startModal.visible = false
    this.addChild(this.startModal)

    this.inputHandler = new InputHandler({ eventTarget: this, relativeToTarget: this.player })
  }

  addEventLesteners (): void {
    this.startModal.on('click', this.startGame)
  }

  startGame = (): void => {
    this.startModal.visible = false
    this.gameEnded = false
    this.player.position.set(0, 0)
  }

  endGame (reason: boolean): void {
    this.gameEnded = true
    this.player.reset()
    this.startModal.visible = true
    this.startModal.reasonText.text = reason ? 'You Win' : 'You Lose'
  }

  handleResize (options: {
    viewWidth: number
    viewHeight: number
  }): void {
    this.scale.set(options.viewHeight / this.cityBackground.bgHeight)
    this.levelWidth = Math.floor(options.viewWidth / this.scale.x)
    this.startModal.handleResize(options)
  }

  changeSpeed (speed: number): void {
    this.speed = Game.options.maxSpeed * speed
  }

  getLevelBottom (height: number): number {
    return Game.options.levelHeight - height - Game.options.groundMargin
  }

  getLevelRight (width: number): number {
    return this.levelWidth - width
  }

  handleUpdate (deltaMS: number): void {
    if (this.gameEnded) {
      return
    }
    this.time += deltaMS
    if (this.time > Game.options.maxTime) {
      this.endGame(false)
    }
    this.cityBackground.handleUpdate()
    this.forestBackground.handleUpdate()
    this.player.handleUpdate(deltaMS)
    // HANDLE ENEMIES
    // if (this.enemyTimer > this.enemyInterval) {
    //   this.addEnemy()
    //   this.enemyTimer = 0
    // } else {
    //   this.enemyTimer += deltaTime
    // }
    // this.enemies.forEach((enemy) => {
    //   enemy.update(deltaTime)
    // })
    // // HANDLE MESSAGES
    // this.floatingMessages.forEach((message) => {
    //   message.update()
    // })
    // // HANDLE PARTICLES
    // this.particles.forEach((particle, index) => {
    //   particle.update()
    // })
    // if (this.particles.length > this.maxParticles) {
    //   this.particles.length = this.maxParticles
    // }
    // // HANDLE COLLISION SPRITES
    // this.collisions.forEach((collision, index) => {
    //   collision.update(deltaTime)
    // })
    // this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    // this.particles = this.particles.filter(
    //   (particle) => !particle.markedForDeletion
    // )
    // this.collisions = this.collisions.filter(
    //   (collision) => !collision.markedForDeletion
    // )
    // this.floatingMessages = this.floatingMessages.filter(
    //   (message) => !message.markedForDeletion
    // )
  }
}
