# Buidler Log Remover

Remove Buidler `console.log` imports and calls from Solidity source code.

This plugin is intended in part to keep version-controlled code free of log statements.  To remove logs from compiled contracts while preserving them in source code, see [buidler-preprocessor](https://github.com/wighawag/buidler-preprocessor).

## Installation

```bash
yarn add --dev buidler-log-remover
```

## Usage

Load plugin in Buidler config:

```javascript
usePlugin('buidler-log-remover');
```

Run the Buidler task manually:

```bash
yarn run buidler remove-logs
```

Before removing logs, the plugin will ensure that all contracts can be compiled successfully.

## Testing

Run the unit tests with Mocha:

```bash
yarn run mocha
```
