import { SpriteBoundaries } from "./Sprite";

export class Animation2D {
  name: string;
  sprites: SpriteBoundaries[]
  speed: number;
  time: number = 0;
  atualSprite: number = 0;

  constructor(name: string, sprites: SpriteBoundaries[], speed: number){
    this.name = name;
    this.sprites = sprites;
    this.speed = speed;
  }

  update(delta: number){
    this.time += delta;
    if(this.time > (this.speed / this.sprites.length)){
      this.atualSprite = (this.atualSprite + 1) % this.sprites.length;
      this.time = 0;
    }
  }
}