import * as loggerUtil from './aCommon/messageLogger.js';

function initEventHandlers() {
  loggerUtil.printDebug(`In function ${initEventHandlers.name}`);

  // Add drop button listeners
  const dropAtButtons = document.querySelectorAll('#dropAt0Btn, #dropAt1Btn, #dropAt2Btn, #dropAt3Btn, #dropAt4Btn, #dropAt5Btn, #dropAt6Btn');

  dropAtButtons.forEach(
    (btn, index) => {
      btn.addEventListener('click', () => {
        loggerUtil.printDebug(`In anonymous function (${btn}, ${index})`);
        loggerUtil.messageLogger.printTopOnce();
        window.location = `/${index}`;
      }, index);
    });

}

export {
  initEventHandlers,
}
