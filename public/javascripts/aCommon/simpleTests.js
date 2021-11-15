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

import * as commonUtils from './commonUtils.js';
import * as loggerUtil from './messageLogger.js';

let testCount = 0;
let failCount = 0;

function testThat(yourRequirement, yourEpicFailMessage) {
  console.assert(typeof (yourRequirement) === 'boolean');
  console.assert(typeof (yourEpicFailMessage) === 'string');
  if (yourRequirement === false) {
    loggerUtil.printCritical(yourEpicFailMessage)
    ++failCount;
  };
}

function callTest(aTest) {
  console.assert(commonUtils.isFunction(aTest));
  aTest();
  ++testCount;
}

function testThese(listOfYourTests) {
  console.assert(Array.isArray(listOfYourTests));
  listOfYourTests.forEach(fun => console.assert(commonUtils.isFunction(fun), commonUtils));
  listOfYourTests.forEach(fun => callTest(fun), callTest);
}

function runMyTests(listOfYourTests, testMeMmkay = false) {
  console.assert(Array.isArray(listOfYourTests));
  listOfYourTests.forEach(fun => console.assert(commonUtils.isFunction(fun), commonUtils));
  console.assert(typeof (testMeMmkay) === 'boolean');
  if (testMeMmkay === false) return;
  testThese(listOfYourTests);
  if (failCount > 0) {
    loggerUtil.printCritical(`❌ ${failCount} TEST(S) FAILED ❌\n`);
  } else {
    loggerUtil.printInfo('🙌 ALL TESTS PASSED 🙌\n');
  }
  loggerUtil.printInfo(`👉 ${testCount} TESTS RAN\n`);
}

export {
  testThat,
  runMyTests,
}
