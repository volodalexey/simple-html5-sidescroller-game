import { Graphics, Sprite, type Texture } from 'pixi.js'
import { type Game } from './Game'

interface IParticleOptions {
  game: Game
  texture: Texture
}

class Particle extends Sprite {
  public markedForDeletion = false

  public velocity = {
    vx: 0,
    vy: 0
  }

  public game!: Game

  constructor ({ game, texture }: IParticleOptions) {
    super(texture)
    this.game = game
  }

  handleUpdate (): void {
    this.x -= this.velocity.vx + this.game.speed
    this.y -= this.velocity.vy
    this.width *= 0.95
    this.height *= 0.95
    if (this.width < 0.5 || this.height < 0.5) {
      this.markedForDeletion = true
    }
  }
}

interface IParticleChildOptions {
  game: Game
}

export class Dust extends Particle {
  static texturesCache: Texture
  static options = {
    fillColor: 0x000000,
    renderRadius: 100
  }

  constructor ({ game }: IParticleChildOptions) {
    super({ game, texture: Dust.texturesCache })
    this.width = this.height = Math.random() * 10 + 10
    this.velocity.vx = Math.random()
    this.velocity.vy = Math.random()
  }

  static prepareGraphics (): Graphics {
    const graphics = new Graphics()
    graphics.beginFill(Dust.options.fillColor)
    graphics.drawCircle(0, 0, Dust.options.renderRadius)
    graphics.endFill()
    graphics.cacheAsBitmap = true
    graphics.alpha = 0.2
    return graphics
  }
}

export class Splash extends Particle {
  static texturesCache: Texture
  static options = {
    gravity: 0.1
  }

  constructor ({ game }: IParticleChildOptions) {
    super({ game, texture: Splash.texturesCache })
    this.width = Math.random() * 100 + 100
    this.velocity.vx = Math.random() * 6 - 4
    this.velocity.vy = Math.random() * 2 + 1
  }

  handleUpdate (): void {
    this.velocity.vy -= Splash.options.gravity
    super.handleUpdate()
  }
}

export class Fire extends Particle {
  static texturesCache: Texture
  public va = 0
  constructor ({ game }: IParticleChildOptions) {
    super({ game, texture: Fire.texturesCache })
    this.width = Math.random() * 100 + 50
    this.velocity.vx = 1
    this.velocity.vy = 1
    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
  }

  handleUpdate (): void {
    super.handleUpdate()
    this.angle += this.va
    this.x += Math.sin(this.angle * 10)
  }
}
