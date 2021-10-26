import * as loggerUtil from './messageLogger.js';
import * as httpUtil from './httpRequestHandler.js';

function main() {
  loggerUtil.messageLogger.setLogLevel(5);
  loggerUtil.printDebug('In function ' + main.name);

  // TODO
  loggerUtil.printInfo("Fetch JSON file from server");
  httpUtil.HttpRequestHandler.getJson('/json')
  .then(data => console.log(data));

  loggerUtil.messageLogger.printAll();
}

main();
