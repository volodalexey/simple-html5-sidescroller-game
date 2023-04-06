import { Container, type DisplayObject, ParticleContainer, type Texture } from 'pixi.js'
import { Background, type IBackgroundOptions } from './Background'
import { type IPlayerOptions, Player } from './Player'
import { StatusBar } from './StatusBar'
import { StartModal } from './StartModal'
import { InputHandler } from './InputHandler'
import { EPlayerState } from './playerStates'
import { GroundEnemy, type Enemy, ClimbingEnemy, FlyingEnemy } from './Enemy'
import { type Boom } from './Boom'
import { type FloatingMessage } from './FloatingMessage'
import { type Dust, type Fire } from './Particle'

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
  public enemyTime = 0

  public levelWidth = 100
  static options = {
    maxSpeed: 2,
    maxTime: 50000,
    levelHeight: 500,
    groundMargin: 82,
    winningScore: 25,
    spawnEnemyTime: 1000,
    maxLives: 5
  }

  public lives = Game.options.maxLives

  public player!: Player
  public inputHandler!: InputHandler
  public cityBackground!: Background
  public forestBackground!: Background
  public statusBar!: StatusBar
  public startModal!: StartModal
  public enemyTextures!: IGameOptions['textures']['enemyTextures']
  public enemies = new Container<Enemy>()
  public boomTextures!: IGameOptions['textures']['boomTextures']
  public booms = new Container<Boom>()
  public floatingMessages = new Container<FloatingMessage>()
  public particles = new ParticleContainer(300, { position: true, scale: true })
  public dusts = new ParticleContainer(50, { position: true, scale: true })
  constructor (options: IGameOptions) {
    super()

    this.enemyTextures = options.textures.enemyTextures
    this.boomTextures = options.textures.boomTextures
    this.setup(options)

    this.addEventLesteners()

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

    this.inputHandler = new InputHandler({ eventTarget: this, relativeToTarget: this.player })

    this.addChild(this.enemies)
    this.addChild(this.booms)
    this.addChild(this.floatingMessages)
    this.addChild(this.dusts)
    this.addChild(this.particles)

    this.startModal = new StartModal({ viewWidth, viewHeight })
    this.startModal.visible = false
    this.addChild(this.startModal)
  }

  addEventLesteners (): void {
    this.startModal.on('click', this.startGame)
  }

  cleanFromAll (): void {
    while (this.enemies.children[0] != null) {
      this.enemies.children[0].removeFromParent()
    }
    while (this.booms.children[0] != null) {
      this.booms.children[0].removeFromParent()
    }
    while (this.floatingMessages.children[0] != null) {
      this.floatingMessages.children[0].removeFromParent()
    }
    while (this.dusts.children[0] != null) {
      this.dusts.children[0].removeFromParent()
    }
    while (this.particles.children[0] != null) {
      this.particles.children[0].removeFromParent()
    }
  }

  startGame = (): void => {
    this.startModal.visible = false
    this.gameEnded = false
    this.time = 0
    this.speed = 0
    this.enemyTime = 0
    this.lives = Game.options.maxLives
    this.player.restart()
    this.inputHandler.restart()
    this.cityBackground.visible = true
    this.cityBackground.alpha = 1
    this.forestBackground.visible = false
    this.forestBackground.alpha = 0
    this.statusBar.restart()
    this.cleanFromAll()
  }

  endGame (reason: boolean): void {
    this.gameEnded = true
    this.player.reset()
    this.startModal.visible = true
    this.startModal.reasonText.text = reason ? 'Oh Yeah!!' : 'Oh No!!'
  }

  handleResize (options: {
    viewWidth: number
    viewHeight: number
  }): void {
    this.scale.set(options.viewHeight / this.cityBackground.bgHeight)
    this.levelWidth = Math.floor(options.viewWidth / this.scale.x)
    this.startModal.handleResize({ scaleX: this.scale.x, scaleY: this.scale.y, ...options })
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
    this.statusBar.updateTime(this.time)
    if (this.time > Game.options.maxTime / 2) {
      if (this.cityBackground.alpha > 0.1) {
        this.cityBackground.alpha -= 0.01
        this.forestBackground.visible = true
        this.forestBackground.alpha = 1 - this.cityBackground.alpha
      } else {
        this.cityBackground.visible = false
        this.cityBackground.alpha = 0
        this.forestBackground.visible = true
        this.forestBackground.alpha = 1
      }
    }
    if (this.time > Game.options.maxTime) {
      this.endGame(this.statusBar.score > Game.options.winningScore)
    }
    this.cityBackground.handleUpdate()
    this.forestBackground.handleUpdate()
    this.player.handleUpdate(deltaMS)
    // HANDLE ENEMIES
    if (this.enemyTime > Game.options.spawnEnemyTime) {
      this.addEnemy()
      this.enemyTime = 0
    } else {
      this.enemyTime += deltaMS
    }
    this.enemies.children.forEach((enemy) => {
      enemy.handleUpdate(deltaMS)
    })
    // HANDLE MESSAGES
    this.floatingMessages.children.forEach((message) => {
      message.handleUpdate()
    })
    // HANDLE PARTICLES
    this.dusts.children.forEach((dust) => {
      (dust as Dust).handleUpdate()
    })
    this.particles.children.forEach((fire) => {
      (fire as Fire).handleUpdate()
    })
    // HANDLE COLLISION SPRITES
    this.booms.children.forEach((collision) => {
      collision.handleUpdate(deltaMS)
    })
    this.cleanMarkedForDeletion(this.enemies)
    this.cleanMarkedForDeletion<Dust>(this.dusts)
    this.cleanMarkedForDeletion<Fire>(this.particles)
    this.cleanMarkedForDeletion(this.booms)
    this.cleanMarkedForDeletion(this.floatingMessages)
  }

  cleanMarkedForDeletion<T extends { markedForDeletion: boolean } & DisplayObject = { markedForDeletion: boolean } & DisplayObject>(container: Container<T> | ParticleContainer): void {
    for (let i = 0; i < container.children.length; i++) {
      const floatingMessage: T = container.children[i] as T
      if (floatingMessage.markedForDeletion) {
        floatingMessage.removeFromParent()
        i--
      }
    }
  }

  addEnemy (): void {
    if (this.speed > 0 && Math.random() < 0.5) {
      this.enemies.addChild(new GroundEnemy({
        game: this,
        textures: this.enemyTextures.plantTextures,
        levelBottom: this.getLevelBottom(0),
        levelRight: this.getLevelRight(0)
      }))
    } else if (this.speed > 0) {
      this.enemies.addChild(new ClimbingEnemy({
        game: this,
        textures: this.enemyTextures.spiderTextures,
        levelTop: 0,
        levelBottom: this.getLevelBottom(0),
        levelRight: this.getLevelRight(0)
      }))
    }
    this.enemies.addChild(new FlyingEnemy({
      game: this,
      textures: this.enemyTextures.flyTextures,
      levelTop: 0,
      levelBottom: this.getLevelBottom(0),
      levelRight: this.getLevelRight(0)
    }))
  }
}
