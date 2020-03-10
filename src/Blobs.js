import Blob from './Blob.js';

export default class Blobs {
  constructor(s, origin) {
    this.diameter = s.height/3
    this.nVertices = 7
    this.curveTightness = 0
    this.volatility = 15
    this.colors = ['#ff00ff', '#00ffff', '#ffff00'];
    this.s = s;
    this.origin = origin;
    this.reset();
  }

  reset() {
    this.rings = 3;
    this.blobs = [];
    for (let i = 0; i < this.rings; i += 1) {
      this.blobs[i] = new Blob(this.s, this.origin, this.colors[i], this.diameter, this.nVertices, this.volatility);
      // rings = 10;
      // draw_blob(x, y, d - map(i, 0, rings, 0, d));
      // rings = 7
      // draw_blob(x, y, d - d/i);
    }
    for (let i = 0; i < this.rings; i += 1) {
      this.blobs[i].reset();
    }
  }

  changeHandler(nv, v, c) {
    for (let i = 0; i < this.rings; i += 1) {
      this.blobs[i].changeHandler(nVertices, volatility, colors[i]);
    }
  }

  update() {
    for (let i = 0; i < this.rings; i += 1) {
      this.blobs[i].update();
    }
  }

  render() {
    for (let i = 0; i < this.rings; i += 1) {
      this.blobs[i].render();
    }
  }
}
