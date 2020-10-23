const fs = require('fs');

const regexp = require('./regexp.js');

const {
  TASK_COMPILE,
  TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
  TASK_COMPILE_SOLIDITY_GET_SOURCE_NAMES,
  TASK_COMPILE_SOLIDITY_GET_DEPENDENCY_GRAPH,
} = require('hardhat/builtin-tasks/task-names');

const NAME = 'remove-logs';
const DESC = 'Removes console.log calls and imports from local source files';

task(NAME, DESC, async function (args, hre) {
  try {
    await hre.run(TASK_COMPILE);
  } catch (e) {
    console.log('Failed to compile contracts before removing logs.');
    process.exit(1);
  }

  const sourcePaths = await hre.run(
    TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS
  );

  const sourceNames = await hre.run(
    TASK_COMPILE_SOLIDITY_GET_SOURCE_NAMES,
    {
      sourcePaths,
    }
  );

  let graph = await hre.run(TASK_COMPILE_SOLIDITY_GET_DEPENDENCY_GRAPH, {
    sourceNames,
  });

  let count = 0;

  graph.getResolvedFiles().forEach(function ({ absolutePath, content }) {
    const { rawContent } = content;
    if (rawContent.includes('console.log') || rawContent.includes('console.sol')) {
      let output = rawContent.replace(regexp.imports, '').replace(regexp.calls, '');

      fs.writeFileSync(absolutePath, output);
      count++;
    }
  });

  console.log(`Removed logs from ${ count } sources.`);
});
