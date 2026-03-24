/**
 * ScrubEngine — 190-frame image sequence preloader and renderer.
 * Renders the image as a centered portrait at a fixed viewport-width
 * fraction, maintaining natural aspect ratio. Black #0B0B0D fills
 * left/right — intentional editorial design.
 */
export class ScrubEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.frames = [];
    this.currentFrame = 0;
    this._resizeHandler = this._onResize.bind(this);
    window.addEventListener('resize', this._resizeHandler);
    this._syncSize();
  }

  /** Preload all frames and report progress via onProgress(0..1). */
  loadFrames(basePath, count, onProgress) {
    return new Promise((resolve) => {
      let loaded = 0;
      const total = count;

      for (let i = 1; i <= count; i++) {
        const img = new Image();
        const padded = String(i).padStart(3, '0');
        img.src = `${basePath}ezgif-frame-${padded}.jpg`;

        img.onload = () => {
          loaded++;
          if (onProgress) onProgress(loaded / total);
          if (loaded === total) {
            this.render(0);
            resolve();
          }
        };

        img.onerror = () => {
          loaded++;
          // Skip missing frames gracefully
          if (onProgress) onProgress(loaded / total);
          if (loaded === total) resolve();
        };

        this.frames.push(img);
      }
    });
  }

  /**
   * Returns the fraction of canvas width the portrait should occupy.
   * Desktop: 55vw  |  Tablet: 70vw  |  Mobile: 90vw
   */
  _getViewportFraction() {
    const w = window.innerWidth;
    if (w > 1024) return 0.55;
    if (w >= 768)  return 0.70;
    return 0.90;
  }

  /**
   * Draw a specific frame index (0-based) onto the canvas.
   * Portrait centered on black — width fixed at viewport fraction,
   * height auto from natural aspect ratio (contain behavior).
   */
  render(frameIndex) {
    const frame = this.frames[frameIndex];
    if (!frame || !frame.naturalWidth) return;

    this.currentFrame = frameIndex;
    const { width: cw, height: ch } = this.canvas;
    const iw = frame.naturalWidth;
    const ih = frame.naturalHeight;

    // Width = fixed fraction of canvas width; height maintains aspect ratio
    const sw = cw * this._getViewportFraction();
    const sh = sw * (ih / iw);

    // Center horizontally; shift slightly down so face centers vertically
    const sx = (cw - sw) / 2;
    const sy = Math.max(0, (ch - sh) / 2 + ch * 0.05);

    // Background fill first — #0B0B0D shows on left/right of portrait
    this.ctx.fillStyle = '#0B0B0D';
    this.ctx.fillRect(0, 0, cw, ch);
    this.ctx.drawImage(frame, sx, sy, sw, sh);
  }

  get totalFrames() {
    return this.frames.length;
  }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
  }

  _syncSize() {
    this.canvas.width  = this.canvas.offsetWidth  || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
  }

  _onResize() {
    this._syncSize();
    this.render(this.currentFrame);
  }
}
