export class Zooms {

  private _zoomId: string = 'body';
  private _minZoom: number = 0.8;
  private _maxZoom: number = 1.6;
  private _sensitivity: number = 50;
  private _target: string = 'body';
  //private _ignoreTarget: string = '';
  private _displayShowTime: number = 200;

  private __onChangeFunction: (scale: number, end: boolean) => void = (scale: number) => {};
  private __startDistance = 0;
  private __displayExpireTime: number = 0;
  private __nowZoom: number = 1;


  public zoomId(zoomId: string) { this._zoomId = zoomId; return this; }
  public minZoom(minZoom: number) { this._minZoom = minZoom; return this; }
  public maxZoom(maxZoom: number) { this._maxZoom = maxZoom; return this; }
  public sensitivity(sensitivity: number) { this._sensitivity = sensitivity; return this; }
  public target(target: string) { this._target = target; return this; }
  //public ignoreTarget(ignoreTarget: string) { this._ignoreTarget = ignoreTarget; return this; }
  public displayShowTime(displayShowTime: number) { this._displayShowTime = displayShowTime; return this; }

  public watch(onChangeFunction: (scale: number, end: boolean) => void) : Zooms {
    this.__nowZoom = Number(localStorage.getItem(`_raon_zooms_${this._zoomId}`) || '1.0');
    this.__onChangeFunction = onChangeFunction;
    this.out(true);
    const t = document.querySelector(this._target)!!;
    t.addEventListener('touchstart', (event: Event) => {
      // @ts-ignore
      const touches = event.touches;
      if (touches.length == 2) {
        this.__startDistance = this.calculateDistance(touches)
      }
    });
    t.addEventListener('touchmove', (event: Event) => {
      // @ts-ignore
      const touches = event.touches;
      if (touches.length == 2) {
        const currentDistance = this.calculateDistance(touches);
        const diff = (currentDistance - this.__startDistance) / this._sensitivity;
        if (Math.abs(diff) > 1) {
          this.__startDistance = currentDistance;
          this.doZoom(diff > 0 ? 0.1 : -0.1);
        }
      }
    });
    return this;
  }

  private out(end: boolean) {
    this.__onChangeFunction(this.__nowZoom, end);
    if (!end) {
      this.__displayExpireTime = new Date().getTime() + this._displayShowTime;
      setTimeout(() => {
        if (this.__displayExpireTime <= new Date().getTime()) {
          this.out(true);
        }
      }, this._displayShowTime + 10);
    }
  }

  public doZoom(i = 0.1) {
    this.__nowZoom = Number(Math.max(Math.min(this.__nowZoom + i, this._maxZoom), this._minZoom).toFixed(1));
    localStorage.setItem(`_raon_zooms_${this._zoomId}`, this.__nowZoom.toString());
    this.out(false);
  }

  private calculateDistance(touches: TouchList) : number {
    const t1 = touches[0];
    const t2 = touches[1];
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

}
