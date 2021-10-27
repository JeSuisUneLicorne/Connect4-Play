/*
  MIT License

  Copyright (c) 2021 Daniel Özyurt

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

export { messageLogger, printFatal, printCritical, printWarning, printInfo, printDebug };

class LogLevels {
  static #_NODEBUG = 0;
  static #_FATAL = 1;
  static #_CRITICAL = 2;
  static #_WARNING = 3;
  static #_INFO = 4;
  static #_DEBUG = 5;

  static get NODEBUG() { return this.#_NODEBUG; }
  static get FATAL() { return this.#_FATAL; }
  static get CRITICAL() { return this.#_CRITICAL; }
  static get WARNING() { return this.#_WARNING; }
  static get INFO() { return this.#_INFO; }
  static get DEBUG() { return this.#_DEBUG; }
} // end of class LogLevels

class MessageLog {
  _logLevel
  _message

  constructor(logLevel = 0, message) {
    console.assert(typeof logLevel === "number");
    console.assert(typeof message === "string");
    this._logLevel = logLevel;
    this._message = message;
  }

  getLogLevel() {
    return this._logLevel;
  }

  setMessage(message) {
    console.assert(typeof message === "string");
    this._message = message;
  }

  print(currentLogLevel) {
    console.assert(false);
  }
} // end of class MessageLog

class FatalMessageLog extends MessageLog {
  constructor(message) {
    console.assert(typeof message === "string");
    super(LogLevels.FATAL, message);
  }
  print(currentLogLevel) {
    console.assert(typeof currentLogLevel === "number");
    console.log('FATAL @ LEVEL %d: %s', currentLogLevel, this._message);
  }
}

class CriticalMessageLog extends MessageLog {
  constructor(message) {
    console.assert(typeof message === "string");
    super(LogLevels.CRITICAL, message);
  }
  print(currentLogLevel) {
    console.assert(typeof currentLogLevel === "number");
    console.log('CRITICAL @ LEVEL %d: %s', currentLogLevel, this._message);
  }
}

class WarningMessageLog extends MessageLog {
  constructor(message) {
    console.assert(typeof message === "string");
    super(LogLevels.WARNING, message);
  }
  print(currentLogLevel) {
    console.assert(typeof currentLogLevel === "number");
    console.log('WARNING @ LEVEL %d: %s', currentLogLevel, this._message);
  }
}

class InfoMessageLog extends MessageLog {
  constructor(message) {
    console.assert(typeof message === "string");
    super(LogLevels.INFO, message);
  }
  print(currentLogLevel) {
    console.assert(typeof currentLogLevel === "number");
    console.log('INFO @ LEVEL %d: %s', currentLogLevel, this._message);
  }
}

class DebugMessageLog extends MessageLog {
  constructor(message) {
    console.assert(typeof message === "string");
    super(LogLevels.DEBUG, message);
  }
  print(currentLogLevel) {
    console.assert(typeof currentLogLevel === "number");
    console.log('DEBUG @ LEVEL %d: %s', currentLogLevel, this._message);
  }
}

class MessageLogger {
  #logLevel
  #messageLogs

  constructor(logLevel = 0) {
    console.assert(typeof logLevel === "number");
    this.#logLevel = logLevel;
    this.#messageLogs = new Array();
  }

  setLogLevel(logLevel) {
    console.assert(typeof logLevel === "number");
    this.#logLevel = logLevel;
  }

  registerMessageLog(messageLog) {
    console.assert(messageLog instanceof MessageLog);
    this.#messageLogs.push(messageLog);
  }

  #printMeOrNot(logLevel, messageLog) {
    console.assert(typeof logLevel === "number");
    console.assert(messageLog instanceof MessageLog);
    if ((logLevel >= LogLevels.DEBUG) && (messageLog instanceof DebugMessageLog)) {
      messageLog.print(logLevel);
    }
    if ((logLevel >= LogLevels.INFO) && (messageLog instanceof InfoMessageLog)) {
      messageLog.print(logLevel);
    }
    if ((logLevel >= LogLevels.WARNING) && (messageLog instanceof WarningMessageLog)) {
      messageLog.print(logLevel);
    }
    if ((logLevel >= LogLevels.CRITICAL) && (messageLog instanceof CriticalMessageLog)) {
      messageLog.print(logLevel);
    }
    if ((logLevel >= LogLevels.FATAL) && (messageLog instanceof FatalMessageLog)) {
      messageLog.print(logLevel);
    }
  } // printMeOrNot

  printTopOnce() {
    const numberOfToBeProcessedMessageLogs = this.#messageLogs.length;
    console.assert(numberOfToBeProcessedMessageLogs !== 0)
    const topMessageLog = this.#messageLogs.pop(); // pop does not pop (it is perhaps like std::vector::top in C++)
    this.#printMeOrNot(this.#logLevel, topMessageLog)
    this.#messageLogs = this.#messageLogs.filter(messageLog => messageLog !== topMessageLog);
    console.assert((numberOfToBeProcessedMessageLogs - 1) === this.#messageLogs.length);
  } // printTopOnce

  printAll() {
    console.assert(this.#messageLogs.length !== 0)
    if (this.#messageLogs.length !== 0) {
      this.#messageLogs.forEach(messageLog => this.#printMeOrNot(this.#logLevel, messageLog));
    }
  } // printAll
} // end of class MessageLogger

function curriedPrintFatal(messageLogger, message) {
  console.assert(messageLogger instanceof MessageLogger);
  return function curriedPrintFatal(message) {
    console.assert(typeof message === "string");
    const messageLog = new FatalMessageLog(message);
    messageLogger.registerMessageLog(messageLog);
  }
}

function curriedPrintCritical(messageLogger, message) {
  console.assert(messageLogger instanceof MessageLogger);
  return function curriedPrintCritical(message) {
    console.assert(typeof message === "string");
    const messageLog = new CriticalMessageLog(message);
    messageLogger.registerMessageLog(messageLog);
  }
}

function curriedPrintWarning(messageLogger, message) {
  console.assert(messageLogger instanceof MessageLogger);
  return function curriedPrintWarning(message) {
    console.assert(typeof message === "string");
    const messageLog = new WarningMessageLog(message);
    messageLogger.registerMessageLog(messageLog);
  }
}

function curriedPrintInfo(messageLogger, message) {
  console.assert(messageLogger instanceof MessageLogger);
  return function curriedPrintInfo(message) {
    console.assert(typeof message === "string");
    const messageLog = new InfoMessageLog(message);
    messageLogger.registerMessageLog(messageLog);
  }
}

function curriedPrintDebug(messageLogger, message) {
  console.assert(messageLogger instanceof MessageLogger);
  return function curriedPrintDebug(message) {
    console.assert(typeof message === "string");
    const messageLog = new DebugMessageLog(message);
    messageLogger.registerMessageLog(messageLog);
  }
}

// Utility functions and objects
const messageLogger = new MessageLogger();
const printFatal = curriedPrintFatal(messageLogger);
const printCritical = curriedPrintCritical(messageLogger);
const printWarning = curriedPrintWarning(messageLogger);
const printInfo = curriedPrintInfo(messageLogger);
const printDebug = curriedPrintDebug(messageLogger);
