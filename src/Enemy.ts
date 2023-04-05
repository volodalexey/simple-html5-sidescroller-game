import { AnimatedSprite, Graphics, type Texture } from 'pixi.js'
import { type Game } from './Game'

export interface IEnemyOptions {
  game: Game
  textures: Texture[]
}

export class Enemy extends AnimatedSprite {
  public markedForDeletion = false
  public frameTimer = 0

  static fps = 20
  static options = {
    frameInterval: 1000 / Enemy.fps
  }

  public velocity = {
    vx: 0,
    vy: 0
  }

  public game!: Game

  constructor ({ game, textures }: IEnemyOptions) {
    super(textures)
    this.game = game
  }

  handleUpdate (deltaMS: number): void {
    this.x -= this.velocity.vx + this.game.speed
    this.y += this.velocity.vy
    if (this.frameTimer > Enemy.options.frameInterval) {
      this.frameTimer = 0
      if (this.currentFrame < this.totalFrames - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    } else {
      this.frameTimer += deltaMS
    }

    if (this.x + this.width < 0) this.markedForDeletion = true
  }
}

export interface IFlyingEnemyOptions {
  game: Game
  textures: Texture[]
  levelTop: number
  levelBottom: number
  levelRight: number
}

export class FlyingEnemy extends Enemy {
  public moveAngle = 0
  public va = 0
  constructor (options: IFlyingEnemyOptions) {
    super(options)
    this.x = options.levelRight + Math.random() * options.levelRight * 0.5
    this.y = Math.random() * (options.levelBottom - options.levelTop) * 0.5
    this.velocity.vx = Math.random() + 1
    this.velocity.vy = 0
    this.va = Math.sin(this.moveAngle) * 0.1 + 0.1
  }

  handleUpdate (deltaMS: number): void {
    super.handleUpdate(deltaMS)
    this.angle += this.va
    this.y += Math.sin(this.angle)
  }
}

export interface IGroundEnemyOptions {
  game: Game
  textures: Texture[]
  levelBottom: number
  levelRight: number
}

export class GroundEnemy extends Enemy {
  constructor (options: IGroundEnemyOptions) {
    super(options)
    this.x = options.levelRight
    this.y = options.levelBottom - this.height
  }
}

export interface IClimbingEnemyOptions {
  game: Game
  textures: Texture[]
  levelTop: number
  levelBottom: number
  levelRight: number
}

export class ClimbingEnemy extends Enemy {
  constructor (options: IClimbingEnemyOptions) {
    super(options)
    this.x = options.levelRight
    this.y = Math.random() * (options.levelBottom - options.levelTop) * 0.5
    this.velocity.vx = 0
    this.velocity.vy = Math.random() > 0.5 ? 1 : -1

    const netRope = new Graphics()
    netRope.lineStyle(1, 0x000000)
    netRope.moveTo(this.width / 2, this.height / 2 - 25)
    netRope.lineTo(this.width / 2, -(options.levelBottom - options.levelTop))
    this.addChild(netRope)
  }

  handleUpdate (deltaMS: number): void {
    super.handleUpdate(deltaMS)
    if (this.y > this.game.getLevelBottom(this.height)) {
      this.velocity.vy *= -1
    }
    if (this.y < -this.height) this.markedForDeletion = true
  }
}
