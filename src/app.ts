import './styles.css'
import { SceneManager } from './SceneManager'
import { MainScene } from './MainScene'
import { LoaderScene } from './LoaderScene'

async function run (): Promise<void> {
  const ellipsis: HTMLElement | null = document.querySelector('.ellipsis')
  if (ellipsis != null) {
    ellipsis.style.display = 'none'
  }
  await SceneManager.initialize()
  const loaderScene = new LoaderScene({
    viewWidth: SceneManager.width,
    viewHeight: SceneManager.height
  })
  await SceneManager.changeScene(loaderScene)
  await loaderScene.initializeLoader()
  const { citySpritesheet, forestSpritesheet, spritesheet: { textures, animations } } = loaderScene.getAssets()
  await SceneManager.changeScene(new MainScene({
    app: SceneManager.app,
    viewWidth: SceneManager.width,
    viewHeight: SceneManager.height,
    textures: {
      cityTextures: {
        layer1Texture: citySpritesheet.textures['City-Layer-1.png'],
        layer2Texture: citySpritesheet.textures['City-Layer-2.png'],
        layer3Texture: citySpritesheet.textures['City-Layer-3.png'],
        layer4Texture: citySpritesheet.textures['City-Layer-4.png'],
        layer5Texture: citySpritesheet.textures['City-Layer-5.png']
      },
      forestTextures: {
        layer1Texture: forestSpritesheet.textures['Forest-Layer-1.png'],
        layer2Texture: forestSpritesheet.textures['Forest-Layer-2.png'],
        layer3Texture: forestSpritesheet.textures['Forest-Layer-3.png'],
        layer4Texture: forestSpritesheet.textures['Forest-Layer-4.png'],
        layer5Texture: forestSpritesheet.textures['Forest-Layer-5.png']
      },
      playerTextures: {
        dizzyTextures: animations['Dog-Dizzy'],
        fallTextures: animations['Dog-Fall'],
        jumpTextures: animations['Dog-Jump'],
        rollTextures: animations['Dog-Roll'],
        runTextures: animations['Dog-Run'],
        sitTextures: animations['Dog-Sit'],
        standTextures: animations['Dog-Stand']
      },
      enemyTextures: {
        flyTextures: animations.Fly,
        plantTextures: animations.Plant,
        spiderTextures: animations.Spider
      },
      boomTextures: animations.Boom,
      fireTexture: textures['Fire.png'],
      livesTexture: textures['Lives.png']
    }
  }))
}

run().catch((err) => {
  console.error(err)
  const errorMessageDiv: HTMLElement | null = document.querySelector('.error-message')
  if (errorMessageDiv != null) {
    errorMessageDiv.classList.remove('hidden')
    errorMessageDiv.innerText = ((Boolean(err)) && (Boolean(err.message))) ? err.message : err
  }
  const errorStackDiv: HTMLElement | null = document.querySelector('.error-stack')
  if (errorStackDiv != null) {
    errorStackDiv.classList.remove('hidden')
    errorStackDiv.innerText = ((Boolean(err)) && (Boolean(err.stack))) ? err.stack : ''
  }
  const canvas: HTMLCanvasElement | null = document.querySelector('canvas')
  if (canvas != null) {
    canvas.parentElement?.removeChild(canvas)
  }
})
