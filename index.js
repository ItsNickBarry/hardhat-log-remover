const fs = require('fs');

const regexp = require('./regexp.js');

const {
  TASK_COMPILE,
  TASK_COMPILE_GET_RESOLVED_SOURCES,
} = require('@nomiclabs/buidler/builtin-tasks/task-names');

const NAME = 'remove-logs';
const DESC = 'Removes console.log calls and imports from local source files';

task(NAME, DESC, async function (args, bre) {
  await bre.run(TASK_COMPILE);

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
