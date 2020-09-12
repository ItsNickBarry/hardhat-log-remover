module.exports = {
  imports: /\n?(\s*)?import\s*['"]@nomiclabs\/buidler\/console.sol['"]\s*;/g,
  calls: /\n?(\s*)?console\s*\.\s*log\s*\([^;]*\)\s*;/g,
};
