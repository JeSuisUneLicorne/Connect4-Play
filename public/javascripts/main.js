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

import * as loggerUtil from './aCommon/messageLogger.js';
import * as httpUtil from './aCommon/httpRequestHandler.js';
import * as testUtil from './tests.js'

const TestVueApp = {
  data() {
    return {
      message: ""
    }
  }
};

Vue.createApp(TestVueApp).mount('#test-vue-app');

async function main() {
  loggerUtil.messageLogger.setLogLevel(5);
  loggerUtil.printDebug(`In function ${main.name}`);

  loggerUtil.printInfo('Fetch JSON file from server');
  const boardJsonAsStr = JSON.stringify((await httpUtil.HttpRequestHandler.getJson('/json')));
  loggerUtil.printDebug(`Current game board: ${boardJsonAsStr}`)

  loggerUtil.printFatal('Bruh, no way!?');
  loggerUtil.printWarning('Watch out!');

  testUtil.runTests(true);
  loggerUtil.messageLogger.printAll();
}

function dropDisk(row) {
  window.location.href='/'+row
}

main();
