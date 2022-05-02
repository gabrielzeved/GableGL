import { ShaderProgram } from "../shader/ShaderProgram";
import { Animation2D } from "./Animation2D";
import { Sprite, SpriteBoundaries } from "./Sprite";

export class AnimatedSprite extends Sprite{

  animations: Record<string, Animation2D> = {};
  atualAnimation: string;

  constructor(defaultSprite: SpriteBoundaries, imageUrl: string, gl: WebGL2RenderingContext, shaderProgram: ShaderProgram){
    super(defaultSprite, imageUrl, gl, shaderProgram);
  }

  update(time: number){
    if(!this.atualAnimation)
      return;
    if(!this.texture) return;

    const animation = this.animations[this.atualAnimation];

    if(!animation)
      console.error("[Animated Sprite] : Atual animation does not exists")

    animation.update(time);
    this.setFrame(animation.sprites[animation.atualSprite]);
  }

  addAnimation(animation: Animation2D){
    this.animations[animation.name] = animation;
  }

  setAnimation(animationName: string){
    this.atualAnimation = animationName;
  }

}