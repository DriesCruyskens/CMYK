import * as p5 from 'p5';
import * as dat from 'dat-gui';
import Blobs from './Blobs.js';
import { makeNoise3D } from "open-simplex-noise";

const P5 = new p5((s) => {
    const gui = new dat.GUI();

    let blobs;
  
    function resetBackground() {
      s.clear();
      s.background(s.color(0,0));
    }
  
    function reset() {
      for (let i = 0; i < 1; i += 1) {
        // eslint-disable-next-line new-cap
        blobs = new Blobs(s, new s.createVector(s.width / 2, s.height / 2));
      }
    }

    function initGUI() {
      gui.add(blobs, 'diameter', s.height/5, s.height/2).onFinishChange(function(value) {
        blobs.reset()
      });
      gui.add(blobs, 'nVertices', 3, 15).step(1).onFinishChange(function(value) {
        blobs.reset()
      });
      gui.add(blobs, 'curveTightness', 0, 10).onFinishChange(function(value) {
        blobs.reset()
      });
      gui.add(blobs, 'volatility', 0, 50).onFinishChange(function(value) {
        blobs.reset()
      });

      gui.add(s, 'save_png');
    }

    s.save_png = function() {
      s.save("CMYK" + Date.now());
    };
  
    s.setup = () => {
      // sketch init
      s.createCanvas(window.innerWidth, window.innerHeight);
      s.pixelDensity(2);
      s.frameRate(60);
      s.blendMode(s.MULTIPLY);
      s.noStroke();

      reset();

      //inputs
      initGUI();
    };
  
    s.draw = () => {
      resetBackground();

      blobs.update();
      blobs.render();
    };
  
    s.keyPressed = () => {
      if (s.key === ' ') {
        reset();
      }
      return 0;
    };

    window.onresize = function(event) {
      s.resizeCanvas(window.innerWidth, window.innerHeight);
    };

  }, 'sketch');