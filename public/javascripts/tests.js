/*
  MIT License

  Copyright (c) 2021 Daniel (he wants his privacy), Julian Zimmermann

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

import * as testUtil from './aCommon/simpleTests.js';

function testYoMama() {
  const aYoMamaJoke = `Yo mama's so fat, when she skips a meal, the stock market drops.`;
  testUtil.testThat(aYoMamaJoke.includes('Yo mama') && aYoMamaJoke.includes('stock market will get back to normal.'),
                    `\'${aYoMamaJoke}\' in ${testYoMama.name} ain\'t true. The stock market will continue to exist even without yo mama.`);
}

function runTests(testMeMmkay = false) {
  console.assert(typeof (testMeMmkay) === 'boolean');
  if (testMeMmkay === false) return;

  const myTestsBruh = [testYoMama]

  testUtil.runMyTests(myTestsBruh, testMeMmkay);
}

export {
  runTests
}
