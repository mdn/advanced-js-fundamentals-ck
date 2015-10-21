# Solutions

## With currying

```js
function prefixLog(prefix) {
  return function (message) {
    return (prefix + ': ' + message);
  };
}

dangerLog = prefixLog('DANGER');
successLog = prefixLog('SUCCESS');
```

## With partial application

```js
function prefixLog(prefix, message) {
  return (prefix + ': ' + message);
}

dangerLog = prefixLog.bind(null, 'DANGER');
successLog = prefixLog.bind(null, 'SUCCESS');
```
