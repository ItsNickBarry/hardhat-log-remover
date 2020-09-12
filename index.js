const fs = require('fs');

const regexp = require('./regexp.js');

const {
  TASK_COMPILE,
  TASK_COMPILE_GET_RESOLVED_SOURCES,
} = require('@nomiclabs/buidler/builtin-tasks/task-names');

const NAME = 'remove-logs';
const DESC = 'Removes console.log calls and imports from local source files';

task(NAME, DESC, async function (args, bre) {
  try {
    await bre.run(TASK_COMPILE);
  } catch (e) {
    console.log('Failed to compile contracts before removing logs.');
    process.exit(1);
  }

  let sources = await bre.run(TASK_COMPILE_GET_RESOLVED_SOURCES, args);

  let count = 0;

  sources.forEach(function ({ absolutePath, content }) {
    if (content.includes('console.log') || content.includes('console.sol')) {
      let output = content.replace(regexp.imports, '').replace(regexp.calls, '');

      fs.writeFileSync(absolutePath, output);
      count++;
    }
  });

  console.log(`Removed logs from ${ count } sources.`);
});
