import { type Game } from './Game'
import { Dust, Fire, Splash } from './Particle'
import { PlayerAnimation } from './Player'

export enum EPlayerState {
  SITTING = 'SITTING',
  RUNNING = 'RUNNING',
  JUMPING = 'JUMPING',
  FALLING = 'FALLING',
  ROLLING = 'ROLLING',
  DIVING = 'DIVING',
  HIT = 'HIT'
}

interface IPlayerStateOptions {
  game: Game
  state: EPlayerState
}

export class PlayerState {
  public game!: Game
  public state!: EPlayerState
  constructor ({ game, state }: IPlayerStateOptions) {
    this.state = state
    this.game = game
  }

  enter (): void {
    throw new Error('enter() not implemented in child class')
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

interface IPlayerStateChildOptions {
  game: Game
}

export class Sitting extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.SITTING })
  }

  enter (): void {
    const { player } = this.game
    player.setMaxXSpeed(0)
    player.switchAnimation(PlayerAnimation.sit)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionLeft() || inputHandler.hasDirectionRight()) {
      // ignore sitting
      player.setState(EPlayerState.RUNNING, 1)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.ROLLING, 2)
    }
  }
}

export class Running extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.RUNNING })
  }

  enter (): void {
    const { player } = this.game
    player.setMaxXSpeed(-1)
    player.switchAnimation(PlayerAnimation.run)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    const dust = new Dust({ game: this.game })
    dust.position.set(this.game.player.x + 20, this.game.player.y + this.game.player.height - 10)
    this.game.dusts.addChild(dust)
    if (inputHandler.hasDirectionDown() && (!inputHandler.hasDirectionLeft() && !inputHandler.hasDirectionRight())) {
      player.setState(EPlayerState.SITTING, 0)
    } else if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.JUMPING, 1)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.ROLLING, 2)
    }
  }
}

export class Jumping extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.JUMPING })
  }

  enter (): void {
    const { player } = this.game
    if (player.isOnGround()) {
      player.jump()
    }
    player.setHalfXSpeed(-1)
    player.switchAnimation(PlayerAnimation.jump)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (player.isFalling()) {
      player.setState(EPlayerState.FALLING, 1)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.ROLLING, 2)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.DIVING, 2)
    }
  }
}

export class Falling extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.FALLING })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.fall)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (player.isOnGround()) {
      player.setState(EPlayerState.RUNNING, 1)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.DIVING, 2)
    }
  }
}

export class Rolling extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.ROLLING })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.roll)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    const fire = new Fire({
      game: this.game
    })
    fire.position.set(this.game.player.x, this.game.player.y)
    this.game.particles.addChild(fire)
    if (!inputHandler.hasSpecial() && player.isOnGround()) {
      player.setState(EPlayerState.RUNNING, 1)
    } else if (!inputHandler.hasSpecial() && !player.isOnGround()) {
      player.setState(EPlayerState.FALLING, 1)
    } else if (
      inputHandler.hasSpecial() &&
      inputHandler.hasDirectionUp() &&
      player.isOnGround()
    ) {
      player.jump()
    } else if (inputHandler.hasDirectionDown() && !player.isOnGround()) {
      player.setState(EPlayerState.DIVING, 2)
    }
  }
}

export class Diving extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.DIVING })
  }

  enter (): void {
    const { player } = this.game
    player.dive()
    player.switchAnimation(PlayerAnimation.roll)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    const fire = new Fire({
      game: this.game
    })
    fire.position.set(this.game.player.x, this.game.player.y)
    this.game.particles.addChild(fire)
    if (player.isOnGround()) {
      player.setState(EPlayerState.RUNNING, 1)
      for (let i = 0; i < 30; i++) {
        const splash = new Splash({ game: this.game })
        splash.position.set(player.x, player.y + player.height / 2)
        this.game.particles.addChild(splash)
      }
    } else if (inputHandler.hasSpecial() && player.isOnGround()) {
      player.setState(EPlayerState.ROLLING, 2)
    }
  }
}

export class Hit extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.HIT })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.dizzy)
  }

  handleInput (): void {
    const { player } = this.game
    if (player.isDizzyCompleted() && player.isOnGround()) {
      player.setState(EPlayerState.RUNNING, 1)
    } else if (player.isDizzyCompleted() && !player.isOnGround()) {
      player.setState(EPlayerState.FALLING, 2)
    }
  }
}
