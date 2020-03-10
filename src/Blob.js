export default class Blob {
    constructor(s, origin, c, d, nv, v) {
      this.s = s;
      this.c = c;
      this.origin = origin;
      this.nv = nv;
      this.d = d;
      this.vertices = [];
      this.volatility = v;
      this.yoff = s.random(1000);
      this.reset();
    }
  
    changeHandler(nv, v, c) {
      this.vertices = [];
      this.nv = nv;
      this.volatility = v;
      this.c = c;
    }
  
    reset() {
      return null;
    }
  
    update() {
      let xoff = 0;
      for (let i = 0; i < this.nv; i += 1) {
        let r = this.d / 2;
        const offset = this.s.map(this.s.noise(xoff, this.yoff),
          0, 1,
          -this.volatility,
          this.volatility);
        r += offset;
        let x = this.s.cos(this.s.radians(i * 360 / this.nv)) * r;
        let y = this.s.sin(this.s.radians(i * 360 / this.nv)) * r;
        const p = this.s.createVector(x, y);
        this.vertices[i] = p;
        xoff += 1;
      }
      this.yoff += 0.005;
    }
  
    render() {
      this.s.push();
      this.s.fill(this.c);
      this.s.translate(this.origin.x, this.origin.y);
      this.s.beginShape();
      for (let i = 0; i < this.vertices.length + 3; i += 1) {
        this.s.curveVertex(this.vertices[i % this.vertices.length].x,
          this.vertices[i % this.vertices.length].y);
      }
      this.s.endShape();
      this.s.pop();
    }
  }
  