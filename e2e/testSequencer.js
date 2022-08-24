const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    return tests.sort((testA, testB) => testA.path.localeCompare(testB.path));
  }
}

module.exports = CustomSequencer;
