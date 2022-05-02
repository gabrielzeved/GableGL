export class Timer {
  now: number = 0;
  delta: number = 0;
  fps: number = 0;

  //RECEIVE IN MILLISECONDS
  update(time: number){
    //CONVERT TO SECONDS
    time *= 0.001;

    this.delta = time - this.now;
    this.now = time;
    this.fps = 1/this.delta;
  }
}