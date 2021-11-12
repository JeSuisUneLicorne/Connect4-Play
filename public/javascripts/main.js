/*
  MIT License

  Copyright (c) 2021 Daniel Özyurt, Julian Zimmermann

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

import * as loggerUtil from './messageLogger.js';
import * as httpUtil from './httpRequestHandler.js';
import * as tests from './tests.js'
import * as math3d from './math3d.js'

const TestVueApp = {
  data() {
    return {
      message: ''
    }
  }
};

Vue.createApp(TestVueApp).mount('#test-vue-app');

function putPixel(imageData, x, y, r, g, b, a) {
  var index = 4 * (x + y * imageData.width);
  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

let ANGLE = 0;

let last = 0;

function updateCanvas() {
  const canvas = document.getElementById('canvas');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(canvasWidth, canvasHeight);

  let triangleA = [[-10, 0.0, -30, 1.0], [10, 0.0, -30, 1.0], [0.0, 10, -30, 1.0]]

  const rot = math3d.makeRotationAround(ANGLE, 0, 0, -30);
  const trans = math3d.makeTranslate(0, 0, -10);

  triangleA[0] = math3d.combine(rot, triangleA[0]);
  triangleA[1] = math3d.combine(rot, triangleA[1]);
  triangleA[2] = math3d.combine(rot, triangleA[2]);


  triangleA[0] = math3d.combine(trans, triangleA[0]);
  triangleA[1] = math3d.combine(trans, triangleA[1]);
  triangleA[2] = math3d.combine(trans, triangleA[2]);


  const perspective = math3d.makePerspective(0, 0, 1);

  triangleA[0] = math3d.combine(perspective, triangleA[0]);
  triangleA[1] = math3d.combine(perspective, triangleA[1]);
  triangleA[2] = math3d.combine(perspective, triangleA[2]);

  console.log(triangleA);

  triangleA[0] = math3d.scale(1 / triangleA[0][3], triangleA[0]);
  triangleA[1] = math3d.scale(1 / triangleA[1][3], triangleA[1]);
  triangleA[2] = math3d.scale(1 / triangleA[2][3], triangleA[2]);



  for (let canvasY = 0; canvasY < canvasHeight; ++canvasY) {
    for (let canvasX = 0; canvasX < canvasWidth; ++canvasX) {

      // canvas (device coordinates) to projection plane (world coordinates)
      const planeX = 2.0 * (canvasX / canvasWidth) - 1.0;
      const planeY = 1.0 - 2.0 * (canvasY / canvasHeight);

      if (math3d.isPointInTriangle([planeX, planeY, 0, 0], triangleA[0], triangleA[1], triangleA[2]))
        putPixel(imageData, canvasX, canvasY, 255, 20, 147, 255);
      else
        putPixel(imageData, canvasX, canvasY, 0, 0, 0, 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function gameLoop(timestamp = 0){
  window.requestAnimationFrame(gameLoop);
  if (timestamp - last < 1000 / 30) return;
  ANGLE -= 0.2;
  updateCanvas();
  last = timestamp;
}

function main() {
  loggerUtil.messageLogger.setLogLevel(5);
  loggerUtil.printDebug(`In function ${main.name}`);

  loggerUtil.printInfo('Fetch JSON file from server');
  httpUtil.HttpRequestHandler.getJson('/json')
    .then((data) => console.log(data));

  loggerUtil.printFatal('test');
  loggerUtil.printWarning('test');

  gameLoop();

  tests.runTests(false);
  loggerUtil.messageLogger.printAll();
}

main();
