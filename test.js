const assert = require('assert');

const regexp = require('./regexp.js');

const testString =
`
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import 'hardhat/console.sol';
import'hardhat/console.sol';
import "hardhat/console.sol";
import
'hardhat/console.sol'
;

abstract contract Token is ERC20 {
  uint private _n;

  function runAction () external {
    _n++;

    console.log(_n);
    console.log(
      _n
    );

    _n--;
    console.log(_n, 'n');

    console.logInt(1);
    // console.log(_n, 'n');

    console.logBytes27(
      '0x');

    if (_n == 0) { console.log(_n); }
    if (_n == 0) console.log(_n);
  }
}
`;

const expectedOutput =
`
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

abstract contract Token is ERC20 {
  uint private _n;

  function runAction () external {
    _n++;

    _n--;

    if (_n == 0) { }
    if (_n == 0)
  }
}
`;

describe('regular expressions', function () {
  it('remove console.log imports', function () {
    assert(!testString.replace(regexp.imports, '').includes('console.sol'));
  });

  it('remove console.log calls', function () {
    assert(!testString.replace(regexp.calls, '').includes('console.log'));
  });

  it('leave unrelated code intact', function () {
    let output = testString.replace(regexp.imports, '').replace(regexp.calls, '');
    assert.equal(output, expectedOutput);
  });
});
