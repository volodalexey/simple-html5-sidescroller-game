(()=>{"use strict";var e,t={7279:(e,t,i)=>{i.r(t)},6061:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Background=t.Layer=void 0;const s=i(8687);class a extends s.TilingSprite{constructor({game:e,texture:t,layerWidth:i,layerHeight:s,speedModifier:a}){super(t,i,s),this.game=e,this.speedModifier=a}handleUpdate(){this.tilePosition.x<-this.width?this.tilePosition.x=0:this.tilePosition.x-=this.game.speed*this.speedModifier}}t.Layer=a;class n extends s.Container{constructor(e){super(),this.bgWidth=1667,this.bgHeight=500,this.game=e.game,this.setup(e),this.interactive=!0}setup({textures:{layer1Texture:e,layer2Texture:t,layer3Texture:i,layer4Texture:s,layer5Texture:n}}){this.layer1=new a({game:this.game,layerWidth:this.bgWidth,layerHeight:this.bgHeight,speedModifier:0,texture:e}),this.addChild(this.layer1),this.layer2=new a({game:this.game,layerWidth:this.bgWidth,layerHeight:this.bgHeight,speedModifier:.2,texture:t}),this.addChild(this.layer2),this.layer3=new a({game:this.game,layerWidth:this.bgWidth,layerHeight:this.bgHeight,speedModifier:.21,texture:i}),this.addChild(this.layer3),this.layer4=new a({game:this.game,layerWidth:this.bgWidth,layerHeight:this.bgHeight,speedModifier:.7,texture:s}),this.addChild(this.layer4),this.layer5=new a({game:this.game,layerWidth:this.bgWidth,layerHeight:this.bgHeight,speedModifier:1,texture:n}),this.addChild(this.layer5)}handleUpdate(){this.children.forEach((e=>{e.handleUpdate()}))}}t.Background=n},6854:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Boom=void 0;const s=i(8687);class a extends s.AnimatedSprite{constructor({game:e,textures:t}){super(t),this.markedForDeletion=!1,this.frameTimer=0,this.fps=20,this.game=e,this.fps=10*Math.random()+5,this.frameInterval=1e3/this.fps}handleUpdate(e){this.x-=this.game.speed,this.frameTimer>this.frameInterval?(this.frameTimer=0,this.currentFrame<this.totalFrames-1?this.currentFrame++:this.currentFrame=0):this.frameTimer+=e,this.currentFrame>=this.totalFrames-1&&(this.markedForDeletion=!0)}}t.Boom=a},9986:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ClimbingEnemy=t.GroundEnemy=t.FlyingEnemy=t.Enemy=void 0;const s=i(8687);class a extends s.AnimatedSprite{constructor({game:e,textures:t}){super(t),this.markedForDeletion=!1,this.frameTimer=0,this.velocity={vx:0,vy:0},this.game=e}handleUpdate(e){this.x-=this.velocity.vx+this.game.speed,this.y+=this.velocity.vy,this.frameTimer>a.options.frameInterval?(this.frameTimer=0,this.currentFrame<this.totalFrames-1?this.currentFrame++:this.currentFrame=0):this.frameTimer+=e,this.x+this.width<0&&(this.markedForDeletion=!0)}}a.fps=20,a.options={frameInterval:1e3/a.fps},t.Enemy=a,t.FlyingEnemy=class extends a{constructor(e){super(e),this.moveAngle=0,this.va=0,this.x=e.levelRight+Math.random()*e.levelRight*.5,this.y=Math.random()*(e.levelBottom-e.levelTop)*.5,this.velocity.vx=Math.random()+1,this.velocity.vy=0,this.va=.1*Math.sin(this.moveAngle)+.1}handleUpdate(e){super.handleUpdate(e),this.angle+=this.va,this.y+=Math.sin(this.angle)}},t.GroundEnemy=class extends a{constructor(e){super(e),this.x=e.levelRight,this.y=e.levelBottom-this.height}},t.ClimbingEnemy=class extends a{constructor(e){super(e),this.x=e.levelRight,this.y=Math.random()*(e.levelBottom-e.levelTop)*.5,this.velocity.vx=0,this.velocity.vy=Math.random()>.5?1:-1;const t=new s.Graphics;t.lineStyle(1,0),t.moveTo(this.width/2,this.height/2-25),t.lineTo(this.width/2,-(e.levelBottom-e.levelTop)),this.addChild(t)}handleUpdate(e){super.handleUpdate(e),this.y>this.game.getLevelBottom(this.height)&&(this.velocity.vy*=-1),this.y<-this.height&&(this.markedForDeletion=!0)}}},1660:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FloatingMessage=void 0;const s=i(8687);class a extends s.Container{constructor({text:e,targetX:t,targetY:i}){super(),this.timer=0,this.markedForDeletion=!1,this.targetX=t,this.targetY=i;const{textColor:n,textColorShadow:r,textShadowOffset:o,textSize:h,fontFamily:l}=a.options,d=new s.Text(e,{fontSize:h,fontFamily:l,fill:r});this.addChild(d),this.shadowText=d;const c=new s.Text(e,{fontSize:h,fontFamily:l,fill:n});c.position.set(o,o),this.addChild(c),this.mainText=c}handleUpdate(){this.x+=.03*(this.targetX-this.x),this.y+=.03*(this.targetY-this.y),this.timer++,this.timer>100&&(this.markedForDeletion=!0)}}a.options={fontFamily:"Helvetica",textColor:0,textColorShadow:16777215,textShadowOffset:1,textSize:30},t.FloatingMessage=a},9221:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const s=i(8687),a=i(6061),n=i(4778),r=i(8554),o=i(6879),h=i(1664),l=i(4181),d=i(9986);class c extends s.Container{constructor(e){super(),this.gameEnded=!1,this.speed=0,this.time=0,this.enemyTime=0,this.levelWidth=100,this.lives=c.options.maxLives,this.enemies=new s.Container,this.booms=new s.Container,this.floatingMessages=new s.Container,this.particles=new s.ParticleContainer(300,{position:!0,scale:!0}),this.dusts=new s.ParticleContainer(50,{position:!0,scale:!0}),this.startGame=()=>{this.startModal.visible=!1,this.gameEnded=!1,this.time=0,this.speed=0,this.enemyTime=0,this.lives=c.options.maxLives,this.player.restart(),this.inputHandler.restart(),this.cityBackground.visible=!0,this.cityBackground.alpha=1,this.forestBackground.visible=!1,this.forestBackground.alpha=0,this.statusBar.restart(),this.cleanFromAll()},this.enemyTextures=e.textures.enemyTextures,this.boomTextures=e.textures.boomTextures,this.setup(e),this.addEventLesteners(),this.player.setState(l.EPlayerState.SITTING)}setup({viewWidth:e,viewHeight:t,textures:{cityTextures:i,forestTextures:s,livesTexture:l,playerTextures:d}}){const c=new a.Background({game:this,textures:i});this.addChild(c),this.cityBackground=c;const p=new a.Background({game:this,textures:s});p.visible=!1,this.addChild(p),this.forestBackground=p,this.statusBar=new r.StatusBar({textures:{livesTexture:l}}),this.addChild(this.statusBar),this.player=new n.Player({game:this,textures:d}),this.addChild(this.player),this.inputHandler=new h.InputHandler({eventTarget:this,relativeToTarget:this.player}),this.addChild(this.enemies),this.addChild(this.booms),this.addChild(this.floatingMessages),this.addChild(this.dusts),this.addChild(this.particles),this.startModal=new o.StartModal({viewWidth:e,viewHeight:t}),this.startModal.visible=!1,this.addChild(this.startModal)}addEventLesteners(){this.startModal.on("click",this.startGame)}cleanFromAll(){for(;null!=this.enemies.children[0];)this.enemies.children[0].removeFromParent();for(;null!=this.booms.children[0];)this.booms.children[0].removeFromParent();for(;null!=this.floatingMessages.children[0];)this.floatingMessages.children[0].removeFromParent();for(;null!=this.dusts.children[0];)this.dusts.children[0].removeFromParent();for(;null!=this.particles.children[0];)this.particles.children[0].removeFromParent()}endGame(e){this.gameEnded=!0,this.player.reset(),this.startModal.visible=!0,this.startModal.reasonText.text=e?"Oh Yeah!!":"Oh No!!"}handleResize(e){this.scale.set(e.viewHeight/this.cityBackground.bgHeight),this.levelWidth=Math.floor(e.viewWidth/this.scale.x),this.startModal.handleResize({scaleX:this.scale.x,scaleY:this.scale.y,...e})}changeSpeed(e){this.speed=c.options.maxSpeed*e}getLevelBottom(e){return c.options.levelHeight-e-c.options.groundMargin}getLevelRight(e){return this.levelWidth-e}handleUpdate(e){this.gameEnded||(this.time+=e,this.statusBar.updateTime(this.time),this.time>c.options.maxTime/2&&(this.cityBackground.alpha>.1?(this.cityBackground.alpha-=.01,this.forestBackground.visible=!0,this.forestBackground.alpha=1-this.cityBackground.alpha):(this.cityBackground.visible=!1,this.cityBackground.alpha=0,this.forestBackground.visible=!0,this.forestBackground.alpha=1)),this.time>c.options.maxTime&&this.endGame(this.statusBar.score>c.options.winningScore),this.cityBackground.handleUpdate(),this.forestBackground.handleUpdate(),this.player.handleUpdate(e),this.enemyTime>c.options.spawnEnemyTime?(this.addEnemy(),this.enemyTime=0):this.enemyTime+=e,this.enemies.children.forEach((t=>{t.handleUpdate(e)})),this.floatingMessages.children.forEach((e=>{e.handleUpdate()})),this.dusts.children.forEach((e=>{e.handleUpdate()})),this.particles.children.forEach((e=>{e.handleUpdate()})),this.booms.children.forEach((t=>{t.handleUpdate(e)})),this.cleanMarkedForDeletion(this.enemies),this.cleanMarkedForDeletion(this.dusts),this.cleanMarkedForDeletion(this.particles),this.cleanMarkedForDeletion(this.booms),this.cleanMarkedForDeletion(this.floatingMessages))}cleanMarkedForDeletion(e){for(let t=0;t<e.children.length;t++){const i=e.children[t];i.markedForDeletion&&(i.removeFromParent(),t--)}}addEnemy(){this.speed>0&&Math.random()<.5?this.enemies.addChild(new d.GroundEnemy({game:this,textures:this.enemyTextures.plantTextures,levelBottom:this.getLevelBottom(0),levelRight:this.getLevelRight(0)})):this.speed>0&&this.enemies.addChild(new d.ClimbingEnemy({game:this,textures:this.enemyTextures.spiderTextures,levelTop:0,levelBottom:this.getLevelBottom(0),levelRight:this.getLevelRight(0)})),this.enemies.addChild(new d.FlyingEnemy({game:this,textures:this.enemyTextures.flyTextures,levelTop:0,levelBottom:this.getLevelBottom(0),levelRight:this.getLevelRight(0)}))}}c.options={maxSpeed:2,maxTime:5e4,levelHeight:500,groundMargin:82,winningScore:25,spawnEnemyTime:1e3,maxLives:5},t.Game=c},1664:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.InputHandler=void 0;const s=i(5473);t.InputHandler=class{constructor({eventTarget:e,relativeToTarget:t,interactiveChildren:i=!1}){this.pointerXDown=null,this.pointerYDown=null,this.pointerSpecial=!1,this.handlePointerDown=e=>{this.handlePlayerMove(!0,e)},this.handlePointerMove=e=>{this.handlePlayerMove(void 0,e)},this.handlePointerUp=e=>{this.handlePlayerMove(!1,e)},this.handleKeyDown=e=>{switch((0,s.logKeydown)(`${e.code} ${e.key}`),e.code){case"KeyW":case"ArrowUp":this.applyUpDirection(!0);break;case"KeyA":case"ArrowLeft":this.applyLeftDirection(!0);break;case"KeyD":case"ArrowRight":this.applyRightDirection(!0);break;case"KeyS":case"ArrowDown":this.applyDownDirection(!0);break;case"ShiftLeft":case"ControlLeft":case"Space":this.pointerSpecial=!0}},this.handleKeyUp=e=>{switch((0,s.logKeyup)(`${e.code} ${e.key}`),e.code){case"KeyW":case"ArrowUp":this.applyUpDirection(!1);break;case"KeyA":case"ArrowLeft":this.applyLeftDirection(!1);break;case"KeyD":case"ArrowRight":this.applyRightDirection(!1);break;case"KeyS":case"ArrowDown":this.applyDownDirection(!1);break;case"ShiftLeft":case"ControlLeft":case"Space":this.pointerSpecial=!1}},this.eventTarget=e,this.relativeToTarget=t,this.interactiveChildren=i,this.addEventLesteners()}addEventLesteners(){this.eventTarget.interactive=!0,this.eventTarget.on("pointerdown",this.handlePointerDown),this.eventTarget.on("pointermove",this.handlePointerMove),this.eventTarget.on("pointerup",this.handlePointerUp),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp)}handlePlayerMove(e,t){const i=this.eventTarget.toLocal(t.global);(0,s.logPointerEvent)(`${t.type} px=${i.x} py=${i.y}`),this.applyPointerToDirection(e,i.x,i.y)}applyUpDirection(e){this.pointerYDown=e?-1:null,(0,s.logInputDirection)(`UP px=${this.pointerXDown} py=${this.pointerYDown}`)}applyDownDirection(e){this.pointerYDown=e?1:null,(0,s.logInputDirection)(`DOWN px=${this.pointerXDown} py=${this.pointerYDown}`)}applyLeftDirection(e){this.pointerXDown=e?-1:-1===this.pointerXDown?null:this.pointerXDown,(0,s.logInputDirection)(`LEFT px=${this.pointerXDown} py=${this.pointerYDown}`)}applyRightDirection(e){this.pointerXDown=e?1:1===this.pointerXDown?null:this.pointerXDown,(0,s.logInputDirection)(`RIGHT px=${this.pointerXDown} py=${this.pointerYDown}`)}isPointerDown(){return null!==this.pointerXDown||null!==this.pointerYDown}hasDirectionLeft(){return null!==this.pointerXDown&&this.pointerXDown<0}hasDirectionRight(){return null!==this.pointerXDown&&this.pointerXDown>0}hasDirectionUp(){return null!==this.pointerYDown&&this.pointerYDown<0}hasDirectionDown(){return null!==this.pointerYDown&&this.pointerYDown>0}hasSpecial(){return this.pointerSpecial}applyPointerToDirection(e,t,i){const{relativeToTarget:a}=this;if(!0===e||void 0===e&&this.isPointerDown()){if(null!=a){const e={left:a.x,right:a.x+a.width,top:a.y,bottom:a.y+a.height};t>=e.right?this.pointerXDown=1:t<=e.left&&(this.pointerXDown=-1),i<=e.top?(this.pointerYDown=-1,this.pointerSpecial=!0):i>=e.bottom&&(this.pointerYDown=1)}else this.pointerXDown=t,this.pointerYDown=i;(0,s.logInputDirection)(`MOVE|START px=${this.pointerXDown} py=${this.pointerYDown}`)}else!1===e&&(this.pointerXDown=null,this.pointerYDown=null,this.pointerSpecial=!1,(0,s.logInputDirection)(`END px=${this.pointerXDown} py=${this.pointerYDown}`))}restart(){this.pointerXDown=null,this.pointerYDown=null,this.pointerSpecial=!1}}},1557:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LoaderScene=t.manifest=void 0;const s=i(8687),a=i(5473);t.manifest={bundles:[{name:"bundle-1",assets:{spritesheet:"assets/spritesheets/spritesheet.json",citySpritesheet:"assets/spritesheets/city-spritesheet.json",forestSpritesheet:"assets/spritesheets/forest-spritesheet.json"}}]};class n extends s.Container{constructor(e){super(),this.downloadProgress=e=>{this.loaderBarFill.width=(n.barOptions.width-2*n.barOptions.borderThick)*e},this.setup(),this.draw()}setup(){const e=new s.Graphics;this.addChild(e),this.loaderBarBorder=e;const t=new s.Graphics;this.addChild(t),this.loaderBarFill=t}draw(){const{barOptions:e}=n,{loaderBarFill:t,loaderBarBorder:i}=this;i.beginFill(e.borderColor),i.drawRoundedRect(0,0,e.width,e.height,e.borderRadius),i.endFill(),t.beginFill(e.fillColor),t.drawRoundedRect(e.borderThick,e.borderThick,e.width-2*e.borderThick,e.height-2*e.borderThick,e.borderRadius),t.endFill()}async initializeLoader(){await s.Assets.init({manifest:t.manifest}),await s.Assets.loadBundle(t.manifest.bundles.map((e=>e.name)),this.downloadProgress)}getAssets(){return{spritesheet:s.Assets.get("spritesheet"),citySpritesheet:s.Assets.get("citySpritesheet"),forestSpritesheet:s.Assets.get("forestSpritesheet")}}handleResize({viewWidth:e,viewHeight:t}){const i=e,s=t,r=this.width,o=this.height;if(i>=r&&s>=o){const e=i>r?(i-r)/2:0,t=s>o?(s-o)/2:0;(0,a.logLayout)(`Spacing aw=${i} tw=${r} ah=${s} th=${o}`),this.x=e,this.width=n.barOptions.width,this.y=t,this.height=n.barOptions.height}else{let e=1;o>=r?(e=s/o,e*r>i&&(e=i/r),(0,a.logLayout)(`By height (sc=${e})`)):(e=i/r,(0,a.logLayout)(`By width (sc=${e})`),e*o>s&&(e=s/o));const t=Math.floor(r*e),n=Math.floor(o*e),h=i>t?(i-t)/2:0,l=s>n?(s-n)/2:0;(0,a.logLayout)(`aw=${i} (ow=${t}) ah=${s} (oh=${n})`),this.x=h,this.width=t,this.y=l,this.height=n}(0,a.logLayout)(`x=${this.x} y=${this.y} w=${this.width} h=${this.height}`)}handleMounted(){}handleUpdate(){}}n.barOptions={width:350,height:40,fillColor:1588688,borderRadius:5,borderThick:5,borderColor:0},t.LoaderScene=n},6168:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MainScene=void 0;const s=i(8687),a=i(9221),n=i(9060);class r extends s.Container{constructor(e){super(),this.gravity=.7,this.gameEnded=!1,this.prepareTextures(e),this.setup(e)}setup({viewWidth:e,viewHeight:t,textures:i}){const s=new a.Game({viewWidth:e,viewHeight:t,textures:i});this.addChild(s),this.game=s}handleResize(e){this.game.handleResize(e)}handleUpdate(e){this.game.handleUpdate(e)}prepareTextures(e){const t=n.Dust.prepareGraphics();n.Dust.texturesCache=e.app.renderer.generateTexture(t),n.Splash.texturesCache=e.textures.fireTexture,n.Fire.texturesCache=e.textures.fireTexture}}t.MainScene=r},9060:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fire=t.Splash=t.Dust=void 0;const s=i(8687);class a extends s.Sprite{constructor({game:e,texture:t}){super(t),this.markedForDeletion=!1,this.velocity={vx:0,vy:0},this.game=e}handleUpdate(){this.x-=this.velocity.vx+this.game.speed,this.y-=this.velocity.vy,this.width*=.95,this.height*=.95,(this.width<.5||this.height<.5)&&(this.markedForDeletion=!0)}}class n extends a{constructor({game:e}){super({game:e,texture:n.texturesCache}),this.width=this.height=10*Math.random()+10,this.velocity.vx=Math.random(),this.velocity.vy=Math.random()}static prepareGraphics(){const e=new s.Graphics;return e.beginFill(n.options.fillColor),e.drawCircle(0,0,n.options.renderRadius),e.endFill(),e.cacheAsBitmap=!0,e.alpha=.2,e}}n.options={fillColor:0,renderRadius:100},t.Dust=n;class r extends a{constructor({game:e}){super({game:e,texture:r.texturesCache}),this.width=100*Math.random()+100,this.velocity.vx=10*Math.random()-5,this.velocity.vy=2*Math.random()+1}handleUpdate(){this.velocity.vy-=r.options.gravity,super.handleUpdate()}}r.options={gravity:.1},t.Splash=r;class o extends a{constructor({game:e}){super({game:e,texture:o.texturesCache}),this.va=0,this.width=100*Math.random()+50,this.velocity.vx=1,this.velocity.vy=1,this.angle=0,this.va=.2*Math.random()-.1}handleUpdate(){super.handleUpdate(),this.angle+=this.va,this.x+=Math.sin(10*this.angle)}}t.Fire=o},4778:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=t.PlayerAnimation=void 0;const s=i(8687),a=i(4181),n=i(5473),r=i(6854),o=i(1660);var h;!function(e){e.dizzy="dizzy",e.fall="fall",e.jump="jump",e.roll="roll",e.run="run",e.sit="sit",e.stand="stand"}(h=t.PlayerAnimation||(t.PlayerAnimation={}));class l extends s.Container{constructor(e){super(),this.moveSpeed=8,this.jumpSpeed=20,this.velocity={vx:0,vy:0},this.frameTimer=0,this.game=e.game,this.setup(e),this.states={[a.EPlayerState.SITTING]:new a.Sitting({game:e.game}),[a.EPlayerState.RUNNING]:new a.Running({game:e.game}),[a.EPlayerState.JUMPING]:new a.Jumping({game:e.game}),[a.EPlayerState.FALLING]:new a.Falling({game:e.game}),[a.EPlayerState.ROLLING]:new a.Rolling({game:e.game}),[a.EPlayerState.DIVING]:new a.Diving({game:e.game}),[a.EPlayerState.HIT]:new a.Hit({game:e.game})},this.currentState=this.states.SITTING}setup({textures:{dizzyTextures:e,fallTextures:t,jumpTextures:i,rollTextures:a,runTextures:n,sitTextures:r,standTextures:o}}){const h=new s.Graphics;this.addChild(h),this.playerBox=h;const l=new s.Container;this.addChild(l),this.spritesContainer=l;const d=new s.AnimatedSprite(e);l.addChild(d),this.dizzyAnimation=d;const c=new s.AnimatedSprite(t);l.addChild(c),this.fallAnimation=c;const p=new s.AnimatedSprite(i);l.addChild(p),this.jumpAnimation=p;const u=new s.AnimatedSprite(a);l.addChild(u),this.rollAnimation=u;const m=new s.AnimatedSprite(n);l.addChild(m),this.runAnimation=m;const g=new s.AnimatedSprite(r);l.addChild(g),this.sitAnimation=g;const y=new s.AnimatedSprite(o);l.addChild(y),this.standAnimation=y}hideAllAnimations(){this.spritesContainer.children.forEach((e=>{e.visible=!1}))}switchAnimation(e){switch(this.hideAllAnimations(),e){case h.dizzy:this.currentAnimation=this.dizzyAnimation;break;case h.fall:this.currentAnimation=this.fallAnimation;break;case h.jump:this.currentAnimation=this.jumpAnimation;break;case h.roll:this.currentAnimation=this.rollAnimation;break;case h.run:this.currentAnimation=this.runAnimation;break;case h.sit:this.currentAnimation=this.sitAnimation;break;case h.stand:this.currentAnimation=this.standAnimation}this.currentAnimation.currentFrame=0,this.currentAnimation.visible=!0}setState(e,t){this.currentState=this.states[e],"number"==typeof t&&this.game.changeSpeed(t),this.currentState.enter(),(0,n.logPlayerState)(`state=${e}`)}setMaxXSpeed(e){this.velocity.vx=l.options.maxSpeed*e}setHalfXSpeed(e){this.velocity.vx=.5*l.options.maxSpeed*e}jump(){this.velocity.vy=-l.options.jumpSpeed}dive(){this.velocity.vy=l.options.diveSpeed}isOnGround(){return this.y>=this.game.getLevelBottom(this.height)}isFalling(){return this.velocity.vy>l.options.weight}isDizzyCompleted(){return this.dizzyAnimation.currentFrame>=10}reset(){this.velocity.vx=0,this.velocity.vy=0}handleUpdate(e){this.checkCollision(),this.currentState.handleInput();const{inputHandler:t}=this.game;this.x+=this.velocity.vx,t.hasDirectionLeft()&&this.currentState!==this.states[a.EPlayerState.HIT]?this.velocity.vx=-l.options.maxSpeed:t.hasDirectionRight()?this.velocity.vx=l.options.maxSpeed:this.velocity.vx=0,this.x<0?this.x=0:this.x>this.game.getLevelRight(this.width)&&(this.x=this.game.getLevelRight(this.width)),this.y+=this.velocity.vy,this.isOnGround()?this.velocity.vy=0:this.velocity.vy+=l.options.weight,this.y>this.game.getLevelBottom(this.height)&&(this.y=this.game.getLevelBottom(this.height)),this.frameTimer>l.options.frameInterval?(this.frameTimer=0,this.currentAnimation.currentFrame<this.currentAnimation.totalFrames-1?this.currentAnimation.currentFrame++:this.currentAnimation.currentFrame=0):this.frameTimer+=e}restart(){this.position.set(0,0),this.velocity.vx=0,this.velocity.vy=0,this.setState(a.EPlayerState.SITTING)}checkCollision(){this.game.enemies.children.forEach((e=>{if(e.x<this.x+this.width&&e.x+e.width>this.x&&e.y<this.y+this.height&&e.y+e.height>this.y){e.markedForDeletion=!0;const t=new r.Boom({game:this.game,textures:this.game.boomTextures});if(t.position.set(e.x+.5*e.width-.5*t.width,e.y+.5*e.height-.5*t.height),this.game.booms.addChild(t),this.currentState===this.states[a.EPlayerState.ROLLING]||this.currentState===this.states[a.EPlayerState.DIVING]){this.game.statusBar.addScore(1);const t=new o.FloatingMessage({text:"+1",targetX:this.game.statusBar.scoreText.x+this.game.statusBar.scoreText.width,targetY:this.game.statusBar.scoreText.y});t.position.set(e.x+.5*e.width,e.y+.5*e.height),this.game.floatingMessages.addChild(t)}else this.currentState!==this.states[a.EPlayerState.HIT]&&(this.setState(a.EPlayerState.HIT,0),this.game.lives--,this.game.statusBar.updateLives(this.game.lives)),this.game.statusBar.subScore(1),this.game.lives<=0&&this.game.endGame(!1)}}))}}l.fps=20,l.options={maxSpeed:10,jumpSpeed:28,diveSpeed:15,weight:1,frameInterval:1e3/l.fps},t.Player=l},3110:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SceneManager=void 0;const s=i(8687),a=i(5473);class n extends s.Container{init(){}handleUpdate(){}handleResize(){}}class r{constructor(){}static get width(){return window.innerWidth}static get height(){return window.innerHeight}static async initialize(){var e;const t=new s.Application({autoDensity:!0,resolution:null!==(e=window.devicePixelRatio)&&void 0!==e?e:1,width:r.width,height:r.height,resizeTo:window});document.body.appendChild(t.view),a.logApp.enabled&&((0,a.logApp)("window.app initialized!"),window.app=t),r.app=t,r.setupEventLesteners()}static setupEventLesteners(){window.addEventListener("resize",r.resizeDeBounce),r.app.ticker.add(r.updateHandler)}static async changeScene(e){r.app.stage.removeChild(r.currentScene),r.currentScene.destroy(),r.currentScene=e,r.app.stage.addChild(r.currentScene),r.resizeHandler()}static resizeDeBounce(){r.cancelScheduledResizeHandler(),r.scheduleResizeHandler()}static cancelScheduledResizeHandler(){clearTimeout(r.resizeTimeoutId)}static scheduleResizeHandler(){r.resizeTimeoutId=setTimeout((()=>{r.cancelScheduledResizeHandler(),r.resizeHandler()}),r.resizeTimeout)}static resizeHandler(){r.currentScene.handleResize({viewWidth:r.width,viewHeight:r.height})}static updateHandler(){r.currentScene.handleUpdate(r.app.ticker.deltaMS)}}r.currentScene=new n,r.resizeTimeout=300,t.SceneManager=r},6879:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StartModal=void 0;const s=i(8687);class a extends s.Container{constructor(e){super(),this.boxOptions={fill:16777215,width:300,height:200,borderRadius:5},this.reasonTextOptions={top:-50,textColor:0,textSize:40,fontWeight:"bold"},this.buttonOptions={top:120,left:50,width:200,height:50,fill:959977,borderRadius:10},this.buttonTextOptions={top:95,textColor:16777215,textSize:20},this.setup(e),this.draw(e),this.setupEventListeners()}setup(e){this.modalBox=new s.Graphics,this.addChild(this.modalBox);const{boxOptions:t,reasonTextOptions:i,buttonTextOptions:a}=this;this.reasonText=new s.Text("-",{fontSize:i.textSize,fill:i.textColor,fontWeight:i.fontWeight}),this.reasonText.anchor.set(.5,.5),this.reasonText.position.set(t.width/2,t.height/2+i.top),this.addChild(this.reasonText),this.button=new s.Graphics,this.button.interactive=!0,this.button.cursor="pointer",this.addChild(this.button),this.buttonText=new s.Text("Start Game",{fontSize:a.textSize,fill:a.textColor}),this.buttonText.anchor.set(.5,.5),this.buttonText.position.set(t.width/2,t.height/2/2+a.top),this.button.addChild(this.buttonText)}draw(e){const{boxOptions:t,buttonOptions:i}=this;this.modalBox.beginFill(t.fill),this.modalBox.drawRoundedRect(0,0,t.width,t.height,t.borderRadius),this.modalBox.endFill(),this.button.beginFill(i.fill),this.button.drawRoundedRect(i.left,i.top,i.width,i.height,i.borderRadius),this.button.endFill()}setupEventListeners(){this.button.on("pointertap",(e=>{this.emit("click",e)}))}handleResize({scaleX:e,scaleY:t,viewWidth:i,viewHeight:s}){this.position.set(i/2/e-this.width/2,s/2/t-this.height/2)}}t.StartModal=a},8554:function(e,t,i){var s,a=this&&this.__classPrivateFieldGet||function(e,t,i,s){if("a"===i&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!s:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?s:"a"===i?s.call(e):s?s.value:t.get(e)},n=this&&this.__classPrivateFieldSet||function(e,t,i,s,a){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?a.call(e,i):a?a.value=i:t.set(e,i),i};Object.defineProperty(t,"__esModule",{value:!0}),t.StatusBar=void 0;const r=i(8687);class o extends r.Container{constructor(e){super(),s.set(this,o.options.initScore),this.setup(e)}get score(){return a(this,s,"f")}setup({textures:{livesTexture:e}}){const{options:{padding:t,inlinePadding:i,maxLives:n,livesScale:h,textSize:l,textColor:d,textShadowOffset:c,textColorShadow:p}}=o,u=new r.Text(`Score: ${a(this,s,"f")}`,{fontSize:l,fill:p});u.position.set(t,t),this.addChild(u),this.scoreTextShadow=u;const m=new r.Text(`Score: ${a(this,s,"f")}`,{fontSize:l,fill:d});m.position.set(t+c,t+c),this.addChild(m),this.scoreText=m;const g=new r.Text("Time: 0.0",{fontSize:.8*l,fill:p});g.position.set(u.x,u.y+u.height),this.addChild(g),this.timeTextShadow=g;const y=new r.Text("Time: 0.0",{fontSize:.8*l,fill:d});y.position.set(m.x,m.y+m.height),this.addChild(y),this.timeText=y;const v=new r.Container;v.position.set(y.x,y.y+y.height),this.addChild(v),this.livesContainer=v;for(let t=0;t<n;t++){const s=new r.Sprite(e);s.position.set(t*(i+e.width*h),0),s.scale.set(h),v.addChild(s)}}addScore(e){n(this,s,a(this,s,"f")+Math.round(e),"f"),this.updateScore()}subScore(e){n(this,s,a(this,s,"f")-e,"f"),this.updateScore()}updateScore(){this.scoreText.text=`Score: ${a(this,s,"f")}`,this.scoreTextShadow.text=`Score: ${a(this,s,"f")}`}updateTime(e){const t=(.001*e).toFixed(1);this.timeText.text=`Time: ${t}`,this.timeTextShadow.text=`Time: ${t}`}updateLives(e){this.livesContainer.children.forEach(((t,i)=>{t.visible=i<e}))}restart(){n(this,s,o.options.initScore,"f"),this.updateScore(),this.updateTime(0),this.updateLives(o.options.maxLives)}}s=new WeakMap,o.options={inlinePadding:5,padding:20,textColor:0,textColorShadow:16777215,textShadowOffset:1,textSize:30,livesScale:.4,backgroundFill:0,initScore:0,maxLives:5},t.StatusBar=o},6752:(e,t,i)=>{i(7279);const s=i(3110),a=i(6168),n=i(1557);(async function(){const e=document.querySelector(".ellipsis");null!=e&&(e.style.display="none"),await s.SceneManager.initialize();const t=new n.LoaderScene({viewWidth:s.SceneManager.width,viewHeight:s.SceneManager.height});await s.SceneManager.changeScene(t),await t.initializeLoader();const{citySpritesheet:i,forestSpritesheet:r,spritesheet:{textures:o,animations:h}}=t.getAssets();await s.SceneManager.changeScene(new a.MainScene({app:s.SceneManager.app,viewWidth:s.SceneManager.width,viewHeight:s.SceneManager.height,textures:{cityTextures:{layer1Texture:i.textures["City-Layer-1.png"],layer2Texture:i.textures["City-Layer-2.png"],layer3Texture:i.textures["City-Layer-3.png"],layer4Texture:i.textures["City-Layer-4.png"],layer5Texture:i.textures["City-Layer-5.png"]},forestTextures:{layer1Texture:r.textures["Forest-Layer-1.png"],layer2Texture:r.textures["Forest-Layer-2.png"],layer3Texture:r.textures["Forest-Layer-3.png"],layer4Texture:r.textures["Forest-Layer-4.png"],layer5Texture:r.textures["Forest-Layer-5.png"]},playerTextures:{dizzyTextures:h["Dog-Dizzy"],fallTextures:h["Dog-Fall"],jumpTextures:h["Dog-Jump"],rollTextures:h["Dog-Roll"],runTextures:h["Dog-Run"],sitTextures:h["Dog-Sit"],standTextures:h["Dog-Stand"]},enemyTextures:{flyTextures:h.Fly,plantTextures:h.Plant,spiderTextures:h.Spider},boomTextures:h.Boom,fireTexture:o["Fire.png"],livesTexture:o["Lives.png"]}}))})().catch((e=>{var t;console.error(e);const i=document.querySelector(".error-message");null!=i&&(i.classList.remove("hidden"),i.innerText=Boolean(e)&&Boolean(e.message)?e.message:e);const s=document.querySelector(".error-stack");null!=s&&(s.classList.remove("hidden"),s.innerText=Boolean(e)&&Boolean(e.stack)?e.stack:"");const a=document.querySelector("canvas");null!=a&&(null===(t=a.parentElement)||void 0===t||t.removeChild(a))}))},5473:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.logPlayerState=t.logPlayerBounds=t.logInputDirection=t.logKeyup=t.logKeydown=t.logPointerEvent=t.logLayout=t.logApp=void 0;const a=s(i(1227));t.logApp=(0,a.default)("sidescroller-app"),t.logLayout=(0,a.default)("sidescroller-layout"),t.logPointerEvent=(0,a.default)("sidescroller-pointer-event"),t.logKeydown=(0,a.default)("sidescroller-keydown"),t.logKeyup=(0,a.default)("sidescroller-keyup"),t.logInputDirection=(0,a.default)("sidescroller-input-direction"),t.logPlayerBounds=(0,a.default)("sidescroller-player-bounds"),t.logPlayerState=(0,a.default)("sidescroller-player-state")},4181:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Hit=t.Diving=t.Rolling=t.Falling=t.Jumping=t.Running=t.Sitting=t.PlayerState=t.EPlayerState=void 0;const s=i(9060),a=i(4778);var n;!function(e){e.SITTING="SITTING",e.RUNNING="RUNNING",e.JUMPING="JUMPING",e.FALLING="FALLING",e.ROLLING="ROLLING",e.DIVING="DIVING",e.HIT="HIT"}(n=t.EPlayerState||(t.EPlayerState={}));class r{constructor({game:e,state:t}){this.state=t,this.game=e}enter(){throw new Error("enter() not implemented in child class")}handleInput(){throw new Error("handleInput() not implemented in child class")}}t.PlayerState=r,t.Sitting=class extends r{constructor({game:e}){super({game:e,state:n.SITTING})}enter(){const{player:e}=this.game;e.setMaxXSpeed(0),e.switchAnimation(a.PlayerAnimation.sit)}handleInput(){const{inputHandler:e,player:t}=this.game;e.hasDirectionLeft()||e.hasDirectionRight()?t.setState(n.RUNNING,1):e.hasSpecial()&&t.setState(n.ROLLING,2)}},t.Running=class extends r{constructor({game:e}){super({game:e,state:n.RUNNING})}enter(){const{player:e}=this.game;e.setMaxXSpeed(-1),e.switchAnimation(a.PlayerAnimation.run)}handleInput(){const{inputHandler:e,player:t}=this.game,i=new s.Dust({game:this.game});i.position.set(this.game.player.x+20,this.game.player.y+this.game.player.height-10),this.game.dusts.addChild(i),!e.hasDirectionDown()||e.hasDirectionLeft()||e.hasDirectionRight()?e.hasDirectionUp()?t.setState(n.JUMPING,1):e.hasSpecial()&&t.setState(n.ROLLING,2):t.setState(n.SITTING,0)}},t.Jumping=class extends r{constructor({game:e}){super({game:e,state:n.JUMPING})}enter(){const{player:e}=this.game;e.isOnGround()&&e.jump(),e.setHalfXSpeed(-1),e.switchAnimation(a.PlayerAnimation.jump)}handleInput(){const{inputHandler:e,player:t}=this.game;t.isFalling()?t.setState(n.FALLING,1):e.hasSpecial()?t.setState(n.ROLLING,2):e.hasDirectionDown()&&t.setState(n.DIVING,2)}},t.Falling=class extends r{constructor({game:e}){super({game:e,state:n.FALLING})}enter(){const{player:e}=this.game;e.switchAnimation(a.PlayerAnimation.fall)}handleInput(){const{inputHandler:e,player:t}=this.game;t.isOnGround()?t.setState(n.RUNNING,1):e.hasDirectionDown()&&t.setState(n.DIVING,2)}},t.Rolling=class extends r{constructor({game:e}){super({game:e,state:n.ROLLING})}enter(){const{player:e}=this.game;e.switchAnimation(a.PlayerAnimation.roll)}handleInput(){const{inputHandler:e,player:t}=this.game,i=new s.Fire({game:this.game});i.position.set(this.game.player.x,this.game.player.y),this.game.particles.addChild(i),!e.hasSpecial()&&t.isOnGround()?t.setState(n.RUNNING,1):e.hasSpecial()||t.isOnGround()?e.hasSpecial()&&e.hasDirectionUp()&&t.isOnGround()?t.jump():e.hasDirectionDown()&&!t.isOnGround()&&t.setState(n.DIVING,2):t.setState(n.FALLING,1)}},t.Diving=class extends r{constructor({game:e}){super({game:e,state:n.DIVING})}enter(){const{player:e}=this.game;e.dive(),e.switchAnimation(a.PlayerAnimation.roll)}handleInput(){const{inputHandler:e,player:t}=this.game,i=new s.Fire({game:this.game});if(i.position.set(this.game.player.x,this.game.player.y),this.game.particles.addChild(i),t.isOnGround()){t.setState(n.RUNNING,1);for(let e=0;e<30;e++){const e=new s.Splash({game:this.game});e.position.set(t.x,t.y+t.height/2),this.game.particles.addChild(e)}}else e.hasSpecial()&&t.isOnGround()&&t.setState(n.ROLLING,2)}},t.Hit=class extends r{constructor({game:e}){super({game:e,state:n.HIT})}enter(){const{player:e}=this.game;e.switchAnimation(a.PlayerAnimation.dizzy)}handleInput(){const{player:e}=this.game;e.isDizzyCompleted()&&e.isOnGround()?e.setState(n.RUNNING,1):e.isDizzyCompleted()&&!e.isOnGround()&&e.setState(n.FALLING,2)}}}},i={};function s(e){var a=i[e];if(void 0!==a)return a.exports;var n=i[e]={id:e,loaded:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.loaded=!0,n.exports}s.m=t,e=[],s.O=(t,i,a,n)=>{if(!i){var r=1/0;for(d=0;d<e.length;d++){for(var[i,a,n]=e[d],o=!0,h=0;h<i.length;h++)(!1&n||r>=n)&&Object.keys(s.O).every((e=>s.O[e](i[h])))?i.splice(h--,1):(o=!1,n<r&&(r=n));if(o){e.splice(d--,1);var l=a();void 0!==l&&(t=l)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[i,a,n]},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var a,n,[r,o,h]=i,l=0;if(r.some((t=>0!==e[t]))){for(a in o)s.o(o,a)&&(s.m[a]=o[a]);if(h)var d=h(s)}for(t&&t(i);l<r.length;l++)n=r[l],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(d)},i=self.webpackChunksimple_html5_sidescroller_game=self.webpackChunksimple_html5_sidescroller_game||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var a=s.O(void 0,[736],(()=>s(6752)));a=s.O(a)})();