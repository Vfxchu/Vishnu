/**
 * TunnelShader — WebGL overlay canvas.
 * Renders a fullscreen quad with:
 *  - Blue chromatic aberration that intensifies at scroll edges
 *  - Vignette darkening around the frame perimeter
 *  - Steel-blue (#7BA7C4) ambient glow on canvas edges
 *
 * The overlay canvas is transparent and layered above the 2D scrub canvas.
 * pointer-events: none keeps interaction on the page beneath.
 */
export class TunnelShader {
  constructor(overlayCanvas) {
    this.canvas = overlayCanvas;
    this.gl     = null;
    this.prog   = null;
    this.uProgress = null;
    this.uResolution = null;
    this._resizeHandler = this._onResize.bind(this);
  }

  init() {
    const gl = this.canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return; // WebGL unsupported — overlay is simply invisible
    this.gl = gl;

    // ── Vertex shader ──────────────────────────────────────────
    const vertSrc = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    // ── Fragment shader ────────────────────────────────────────
    // Focal point: vec2(0.5, 0.40) — centers on face/eyes
    const fragSrc = `
      precision mediump float;

      varying vec2 vUv;
      uniform float uProgress;   // 0..1 scroll progress
      uniform vec2  uResolution;

      const vec2  FOCAL     = vec2(0.5, 0.40);
      const vec3  ACCENT    = vec3(0.482, 0.655, 0.769); // #7BA7C4
      const float CA_MAX    = 0.012;  // max chromatic aberration offset
      const float VIGN_POW  = 1.6;
      const float VIGN_STR  = 0.72;
      const float GLOW_STR  = 0.22;

      void main() {
        vec2 uv = vUv;

        // Distance from focal centre (corrected for aspect ratio)
        float aspect = uResolution.x / uResolution.y;
        vec2  d = (uv - FOCAL) * vec2(aspect, 1.0);
        float dist = length(d);

        // Chromatic aberration: offset increases with scroll progress and edge dist
        float caAmt = uProgress * CA_MAX * (0.3 + dist * 1.4);
        vec2  dir   = normalize(d + 0.0001);

        // We're rendering an overlay — output ONLY the colour effect at near-zero alpha.
        // The R/G/B shift is expressed as a tinted overlay tint rather than sampling texture.
        float edgeFactor = smoothstep(0.0, 0.6, dist);

        // Vignette (pure black darkening)
        float vign = pow(dist / 0.9, VIGN_POW) * VIGN_STR;
        vign = clamp(vign, 0.0, 1.0);

        // Edge glow (steel blue)
        float edgeGlow = smoothstep(0.5, 1.0, dist) * GLOW_STR;

        // Chromatic colour fringe (subtle red/blue split near edges at scroll)
        vec3 ca = vec3(
          caAmt * dir.x * edgeFactor,
          0.0,
          -caAmt * dir.x * edgeFactor
        );

        // Combine: vignette darkens, edge glow adds blue, CA adds colour fringe
        vec3 col = ACCENT * edgeGlow + ca;
        float alpha = vign * 0.55 + edgeGlow * 0.5 + length(ca) * 4.0;
        alpha = clamp(alpha * uProgress * 0.9 + vign * 0.25, 0.0, 0.7);

        gl_FragColor = vec4(col * alpha, alpha);
      }
    `;

    this.prog = this._buildProgram(vertSrc, fragSrc);
    if (!this.prog) return;

    gl.useProgram(this.prog);

    // Fullscreen quad (-1,-1) to (1,1)
    const verts = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(this.prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    this.uProgress    = gl.getUniformLocation(this.prog, 'uProgress');
    this.uResolution  = gl.getUniformLocation(this.prog, 'uResolution');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this._syncSize();
    window.addEventListener('resize', this._resizeHandler);
  }

  /** Call every scroll frame with progress 0..1 */
  render(progress) {
    const gl = this.gl;
    if (!gl || !this.prog) return;

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(this.uProgress, progress);
    gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
  }

  // ── Private helpers ──────────────────────────────────────────

  _buildProgram(vertSrc, fragSrc) {
    const gl   = this.gl;
    const vert = this._compile(gl.VERTEX_SHADER, vertSrc);
    const frag = this._compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vert || !frag) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('TunnelShader link error:', gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  _compile(type, src) {
    const gl     = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('TunnelShader compile error:', gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  _syncSize() {
    this.canvas.width  = this.canvas.offsetWidth  || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
  }

  _onResize() {
    this._syncSize();
    this.render(this._lastProgress || 0);
  }
}
