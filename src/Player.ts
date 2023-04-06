import { AnimatedSprite, Container, Graphics, type Texture } from 'pixi.js'
import { Sitting, type PlayerState, EPlayerState, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerStates'
import { type Game } from './Game'
import { logPlayerState } from './logger'
import { Boom } from './Particle'
import { FloatingMessage } from './FloatingMessage'

export interface IPlayerOptions {
  game: Game
  textures: {
    dizzyTextures: Texture[]
    fallTextures: Texture[]
    jumpTextures: Texture[]
    rollTextures: Texture[]
    runTextures: Texture[]
    sitTextures: Texture[]
    standTextures: Texture[]
  }
}

export enum PlayerAnimation {
  dizzy = 'dizzy',
  fall = 'fall',
  jump = 'jump',
  roll = 'roll',
  run = 'run',
  sit = 'sit',
  stand = 'stand',
}

export class Player extends Container {
  public moveSpeed = 8
  public jumpSpeed = 20

  public velocity = {
    vx: 0,
    vy: 0
  }

  public frameTimer = 0

  static fps = 20
  static options = {
    maxSpeed: 10,
    jumpSpeed: 28,
    diveSpeed: 15,
    weight: 1,
    frameInterval: 1000 / Player.fps
  }

  public game!: Game
  public states!: Record<EPlayerState, PlayerState>
  public currentState!: PlayerState
  dizzyAnimation!: AnimatedSprite
  fallAnimation!: AnimatedSprite
  jumpAnimation!: AnimatedSprite
  rollAnimation!: AnimatedSprite
  runAnimation!: AnimatedSprite
  sitAnimation!: AnimatedSprite
  standAnimation!: AnimatedSprite
  public currentAnimation!: AnimatedSprite
  spritesContainer!: Container<AnimatedSprite>
  public playerBox!: Graphics

  constructor (options: IPlayerOptions) {
    super()
    this.game = options.game
    this.setup(options)

    this.states = {
      [EPlayerState.SITTING]: new Sitting({ game: options.game }),
      [EPlayerState.RUNNING]: new Running({ game: options.game }),
      [EPlayerState.JUMPING]: new Jumping({ game: options.game }),
      [EPlayerState.FALLING]: new Falling({ game: options.game }),
      [EPlayerState.ROLLING]: new Rolling({ game: options.game }),
      [EPlayerState.DIVING]: new Diving({ game: options.game }),
      [EPlayerState.HIT]: new Hit({ game: options.game })
    }
    this.currentState = this.states.SITTING
  }

  setup ({
    textures: {
      dizzyTextures,
      fallTextures,
      jumpTextures,
      rollTextures,
      runTextures,
      sitTextures,
      standTextures
    }
  }: IPlayerOptions): void {
    const playerBox = new Graphics()
    this.addChild(playerBox)
    this.playerBox = playerBox

    const spritesContainer = new Container<AnimatedSprite>()
    this.addChild(spritesContainer)
    this.spritesContainer = spritesContainer

    const dizzyAnimation = new AnimatedSprite(dizzyTextures)
    spritesContainer.addChild(dizzyAnimation)
    this.dizzyAnimation = dizzyAnimation

    const fallAnimation = new AnimatedSprite(fallTextures)
    spritesContainer.addChild(fallAnimation)
    this.fallAnimation = fallAnimation

    const jumpAnimation = new AnimatedSprite(jumpTextures)
    spritesContainer.addChild(jumpAnimation)
    this.jumpAnimation = jumpAnimation

    const rollAnimation = new AnimatedSprite(rollTextures)
    spritesContainer.addChild(rollAnimation)
    this.rollAnimation = rollAnimation

    const runAnimation = new AnimatedSprite(runTextures)
    spritesContainer.addChild(runAnimation)
    this.runAnimation = runAnimation

    const sitAnimation = new AnimatedSprite(sitTextures)
    spritesContainer.addChild(sitAnimation)
    this.sitAnimation = sitAnimation

    const standAnimation = new AnimatedSprite(standTextures)
    spritesContainer.addChild(standAnimation)
    this.standAnimation = standAnimation
  }

  hideAllAnimations (): void {
    this.spritesContainer.children.forEach(spr => {
      spr.visible = false
    })
  }

  switchAnimation (animation: PlayerAnimation): void {
    this.hideAllAnimations()
    switch (animation) {
      case PlayerAnimation.dizzy:
        this.currentAnimation = this.dizzyAnimation
        break
      case PlayerAnimation.fall:
        this.currentAnimation = this.fallAnimation
        break
      case PlayerAnimation.jump:
        this.currentAnimation = this.jumpAnimation
        break
      case PlayerAnimation.roll:
        this.currentAnimation = this.rollAnimation
        break
      case PlayerAnimation.run:
        this.currentAnimation = this.runAnimation
        break
      case PlayerAnimation.sit:
        this.currentAnimation = this.sitAnimation
        break
      case PlayerAnimation.stand:
        this.currentAnimation = this.standAnimation
        break
    }
    this.currentAnimation.currentFrame = 0
    this.currentAnimation.visible = true
  }

  setState (state: EPlayerState, speed?: number): void {
    this.currentState = this.states[state]
    if (typeof speed === 'number') {
      this.game.changeSpeed(speed)
    }
    this.currentState.enter()
    logPlayerState(`state=${state}`)
  }

  setMaxXSpeed (sign: -1 | 1 | 0): void {
    this.velocity.vx = Player.options.maxSpeed * sign
  }

  setHalfXSpeed (sign: -1 | 1 | 0): void {
    this.velocity.vx = Player.options.maxSpeed * 0.5 * sign
  }

  jump (): void {
    this.velocity.vy = -Player.options.jumpSpeed
  }

  dive (): void {
    this.velocity.vy = Player.options.diveSpeed
  }

  isOnGround (): boolean {
    return this.y >= this.game.getLevelBottom(this.height)
  }

  isFalling (): boolean {
    return this.velocity.vy > Player.options.weight
  }

  isDizzyCompleted (): boolean {
    return this.dizzyAnimation.currentFrame >= 10
  }

  reset (): void {
    this.velocity.vx = 0
    this.velocity.vy = 0
  }

  handleUpdate (deltaMS: number): void {
    this.checkCollision()
    this.currentState.handleInput()

    const { inputHandler } = this.game
    // HORIZONTAL MOVEMENT
    this.x += this.velocity.vx
    if (inputHandler.hasDirectionLeft() && this.currentState !== this.states[EPlayerState.HIT]) {
      this.velocity.vx = -Player.options.maxSpeed
    } else if (inputHandler.hasDirectionRight()) {
      this.velocity.vx = Player.options.maxSpeed
    } else {
      this.velocity.vx = 0
    }
    if (this.x < 0) {
      this.x = 0
    } else if (this.x > this.game.getLevelRight(this.width)) {
      this.x = this.game.getLevelRight(this.width)
    }

    // VERTICAL MOVEMENT
    this.y += this.velocity.vy
    if (!this.isOnGround()) {
      this.velocity.vy += Player.options.weight
    } else {
      this.velocity.vy = 0
    }

    if (this.y > this.game.getLevelBottom(this.height)) {
      this.y = this.game.getLevelBottom(this.height)
    }

    // SPRITE ANIMATION
    if (this.frameTimer > Player.options.frameInterval) {
      this.frameTimer = 0
      if (this.currentAnimation.currentFrame < this.currentAnimation.totalFrames - 1) {
        this.currentAnimation.currentFrame++
      } else {
        this.currentAnimation.currentFrame = 0
      }
    } else {
      this.frameTimer += deltaMS
    }
  }

  restart (): void {
    this.position.set(0, 0)
    this.velocity.vx = 0
    this.velocity.vy = 0
    this.setState(EPlayerState.SITTING)
  }

  checkCollision (): void {
    this.game.enemies.children.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true
        const boom = new Boom({
          game: this.game,
          textures: this.game.boomTextures
        })
        boom.position.set(enemy.x + enemy.width * 0.5 - boom.width * 0.5, enemy.y + enemy.height * 0.5 - boom.height * 0.5)
        this.game.booms.addChild(boom)
        if (
          this.currentState === this.states[EPlayerState.ROLLING] ||
          this.currentState === this.states[EPlayerState.DIVING]
        ) {
          this.game.statusBar.addScore(1)
          const floatingMessage = new FloatingMessage({
            text: '+1',
            targetX: this.game.statusBar.scoreText.x + this.game.statusBar.scoreText.width,
            targetY: this.game.statusBar.scoreText.y
          })
          floatingMessage.position.set(enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
          this.game.floatingMessages.addChild(floatingMessage)
        } else {
          this.setState(EPlayerState.HIT, 0)
          this.game.statusBar.subScore(1)
          this.game.lives--
          this.game.statusBar.updateLives(this.game.lives)
          if (this.game.lives <= 0) {
            this.game.endGame(false)
          }
        }
      }
    })
  }
}
