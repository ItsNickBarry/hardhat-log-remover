module.exports = {
  imports: /\n?(\s*)?import\s*['"]@nomiclabs\/buidler\/console.sol['"]\s*;(\s*\z)?/g,
  calls: /\n?(\s*)?console\s*\.\s*log\s*\([^;]*\)\s*;(\s*\z)?/g,
};
